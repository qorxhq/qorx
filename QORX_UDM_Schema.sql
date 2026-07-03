-- ============================================================================
-- QORX — Unified Data Model (UDM) Schema
-- PostgreSQL 16+
-- Multi-tenant, source-agnostic schema for entities, metrics, dimensions,
-- events, connectors, semantic models, and AI conversation memory.
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS vector;        -- pgvector for embeddings
CREATE EXTENSION IF NOT EXISTS pg_trgm;       -- fuzzy matching for entity resolution

-- ============================================================================
-- 1. TENANCY & AUTH
-- ============================================================================

CREATE TABLE organizations (
    org_id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name            TEXT NOT NULL,
    slug            TEXT UNIQUE NOT NULL,
    plan_tier       TEXT NOT NULL DEFAULT 'starter'
                        CHECK (plan_tier IN ('starter', 'growth', 'enterprise')),
    kms_key_id      TEXT NOT NULL,             -- per-tenant encryption key reference
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE users (
    user_id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id          UUID NOT NULL REFERENCES organizations(org_id) ON DELETE CASCADE,
    email           TEXT UNIQUE NOT NULL,
    role            TEXT NOT NULL DEFAULT 'viewer'
                        CHECK (role IN ('admin', 'editor', 'viewer')),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================================
-- 2. CONNECTORS & SYNC STATE
-- ============================================================================

CREATE TABLE connectors (
    connector_id    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id          UUID NOT NULL REFERENCES organizations(org_id) ON DELETE CASCADE,
    connector_type  TEXT NOT NULL,             -- 'postgres','csv','rest','salesforce','sap',...
    display_name    TEXT NOT NULL,
    auth_type       TEXT NOT NULL
                        CHECK (auth_type IN ('oauth2','api_key','basic','db_credentials','service_account')),
    credentials_ref TEXT NOT NULL,             -- pointer into secrets vault, never raw secrets here
    status          TEXT NOT NULL DEFAULT 'pending'
                        CHECK (status IN ('pending','active','error','paused')),
    schema_snapshot JSONB,                     -- last discovered source schema
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE sync_runs (
    sync_run_id     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    connector_id    UUID NOT NULL REFERENCES connectors(connector_id) ON DELETE CASCADE,
    mode            TEXT NOT NULL CHECK (mode IN ('full','incremental','webhook')),
    cursor_value    TEXT,                      -- last watermark (updated_at, offset, CDC LSN)
    status          TEXT NOT NULL DEFAULT 'running'
                        CHECK (status IN ('running','success','failed')),
    records_processed  INTEGER DEFAULT 0,
    error_message   TEXT,
    started_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    finished_at     TIMESTAMPTZ
);

CREATE TABLE field_mappings (
    mapping_id      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    connector_id    UUID NOT NULL REFERENCES connectors(connector_id) ON DELETE CASCADE,
    source_object   TEXT NOT NULL,             -- e.g. "Opportunity", "sheet1!A:F"
    source_field    TEXT NOT NULL,
    target_entity   TEXT NOT NULL,             -- e.g. "deal"
    target_field    TEXT NOT NULL,             -- e.g. "metric.deal_value"
    transform_rule  JSONB,                     -- {"rule": "cast_decimal"} etc.
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================================
-- 3. UNIFIED DATA MODEL — ENTITIES, DIMENSIONS, EVENTS
-- ============================================================================

CREATE TABLE entities (
    entity_id       UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id          UUID NOT NULL REFERENCES organizations(org_id) ON DELETE CASCADE,
    entity_type     TEXT NOT NULL,             -- 'account','deal','product','employee',...
    source_system   TEXT NOT NULL,
    external_id     TEXT NOT NULL,             -- ID in the source system
    attributes      JSONB NOT NULL DEFAULT '{}',
    resolved_entity_id UUID REFERENCES entities(entity_id), -- entity-resolution merge target
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (org_id, source_system, entity_type, external_id)
);

CREATE INDEX idx_entities_org_type ON entities(org_id, entity_type);
CREATE INDEX idx_entities_attributes_gin ON entities USING GIN (attributes);
CREATE INDEX idx_entities_name_trgm ON entities USING GIN ((attributes->>'name') gin_trgm_ops);

CREATE TABLE entity_relationships (
    relationship_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id          UUID NOT NULL REFERENCES organizations(org_id) ON DELETE CASCADE,
    from_entity_id  UUID NOT NULL REFERENCES entities(entity_id) ON DELETE CASCADE,
    to_entity_id    UUID NOT NULL REFERENCES entities(entity_id) ON DELETE CASCADE,
    relationship_type TEXT NOT NULL,           -- 'owns','belongs_to','sold_by',...
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Dimension definitions (metadata only — actual values live on entities/events)
CREATE TABLE dimensions (
    dimension_id    TEXT PRIMARY KEY,          -- e.g. 'product_category'
    org_id          UUID NOT NULL REFERENCES organizations(org_id) ON DELETE CASCADE,
    display_name    TEXT NOT NULL,
    dimension_type  TEXT NOT NULL CHECK (dimension_type IN ('categorical','numeric','date','boolean')),
    source_entity   TEXT,                      -- which entity_type this dimension hangs off
    allowed_values  JSONB,                     -- optional enum constraint
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Events: append-only fact stream (high volume — candidate for ClickHouse/DuckDB at scale)
CREATE TABLE events (
    event_id        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id          UUID NOT NULL REFERENCES organizations(org_id) ON DELETE CASCADE,
    event_type      TEXT NOT NULL,             -- 'order_placed','visit_logged','invoice_issued',...
    entity_id       UUID REFERENCES entities(entity_id),
    source_system   TEXT NOT NULL,
    occurred_at     TIMESTAMPTZ NOT NULL,
    payload         JSONB NOT NULL DEFAULT '{}',
    ingested_at     TIMESTAMPTZ NOT NULL DEFAULT now()
) PARTITION BY RANGE (occurred_at);

-- Monthly partitions (example — automate via pg_partman or a scheduled job)
CREATE TABLE events_2026_07 PARTITION OF events
    FOR VALUES FROM ('2026-07-01') TO ('2026-08-01');
CREATE TABLE events_2026_08 PARTITION OF events
    FOR VALUES FROM ('2026-08-01') TO ('2026-09-01');

CREATE INDEX idx_events_org_type_time ON events(org_id, event_type, occurred_at);
CREATE INDEX idx_events_entity ON events(entity_id);
CREATE INDEX idx_events_payload_gin ON events USING GIN (payload);

-- ============================================================================
-- 4. SEMANTIC LAYER — METRICS & BUSINESS GLOSSARY
-- ============================================================================

CREATE TABLE metric_definitions (
    metric_id       TEXT NOT NULL,             -- e.g. 'revenue_net' (human-readable slug)
    org_id          UUID NOT NULL REFERENCES organizations(org_id) ON DELETE CASCADE,
    display_name    TEXT NOT NULL,
    unit            TEXT,                      -- 'EUR','%','units'
    aggregation     TEXT NOT NULL DEFAULT 'sum'
                        CHECK (aggregation IN ('sum','avg','count','count_distinct','min','max','ratio')),
    source_entity   TEXT NOT NULL,
    source_field    TEXT NOT NULL,
    formula         TEXT,                      -- for derived metrics, e.g. ratio of two base metrics
    grain           TEXT NOT NULL DEFAULT 'daily' CHECK (grain IN ('hourly','daily','weekly','monthly')),
    filters         JSONB DEFAULT '{}',
    version         INTEGER NOT NULL DEFAULT 1,
    is_active       BOOLEAN NOT NULL DEFAULT true,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (org_id, metric_id, version)
);

CREATE TABLE business_glossary (
    term_id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id          UUID NOT NULL REFERENCES organizations(org_id) ON DELETE CASCADE,
    term            TEXT NOT NULL,             -- e.g. "TGT80"
    definition      TEXT NOT NULL,
    related_metric_id TEXT,
    embedding       VECTOR(1536),              -- for RAG retrieval
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (org_id, term)
);

CREATE INDEX idx_glossary_embedding ON business_glossary
    USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- Cached metric query results (avoid recomputation for repeated chat queries)
CREATE TABLE metric_result_cache (
    cache_key       TEXT PRIMARY KEY,          -- hash(metric_id + filters + timerange)
    org_id          UUID NOT NULL REFERENCES organizations(org_id) ON DELETE CASCADE,
    metric_id       TEXT NOT NULL,
    result          JSONB NOT NULL,
    computed_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at      TIMESTAMPTZ NOT NULL
);

-- ============================================================================
-- 5. AI DECISION ENGINE — CONVERSATIONS, MEMORY, INSIGHTS
-- ============================================================================

CREATE TABLE conversations (
    conversation_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id          UUID NOT NULL REFERENCES organizations(org_id) ON DELETE CASCADE,
    user_id         UUID NOT NULL REFERENCES users(user_id),
    title           TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE messages (
    message_id      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES conversations(conversation_id) ON DELETE CASCADE,
    role            TEXT NOT NULL CHECK (role IN ('user','assistant','tool')),
    content         TEXT NOT NULL,
    tool_calls      JSONB,                     -- record of which tools were invoked
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Long-term organizational memory (facts the AI should persist across sessions)
CREATE TABLE org_memory (
    memory_id       UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id          UUID NOT NULL REFERENCES organizations(org_id) ON DELETE CASCADE,
    fact            TEXT NOT NULL,             -- "Q2 target revised to €1.2M on 2026-05-03"
    source_conversation_id UUID REFERENCES conversations(conversation_id),
    embedding       VECTOR(1536),
    confidence      NUMERIC(3,2) DEFAULT 1.0,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_org_memory_embedding ON org_memory
    USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- AI-generated insights (anomalies, root-cause findings, forecasts) with feedback loop
CREATE TABLE insights (
    insight_id      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id          UUID NOT NULL REFERENCES organizations(org_id) ON DELETE CASCADE,
    insight_type    TEXT NOT NULL CHECK (insight_type IN ('anomaly','root_cause','forecast','recommendation')),
    metric_id       TEXT,
    narrative       TEXT NOT NULL,
    supporting_data JSONB NOT NULL DEFAULT '{}',
    confidence      NUMERIC(3,2),
    user_feedback   TEXT CHECK (user_feedback IN ('accurate','inaccurate', NULL)),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_insights_org_type_time ON insights(org_id, insight_type, created_at DESC);

-- ============================================================================
-- 6. ROW LEVEL SECURITY (multi-tenant isolation)
-- ============================================================================

ALTER TABLE entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE metric_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_entities ON entities
    USING (org_id = current_setting('app.current_org_id')::UUID);
CREATE POLICY tenant_isolation_events ON events
    USING (org_id = current_setting('app.current_org_id')::UUID);
CREATE POLICY tenant_isolation_metrics ON metric_definitions
    USING (org_id = current_setting('app.current_org_id')::UUID);
CREATE POLICY tenant_isolation_conversations ON conversations
    USING (org_id = current_setting('app.current_org_id')::UUID);

-- Application sets `SET app.current_org_id = '<uuid>'` per request/session.
