/**
 * QORX Competitor Positioning Section
 * Design: Obsidian Command Center
 * Comparison table showing QORX vs Power BI, SAP, Fivetran, etc.
 */
import { useEffect, useRef, useState } from "react";
import { Check, X, Minus } from "lucide-react";

const COMPETITORS = [
  { name: "Power BI / Tableau", short: "Power BI" },
  { name: "SAP Analytics Cloud", short: "SAP AC" },
  { name: "Fivetran", short: "Fivetran" },
  { name: "Metabase", short: "Metabase" },
  { name: "n8n / Zapier", short: "n8n" },
  { name: "QORX", short: "QORX", isUs: true },
];

const FEATURES = [
  {
    label: "Core output",
    values: ["Dashboards", "Dashboards", "Pipelines only", "Dashboards", "Trigger→action chains", "Decisions & actions"],
  },
  {
    label: 'Explains "why"',
    values: [false, "Limited", false, false, false, true],
  },
  {
    label: 'Predicts "what\'s next"',
    values: ["Add-on", "SAP-only", false, false, false, true],
  },
  {
    label: 'Recommends "what to do"',
    values: [false, false, false, false, false, true],
  },
  {
    label: "Executes the action",
    values: [false, false, false, false, "Manual build", true],
  },
  {
    label: "Understands business data",
    values: [false, "Partial", false, "Partial", false, true],
  },
  {
    label: "Cross-system semantic layer",
    values: ["Partial", "SAP-only", false, "Partial", false, true],
  },
  {
    label: "Requires analyst to interpret",
    values: [true, true, "N/A", true, "N/A", false],
  },
];

function CellValue({ value, isUs }: { value: string | boolean; isUs?: boolean }) {
  if (value === true) {
    return (
      <div className="flex justify-center">
        <div
          className="w-5 h-5 rounded-full flex items-center justify-center"
          style={{ background: isUs ? "rgba(0,212,255,0.15)" : "rgba(16,185,129,0.15)" }}
        >
          <Check size={12} style={{ color: isUs ? "#00D4FF" : "#10B981" }} />
        </div>
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="flex justify-center">
        <X size={14} style={{ color: "rgba(139,156,184,0.4)" }} />
      </div>
    );
  }
  if (value === "N/A") {
    return (
      <div className="flex justify-center">
        <Minus size={14} style={{ color: "rgba(139,156,184,0.3)" }} />
      </div>
    );
  }
  return (
    <div
      className="text-center text-xs leading-tight"
      style={{
        color: isUs ? "#00D4FF" : "#8B9CB8",
        fontFamily: isUs ? "'Space Grotesk', sans-serif" : "'Inter', sans-serif",
        fontWeight: isUs ? 600 : 400,
      }}
    >
      {value}
    </div>
  );
}

export default function CompetitorSection() {
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
    <section id="competitors" className="py-24" style={{ background: "#080B14" }}>
      <div className="container">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="qorx-badge inline-flex mb-4">Competitive positioning</div>
          <h2
            className="text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F6FF", letterSpacing: "-0.02em" }}
          >
            Not another BI tool.
            <br />
            <span className="qorx-gradient-text">The layer above them all.</span>
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "#8B9CB8" }}>
            Power BI shows you what happened. Fivetran moves your data. n8n executes steps you design yourself.
            QORX is the layer that understands <em style={{ color: "#F0F6FF" }}>why</em>, predicts <em style={{ color: "#F0F6FF" }}>what's next</em>, and acts on it.
          </p>
        </div>

        {/* Comparison table */}
        <div
          ref={ref}
          className="overflow-x-auto rounded-2xl transition-all duration-700"
          style={{
            border: "1px solid rgba(30,42,58,0.8)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <table className="w-full min-w-[700px]">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(30,42,58,0.8)" }}>
                <th
                  className="text-left px-5 py-4 text-xs font-medium"
                  style={{ color: "#8B9CB8", fontFamily: "'JetBrains Mono', monospace", width: "22%" }}
                >
                  CAPABILITY
                </th>
                {COMPETITORS.map((c) => (
                  <th
                    key={c.short}
                    className="px-3 py-4 text-center"
                    style={{
                      background: c.isUs ? "rgba(0,212,255,0.05)" : "transparent",
                      borderLeft: c.isUs ? "1px solid rgba(0,212,255,0.2)" : "none",
                      borderRight: c.isUs ? "1px solid rgba(0,212,255,0.2)" : "none",
                    }}
                  >
                    <span
                      className="text-xs font-semibold"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: c.isUs ? "#00D4FF" : "#8B9CB8",
                        letterSpacing: c.isUs ? "-0.01em" : "0",
                      }}
                    >
                      {c.short}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEATURES.map((feature, fi) => (
                <tr
                  key={fi}
                  style={{
                    borderBottom: fi < FEATURES.length - 1 ? "1px solid rgba(30,42,58,0.5)" : "none",
                    background: fi % 2 === 0 ? "transparent" : "rgba(13,17,23,0.3)",
                  }}
                >
                  <td
                    className="px-5 py-3.5 text-xs"
                    style={{ color: "#8B9CB8", fontFamily: "'Inter', sans-serif" }}
                  >
                    {feature.label}
                  </td>
                  {feature.values.map((val, ci) => (
                    <td
                      key={ci}
                      className="px-3 py-3.5"
                      style={{
                        background:
                          COMPETITORS[ci].isUs ? "rgba(0,212,255,0.04)" : "transparent",
                        borderLeft: COMPETITORS[ci].isUs ? "1px solid rgba(0,212,255,0.15)" : "none",
                        borderRight: COMPETITORS[ci].isUs ? "1px solid rgba(0,212,255,0.15)" : "none",
                      }}
                    >
                      <CellValue value={val} isUs={COMPETITORS[ci].isUs} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Positioning statement */}
        <blockquote
          className="mt-10 p-6 rounded-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(0,212,255,0.05) 0%, rgba(124,58,237,0.05) 100%)",
            border: "1px solid rgba(0,212,255,0.15)",
            borderLeft: "3px solid #00D4FF",
          }}
        >
          <p
            className="text-base leading-relaxed italic"
            style={{ color: "#F0F6FF", fontFamily: "'Inter', sans-serif" }}
          >
            "Power BI and Tableau show you what happened. Fivetran moves your data. n8n and Zapier execute steps you have to design yourself, with no idea what the data means.{" "}
            <strong style={{ color: "#00D4FF", fontStyle: "normal" }}>
              QORX is the layer that sits on top of all of it — understands why something happened, what happens next, and what to do about it — and then does it.
            </strong>"
          </p>
        </blockquote>
      </div>
    </section>
  );
}
