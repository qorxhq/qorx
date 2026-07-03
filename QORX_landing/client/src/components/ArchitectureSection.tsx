/**
 * QORX Architecture Section
 * Design: Obsidian Command Center
 * Visual system architecture with layered cards
 */
import { useEffect, useRef, useState } from "react";

const LAYERS = [
  {
    id: "client",
    label: "CLIENT LAYER",
    sublabel: "Chat UI · Slack/Teams bot · API · Embedded widget",
    color: "#00D4FF",
    glow: "rgba(0,212,255,0.15)",
  },
  {
    id: "gateway",
    label: "API GATEWAY",
    sublabel: "AuthN/Z (JWT+RBAC) · Rate limiting · Multi-tenant router",
    color: "#7C3AED",
    glow: "rgba(124,58,237,0.12)",
  },
  {
    id: "ai",
    label: "AI DECISION ENGINE",
    sublabel: "LangGraph Orchestrator · Intent Router · Tool Planner · RAG · Root Cause · Forecasting",
    color: "#00D4FF",
    glow: "rgba(0,212,255,0.2)",
    highlight: true,
  },
  {
    id: "action",
    label: "ACTION ENGINE",
    sublabel: "Triggers · Workflow Definition · Approval Gate · Action Execution · Audit Log",
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.12)",
  },
  {
    id: "metrics",
    label: "METRICS ENGINE",
    sublabel: "Metric DSL → compiled SQL · Time intelligence (WoW/MoM/YoY) · Dimensional slicing",
    color: "#10B981",
    glow: "rgba(16,185,129,0.1)",
  },
  {
    id: "semantic",
    label: "SEMANTIC BUSINESS LAYER",
    sublabel: "Entities · Relationships · Business glossary · Metric-to-table map · dbt-style YAML",
    color: "#7C3AED",
    glow: "rgba(124,58,237,0.1)",
  },
  {
    id: "connector",
    label: "CONNECTOR / INGESTION LAYER",
    sublabel: "Postgres · MySQL · Excel/CSV · Google Sheets · REST API · SAP · Salesforce · Dynamics 365",
    color: "#8B9CB8",
    glow: "rgba(139,156,184,0.08)",
  },
  {
    id: "storage",
    label: "STORAGE LAYER",
    sublabel: "PostgreSQL (OLTP) · ClickHouse/DuckDB (OLAP) · S3 (raw lake) · pgvector (embeddings)",
    color: "#8B9CB8",
    glow: "rgba(139,156,184,0.06)",
  },
];

function ArchLayer({
  layer,
  index,
  total,
}: {
  layer: (typeof LAYERS)[0];
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={ref}
        className="relative rounded-xl px-5 py-4 transition-all duration-500"
        style={{
          background: layer.highlight
            ? `linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(124,58,237,0.08) 100%)`
            : "rgba(13,17,23,0.8)",
          border: `1px solid ${layer.color}${layer.highlight ? "40" : "20"}`,
          boxShadow: layer.highlight ? `0 0 30px ${layer.glow}` : `0 0 15px ${layer.glow}`,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(-16px)",
          transitionDelay: `${index * 60}ms`,
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div
              className="text-xs font-bold tracking-widest mb-1"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: layer.color,
                letterSpacing: "0.12em",
              }}
            >
              {layer.label}
            </div>
            <div className="text-xs leading-relaxed" style={{ color: "#8B9CB8" }}>
              {layer.sublabel}
            </div>
          </div>
          {layer.highlight && (
            <div
              className="flex-shrink-0 text-xs px-2 py-1 rounded-md font-mono"
              style={{
                background: "rgba(0,212,255,0.1)",
                border: "1px solid rgba(0,212,255,0.3)",
                color: "#00D4FF",
              }}
            >
              core IP
            </div>
          )}
        </div>
      </div>

      {/* Connector arrow */}
      {index < total - 1 && (
        <div className="flex justify-center">
          <div className="flex flex-col items-center gap-0.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-px h-1.5"
                style={{ background: `rgba(0,212,255,${0.4 - i * 0.1})` }}
              />
            ))}
            <div
              className="w-0 h-0"
              style={{
                borderLeft: "4px solid transparent",
                borderRight: "4px solid transparent",
                borderTop: "5px solid rgba(0,212,255,0.3)",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default function ArchitectureSection() {
  return (
    <section
      id="architecture"
      className="py-24"
      style={{ background: "linear-gradient(180deg, #080B14 0%, #0A0E1A 100%)" }}
    >
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Architecture diagram */}
          <div>
            <div className="qorx-badge inline-flex mb-4">System Architecture</div>
            <h2
              className="text-4xl font-bold mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F6FF", letterSpacing: "-0.02em" }}
            >
              Every layer is
              <br />
              <span className="qorx-gradient-text">independently swappable</span>
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "#8B9CB8" }}>
              The connector layer never talks to the AI engine directly — everything flows through the
              Unified Data Model and Semantic Layer. The AI reasoning never needs to know if data came from SAP or a CSV.
            </p>

            {/* Architecture layers */}
            <div className="space-y-2">
              {LAYERS.map((layer, i) => (
                <ArchLayer key={layer.id} layer={layer} index={i} total={LAYERS.length} />
              ))}
            </div>
          </div>

          {/* Right: Key design principles + visual */}
          <div className="space-y-6 lg:pt-20">
            {/* Architecture image */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(30,42,58,0.8)" }}
            >
              <img
                src="/manus-storage/qorx-architecture-visual_70e8181d.png"
                alt="QORX Architecture Visualization"
                className="w-full object-cover"
                style={{ maxHeight: "280px" }}
              />
            </div>

            {/* Design principles */}
            <div className="space-y-4">
              {[
                {
                  title: "Unified Data Model",
                  desc: "Four primitives — Entity, Metric, Dimension, Event — unify data from any source into a single coherent model.",
                  color: "#00D4FF",
                },
                {
                  title: "Semantic Business Layer",
                  desc: "What separates QORX from Fivetran/Metabase: raw tables mean nothing without business context. The semantic layer speaks your language.",
                  color: "#7C3AED",
                },
                {
                  title: "Grounded AI — no hallucinations",
                  desc: "Every numeric claim is backed by a tool call against real data. The LLM synthesizes, never invents.",
                  color: "#10B981",
                },
                {
                  title: "Action Engine closes the loop",
                  desc: "Replaces n8n/Zapier/Make. QORX proposes automations from a conversation — no node-by-node building.",
                  color: "#F59E0B",
                },
              ].map((p, i) => (
                <div
                  key={i}
                  className="qorx-card p-4 flex gap-4"
                >
                  <div
                    className="w-1 rounded-full flex-shrink-0"
                    style={{ background: p.color, minHeight: "100%" }}
                  />
                  <div>
                    <h4
                      className="text-sm font-semibold mb-1"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F6FF" }}
                    >
                      {p.title}
                    </h4>
                    <p className="text-xs leading-relaxed" style={{ color: "#8B9CB8" }}>
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
