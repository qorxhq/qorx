/**
 * QORX How It Works Section
 * Design: Obsidian Command Center
 * Shows the 5-layer flow: Connect → Understand → Ask → Decide → Act
 */
import { useEffect, useRef, useState } from "react";
import { Database, Brain, MessageSquare, Lightbulb, Zap } from "lucide-react";

const STEPS = [
  {
    icon: Database,
    number: "01",
    title: "Connect your data",
    subtitle: "Any source, any format",
    description:
      "QORX connects to your existing stack in minutes — PostgreSQL, SAP, Salesforce, Excel, REST APIs. No ETL team needed. Our connector framework maps your data to a Unified Data Model automatically.",
    tags: ["PostgreSQL", "SAP", "Salesforce", "Excel/CSV", "REST API"],
    color: "#00D4FF",
  },
  {
    icon: Brain,
    number: "02",
    title: "Build the semantic layer",
    subtitle: "Teach QORX your business",
    description:
      "Define what 'win rate', 'TGT80', or 'sellout vs target' means in your business. QORX compiles these into executable SQL and uses them as context for every AI answer — no hallucinated numbers, ever.",
    tags: ["Business glossary", "Metric definitions", "Entity resolution"],
    color: "#7C3AED",
  },
  {
    icon: MessageSquare,
    number: "03",
    title: "Ask in plain language",
    subtitle: "Chat-first interface",
    description:
      "Ask 'Why did revenue drop last week?' or 'Which region will miss target this quarter?' QORX's AI engine retrieves context, calls the right analytical tools, and synthesizes a grounded answer — with citations.",
    tags: ["Root cause analysis", "Forecasting", "Anomaly detection"],
    color: "#10B981",
  },
  {
    icon: Lightbulb,
    number: "04",
    title: "Get decisions, not charts",
    subtitle: "Prescriptive intelligence",
    description:
      "Every answer includes a recommended action — not just 'revenue is down 18%' but 'expedite ZTE-A73 restock to Milan DC, estimated recovery €38K in 7 days.' Confidence intervals always shown.",
    tags: ["Prescriptive AI", "Confidence scoring", "Business narrative"],
    color: "#F59E0B",
  },
  {
    icon: Zap,
    number: "05",
    title: "Execute automatically",
    subtitle: "The Action Engine",
    description:
      "QORX doesn't stop at advice. The Action Engine executes approved workflows — Slack alerts, CRM updates, email reports — triggered by anomalies, thresholds, or schedules. No n8n, no Zapier needed.",
    tags: ["Slack/Teams", "CRM write-back", "Email automation", "Webhooks"],
    color: "#EF4444",
  },
];

function StepCard({ step, index }: { step: (typeof STEPS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const Icon = step.icon;

  return (
    <div
      ref={ref}
      className="qorx-card p-6 relative overflow-hidden transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${index * 80}ms`,
      }}
    >
      {/* Step number watermark */}
      <div
        className="absolute top-4 right-4 text-6xl font-bold"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          color: step.color,
          opacity: 0.06,
          lineHeight: 1,
        }}
      >
        {step.number}
      </div>

      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
        style={{ background: step.color + "15", border: `1px solid ${step.color}30` }}
      >
        <Icon size={18} style={{ color: step.color }} />
      </div>

      {/* Number badge */}
      <div
        className="text-xs font-mono mb-2"
        style={{ color: step.color, letterSpacing: "0.1em" }}
      >
        STEP {step.number}
      </div>

      <h3
        className="text-lg font-bold mb-1"
        style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F6FF" }}
      >
        {step.title}
      </h3>
      <p className="text-xs font-medium mb-3" style={{ color: step.color }}>
        {step.subtitle}
      </p>
      <p className="text-sm leading-relaxed mb-4" style={{ color: "#8B9CB8" }}>
        {step.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {step.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded-md"
            style={{
              background: step.color + "10",
              border: `1px solid ${step.color}20`,
              color: "#8B9CB8",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24" style={{ background: "#080B14" }}>
      <div className="container">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="qorx-badge inline-flex mb-4">How QORX works</div>
          <h2
            className="text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F6FF", letterSpacing: "-0.02em" }}
          >
            From raw data to
            <br />
            <span className="qorx-gradient-text">executed decisions</span>
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "#8B9CB8" }}>
            Five layers, one platform. QORX replaces the analyst-dashboard-meeting-decision cycle
            with a single reasoning loop that runs continuously on your data.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {STEPS.slice(0, 3).map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {STEPS.slice(3).map((step, i) => (
            <StepCard key={step.number} step={step} index={i + 3} />
          ))}
        </div>

        {/* Bottom callout */}
        <div
          className="mt-12 p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-6"
          style={{
            background: "linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(124,58,237,0.06) 100%)",
            border: "1px solid rgba(0,212,255,0.15)",
          }}
        >
          <div className="flex-1">
            <p
              className="text-lg font-semibold mb-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F6FF" }}
            >
              The full loop runs in under 60 seconds.
            </p>
            <p className="text-sm" style={{ color: "#8B9CB8" }}>
              From anomaly detection to Slack notification with root cause summary — no human in the loop unless you want one.
            </p>
          </div>
          <a
            href="#contact"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold qorx-btn-primary"
          >
            See it live
          </a>
        </div>
      </div>
    </section>
  );
}
