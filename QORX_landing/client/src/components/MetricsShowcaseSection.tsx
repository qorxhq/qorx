/**
 * QORX Metrics Showcase Section
 * Design: Obsidian Command Center
 * Shows the metrics engine, anomaly detection, and forecasting capabilities
 * with live-looking animated metric cards
 */
import { useEffect, useRef, useState } from "react";
import { TrendingUp, TrendingDown, AlertTriangle, Activity, Target, BarChart3 } from "lucide-react";

const METRICS = [
  {
    label: "Net Revenue",
    value: "€1.24M",
    change: "+12.4%",
    period: "vs last month",
    trend: "up",
    color: "#10B981",
    sparkline: [40, 45, 42, 55, 58, 62, 70, 68, 75, 80, 78, 85],
  },
  {
    label: "Win Rate",
    value: "34.2%",
    change: "-3.1%",
    period: "vs last quarter",
    trend: "down",
    color: "#EF4444",
    sparkline: [55, 52, 50, 48, 45, 47, 44, 42, 40, 38, 36, 34],
    anomaly: true,
  },
  {
    label: "Sellout vs TGT80",
    value: "91.7%",
    change: "+5.2%",
    period: "WoW",
    trend: "up",
    color: "#00D4FF",
    sparkline: [70, 72, 68, 75, 78, 80, 82, 85, 83, 88, 90, 92],
  },
  {
    label: "Forecast (30d)",
    value: "€1.41M",
    change: "±€82K",
    period: "confidence interval",
    trend: "neutral",
    color: "#7C3AED",
    sparkline: [85, 87, 88, 90, 89, 92, 94, 93, 96, 98, 100, 102],
    isForecast: true,
  },
];

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 80;
  const height = 32;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />
      <polyline
        points={`0,${height} ${points} ${width},${height}`}
        fill={color}
        opacity="0.08"
      />
    </svg>
  );
}

function MetricCard({ metric, index }: { metric: (typeof METRICS)[0]; index: number }) {
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

  return (
    <div
      ref={ref}
      className="qorx-card p-5 relative overflow-hidden transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${index * 80}ms`,
      }}
    >
      {metric.anomaly && (
        <div
          className="absolute top-3 right-3 flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
          style={{
            background: "rgba(245,158,11,0.1)",
            border: "1px solid rgba(245,158,11,0.3)",
            color: "#F59E0B",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          <AlertTriangle size={10} />
          anomaly
        </div>
      )}

      {metric.isForecast && (
        <div
          className="absolute top-3 right-3 flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
          style={{
            background: "rgba(124,58,237,0.1)",
            border: "1px solid rgba(124,58,237,0.3)",
            color: "#7C3AED",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          <Activity size={10} />
          forecast
        </div>
      )}

      <div className="text-xs mb-2" style={{ color: "#8B9CB8", fontFamily: "'JetBrains Mono', monospace" }}>
        {metric.label}
      </div>

      <div className="flex items-end justify-between">
        <div>
          <div
            className="text-2xl font-bold mb-1"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F6FF", letterSpacing: "-0.02em" }}
          >
            {metric.value}
          </div>
          <div className="flex items-center gap-1.5">
            {metric.trend === "up" && <TrendingUp size={12} style={{ color: metric.color }} />}
            {metric.trend === "down" && <TrendingDown size={12} style={{ color: metric.color }} />}
            {metric.trend === "neutral" && <Activity size={12} style={{ color: metric.color }} />}
            <span className="text-xs font-mono font-medium" style={{ color: metric.color }}>
              {metric.change}
            </span>
            <span className="text-xs" style={{ color: "#8B9CB8" }}>{metric.period}</span>
          </div>
        </div>
        <Sparkline data={metric.sparkline} color={metric.color} />
      </div>
    </div>
  );
}

const CAPABILITIES = [
  {
    icon: AlertTriangle,
    title: "Anomaly Detection",
    desc: "STL seasonal decomposition + IsolationForest. Surfaces proactively: 'Revenue dropped 18% WoW in Lombardy — investigate?'",
    color: "#F59E0B",
  },
  {
    icon: BarChart3,
    title: "Root Cause Analysis",
    desc: "Shapley-value attribution decomposes metric deltas by dimension (region, product, channel, rep). Top 2–3 drivers in business language.",
    color: "#00D4FF",
  },
  {
    icon: Activity,
    title: "Forecasting Engine",
    desc: "Prophet / AutoARIMA per metric time series. LLM adds qualitative context. Confidence intervals always shown — never presented as certainty.",
    color: "#7C3AED",
  },
  {
    icon: Target,
    title: "Time Intelligence",
    desc: "WoW / MoM / YoY comparisons, dimensional slicing, drill-down — compiled from your semantic model into optimized SQL automatically.",
    color: "#10B981",
  },
];

export default function MetricsShowcaseSection() {
  return (
    <section
      className="py-24"
      style={{ background: "linear-gradient(180deg, #080B14 0%, #0A0E1A 100%)" }}
    >
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Metrics cards */}
          <div>
            <div className="qorx-badge inline-flex mb-4">Metrics Engine</div>
            <h2
              className="text-4xl font-bold mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F6FF", letterSpacing: "-0.02em" }}
            >
              Live metrics.
              <br />
              <span className="qorx-gradient-text">Grounded in your data.</span>
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "#8B9CB8" }}>
              Every number comes from a tool call against your real data. No hallucinated figures.
              Every metric is backed by a YAML definition that compiles to SQL — versioned like code.
            </p>

            {/* Metric cards grid */}
            <div className="grid grid-cols-2 gap-3">
              {METRICS.map((m, i) => (
                <MetricCard key={m.label} metric={m} index={i} />
              ))}
            </div>

            {/* Dashboard image */}
            <div
              className="mt-4 rounded-xl overflow-hidden"
              style={{ border: "1px solid rgba(30,42,58,0.8)" }}
            >
              <img
                src="/manus-storage/qorx-metrics-dashboard_c36cc6a4.png"
                alt="QORX Metrics Dashboard"
                className="w-full object-cover"
                style={{ maxHeight: "200px", objectPosition: "top" }}
              />
            </div>
          </div>

          {/* Right: Capabilities */}
          <div className="space-y-5 lg:pt-16">
            {CAPABILITIES.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div
                  key={i}
                  className="qorx-card p-5 flex gap-4"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: cap.color + "15", border: `1px solid ${cap.color}30` }}
                  >
                    <Icon size={18} style={{ color: cap.color }} />
                  </div>
                  <div>
                    <h4
                      className="text-sm font-semibold mb-1.5"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F6FF" }}
                    >
                      {cap.title}
                    </h4>
                    <p className="text-xs leading-relaxed" style={{ color: "#8B9CB8" }}>
                      {cap.desc}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Code snippet */}
            <div className="qorx-code-block">
              <div className="text-xs mb-2" style={{ color: "#8B9CB8" }}># Semantic model example</div>
              <div style={{ color: "#7C3AED" }}>model: <span style={{ color: "#00D4FF" }}>sales_performance</span></div>
              <div style={{ color: "#7C3AED" }}>metrics:</div>
              <div className="pl-4">
                <div>- name: <span style={{ color: "#10B981" }}>win_rate</span></div>
                <div className="pl-4 text-xs" style={{ color: "#8B9CB8" }}>
                  formula: count(deal WHERE stage='won') / count(deal)
                </div>
                <div>- name: <span style={{ color: "#10B981" }}>sellout_vs_target</span></div>
                <div className="pl-4 text-xs" style={{ color: "#8B9CB8" }}>
                  formula: sum(sellout_units) / sum(target_units)
                </div>
              </div>
              <div style={{ color: "#7C3AED" }}>business_glossary:</div>
              <div className="pl-4 text-xs" style={{ color: "#8B9CB8" }}>
                "TGT80": "Achievement vs 80% of monthly target"
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
