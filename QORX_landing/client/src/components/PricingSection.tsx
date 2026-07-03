/**
 * QORX Pricing Section
 * Design: Obsidian Command Center
 * Three tiers: Starter €990 / Growth €2,900 / Enterprise €6,000+
 */
import { useEffect, useRef, useState } from "react";
import { Check, ArrowRight } from "lucide-react";

const PLANS = [
  {
    name: "Starter",
    price: "€990",
    period: "/month",
    tagline: "For teams starting their AI analytics journey",
    color: "#8B9CB8",
    features: [
      "3 data source connectors",
      "1 semantic model",
      "Chat AI with root cause",
      "5 user seats",
      "Basic time intelligence (WoW/MoM)",
      "Email support",
    ],
    cta: "Start with Starter",
    ctaStyle: "ghost",
  },
  {
    name: "Growth",
    price: "€2,900",
    period: "/month",
    tagline: "For operations teams replacing analyst reports",
    color: "#00D4FF",
    highlight: true,
    badge: "Most popular",
    features: [
      "8 data source connectors",
      "Unlimited metrics & semantic models",
      "Root cause + forecasting engine",
      "Anomaly detection (nightly + on-demand)",
      "20 user seats",
      "Slack/Teams alerts",
      "Priority support + onboarding",
    ],
    cta: "Request Growth demo",
    ctaStyle: "primary",
  },
  {
    name: "Enterprise",
    price: "€6,000+",
    period: "/month",
    tagline: "For mid-market companies with complex data stacks",
    color: "#7C3AED",
    features: [
      "SAP / Oracle / Dynamics 365 connectors",
      "Unlimited everything",
      "Action Engine (automated workflows)",
      "SSO / SAML",
      "Dedicated onboarding engineer",
      "Custom SLAs & uptime guarantees",
      "On-premise deployment option",
      "Quarterly business reviews",
    ],
    cta: "Talk to sales",
    ctaStyle: "ghost",
  },
];

function PricingCard({ plan, index }: { plan: (typeof PLANS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative rounded-2xl p-6 flex flex-col transition-all duration-500"
      style={{
        background: plan.highlight
          ? "linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(124,58,237,0.08) 100%)"
          : "rgba(13,17,23,0.8)",
        border: plan.highlight
          ? "1px solid rgba(0,212,255,0.35)"
          : "1px solid rgba(30,42,58,0.8)",
        boxShadow: plan.highlight ? "0 0 40px rgba(0,212,255,0.1)" : "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {plan.badge && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-4 py-1 rounded-full"
          style={{
            background: "#00D4FF",
            color: "#080B14",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {plan.badge}
        </div>
      )}

      {/* Plan name */}
      <div
        className="text-xs font-bold tracking-widest mb-3"
        style={{ fontFamily: "'JetBrains Mono', monospace", color: plan.color, letterSpacing: "0.12em" }}
      >
        {plan.name.toUpperCase()}
      </div>

      {/* Price */}
      <div className="flex items-end gap-1 mb-2">
        <span
          className="text-4xl font-bold"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F6FF", letterSpacing: "-0.03em" }}
        >
          {plan.price}
        </span>
        <span className="text-sm mb-1.5" style={{ color: "#8B9CB8" }}>{plan.period}</span>
      </div>

      <p className="text-xs mb-6 leading-relaxed" style={{ color: "#8B9CB8" }}>
        {plan.tagline}
      </p>

      {/* Divider */}
      <div className="h-px mb-6" style={{ background: `rgba(30,42,58,0.8)` }} />

      {/* Features */}
      <ul className="space-y-2.5 flex-1 mb-6">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm">
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: plan.color + "20", border: `1px solid ${plan.color}40` }}
            >
              <Check size={10} style={{ color: plan.color }} />
            </div>
            <span style={{ color: "#8B9CB8" }}>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#contact"
        className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${
          plan.ctaStyle === "primary" ? "qorx-btn-primary" : "qorx-btn-ghost"
        }`}
      >
        {plan.cta}
        <ArrowRight size={14} />
      </a>
    </div>
  );
}

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="py-24"
      style={{ background: "linear-gradient(180deg, #0A0E1A 0%, #080B14 100%)" }}
    >
      <div className="container">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="qorx-badge inline-flex mb-4">Pricing</div>
          <h2
            className="text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F6FF", letterSpacing: "-0.02em" }}
          >
            Value-based pricing.
            <br />
            <span className="qorx-gradient-text">Not seat-based.</span>
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "#8B9CB8" }}>
            QORX is a decision-intelligence product, not a dashboard tool. You pay for the value of decisions made,
            not the number of people who can view charts.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-5">
          {PLANS.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>

        {/* ROI callout */}
        <div
          className="mt-10 p-6 rounded-2xl grid md:grid-cols-3 gap-6"
          style={{
            background: "rgba(13,17,23,0.8)",
            border: "1px solid rgba(30,42,58,0.8)",
          }}
        >
          <div className="md:col-span-2">
            <h3
              className="text-lg font-semibold mb-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F6FF" }}
            >
              Target: 10 customers at blended €1,500/month average = €180K ARR
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#8B9CB8" }}>
              Our Year 1 success metric isn't just ARR — it's 3 documented cases where a QORX-generated insight
              changed a real business decision: pricing, stocking, staffing, or target revision.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-3">
            {[
              { label: "Year 1 ARR target", value: "€50K–€200K" },
              { label: "Net revenue retention", value: ">90%" },
              { label: "Design partner pricing", value: "Free/discounted" },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-xs" style={{ color: "#8B9CB8" }}>{s.label}</span>
                <span
                  className="text-sm font-semibold font-mono"
                  style={{ color: "#00D4FF" }}
                >
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
