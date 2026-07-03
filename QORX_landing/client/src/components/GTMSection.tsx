/**
 * QORX GTM / ICP Section
 * Design: Obsidian Command Center
 * Who QORX is for + Year 1 roadmap
 */
import { useEffect, useRef, useState } from "react";
import { Building2, Users, TrendingUp, Globe } from "lucide-react";

const ICP_SIGNALS = [
  {
    icon: Building2,
    title: "Mid-market manufacturing & retail",
    desc: "€10M–€150M revenue companies in Milan / Lombardy with data spread across ERP, Excel, and a CRM.",
    color: "#00D4FF",
  },
  {
    icon: Users,
    title: "1–3 overloaded data analysts",
    desc: "No dedicated data engineering team. Analysts spend 80% of time building reports, 20% answering 'why'.",
    color: "#7C3AED",
  },
  {
    icon: TrendingUp,
    title: "Already paying for BI tools",
    desc: "Power BI or Excel licenses exist but decision-makers (COO/CFO/Sales Director) aren't getting answers — just charts.",
    color: "#10B981",
  },
  {
    icon: Globe,
    title: "Milan → EU expansion path",
    desc: "Local presence + Italian-language onboarding is a real moat against US-first competitors in year one.",
    color: "#F59E0B",
  },
];

const ROADMAP = [
  {
    phase: "Phase 1",
    period: "Months 0–3",
    title: "MVP",
    items: ["Postgres, CSV, REST connectors", "Semantic compiler + AI chat", "Root cause v1", "First live customer"],
    color: "#00D4FF",
    status: "active",
  },
  {
    phase: "Phase 2",
    period: "Months 3–6",
    title: "Pilot customers",
    items: ["Salesforce connector", "Anomaly detection", "3–5 paying pilots", "€15K–€30K ARR"],
    color: "#7C3AED",
    status: "upcoming",
  },
  {
    phase: "Phase 3",
    period: "Months 6–9",
    title: "Productization",
    items: ["SAP OData connector", "Slack/Teams bot", "Action Engine v1", "€60K–€100K ARR"],
    color: "#10B981",
    status: "upcoming",
  },
  {
    phase: "Phase 4",
    period: "Months 9–12",
    title: "Scale",
    items: ["Dynamics 365 + Power BI connectors", "ClickHouse migration", "Partner channel", "€120K–€200K ARR"],
    color: "#F59E0B",
    status: "upcoming",
  },
];

export default function GTMSection() {
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
    <section className="py-24" style={{ background: "#0A0E1A" }}>
      <div className="container">
        {/* ICP */}
        <div className="mb-20">
          <div className="qorx-badge inline-flex mb-4">Ideal customer profile</div>
          <h2
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F6FF", letterSpacing: "-0.02em" }}
          >
            Built for one vertical first.
            <br />
            <span className="qorx-gradient-text">Done right.</span>
          </h2>
          <p className="text-sm leading-relaxed mb-10 max-w-xl" style={{ color: "#8B9CB8" }}>
            QORX is not trying to be everything to everyone. Year 1 focus: mid-market manufacturing
            and retail-distribution companies in Northern Italy where the founder has existing relationships
            and deep domain knowledge.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ICP_SIGNALS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="qorx-card p-5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: s.color + "15", border: `1px solid ${s.color}30` }}
                  >
                    <Icon size={16} style={{ color: s.color }} />
                  </div>
                  <h4
                    className="text-sm font-semibold mb-2"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F6FF" }}
                  >
                    {s.title}
                  </h4>
                  <p className="text-xs leading-relaxed" style={{ color: "#8B9CB8" }}>
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Roadmap */}
        <div ref={ref}>
          <div className="qorx-badge inline-flex mb-4">Year 1 execution plan</div>
          <h2
            className="text-4xl font-bold mb-10"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F6FF", letterSpacing: "-0.02em" }}
          >
            Four phases.
            <br />
            <span className="qorx-gradient-text">One north star.</span>
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute top-6 left-0 right-0 h-px hidden lg:block"
              style={{ background: "linear-gradient(90deg, rgba(0,212,255,0.5), rgba(245,158,11,0.3))" }}
            />

            <div className="grid lg:grid-cols-4 gap-4">
              {ROADMAP.map((phase, i) => (
                <div
                  key={i}
                  className="relative transition-all duration-500"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transitionDelay: `${i * 100}ms`,
                  }}
                >
                  {/* Timeline dot */}
                  <div
                    className="w-3 h-3 rounded-full mb-4 hidden lg:block"
                    style={{
                      background: phase.status === "active" ? phase.color : "rgba(30,42,58,0.8)",
                      border: `2px solid ${phase.color}`,
                      boxShadow: phase.status === "active" ? `0 0 12px ${phase.color}60` : "none",
                    }}
                  />

                  <div
                    className="rounded-xl p-4"
                    style={{
                      background:
                        phase.status === "active"
                          ? `linear-gradient(135deg, ${phase.color}10 0%, transparent 100%)`
                          : "rgba(13,17,23,0.6)",
                      border: `1px solid ${phase.color}${phase.status === "active" ? "40" : "20"}`,
                    }}
                  >
                    <div
                      className="text-xs font-bold tracking-widest mb-1"
                      style={{ fontFamily: "'JetBrains Mono', monospace", color: phase.color, letterSpacing: "0.1em" }}
                    >
                      {phase.phase}
                    </div>
                    <div className="text-xs mb-2" style={{ color: "#8B9CB8" }}>{phase.period}</div>
                    <div
                      className="text-sm font-semibold mb-3"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F6FF" }}
                    >
                      {phase.title}
                    </div>
                    <ul className="space-y-1.5">
                      {phase.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-1.5 text-xs" style={{ color: "#8B9CB8" }}>
                          <span style={{ color: phase.color }}>›</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* North star */}
          <div
            className="mt-10 p-6 rounded-2xl"
            style={{
              background: "rgba(13,17,23,0.8)",
              border: "1px solid rgba(0,212,255,0.2)",
              borderLeft: "3px solid #00D4FF",
            }}
          >
            <p
              className="text-sm font-semibold mb-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F6FF" }}
            >
              North-star check — every quarter:
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#8B9CB8" }}>
              "If QORX is still mainly generating dashboards and not decisions by month 12, the product has drifted from thesis and needs re-scoping."
              The success metric isn't ARR — it's{" "}
              <strong style={{ color: "#00D4FF" }}>
                3 documented cases where a QORX insight changed a real business decision.
              </strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
