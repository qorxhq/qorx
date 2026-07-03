/**
 * QORX Hero Section
 * Design: Obsidian Command Center
 * Left: Bold headline + CTA | Right: Animated chat demo
 * Background: Particle network image + subtle overlay
 */
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Zap, TrendingDown, AlertTriangle } from "lucide-react";

const CHAT_DEMO = [
  {
    role: "user",
    text: "Why did revenue drop 18% in Lombardy last week?",
    delay: 0,
  },
  {
    role: "ai",
    text: "Analyzing 847 transactions across 3 regions...",
    isThinking: true,
    delay: 1200,
  },
  {
    role: "ai",
    text: "Root cause identified: 3 drivers explain 94% of the variance.",
    delay: 2800,
    highlights: [
      { label: "SKU ZTE-A73 stockout", value: "-€47K", color: "#F59E0B" },
      { label: "Retailer Rossi SPA churn", value: "-€31K", color: "#EF4444" },
      { label: "Competitor promo (Samsung)", value: "-€18K", color: "#8B9CB8" },
    ],
  },
  {
    role: "ai",
    text: "Recommended action: Expedite ZTE-A73 restock to Milan DC. Estimated revenue recovery: €38K in 7 days.",
    delay: 4200,
    action: "Automate this alert",
  },
];

function ChatBubble({
  message,
  visible,
}: {
  message: (typeof CHAT_DEMO)[0];
  visible: boolean;
}) {
  const isUser = message.role === "user";

  return (
    <div
      className={`transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
      style={{ transitionDelay: "0ms" }}
    >
      {isUser ? (
        <div className="flex justify-end mb-3">
          <div
            className="max-w-xs px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm"
            style={{
              background: "rgba(0, 212, 255, 0.12)",
              border: "1px solid rgba(0, 212, 255, 0.2)",
              color: "#F0F6FF",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {message.text}
          </div>
        </div>
      ) : (
        <div className="flex gap-2.5 mb-3">
          <div
            className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 animate-pulse-glow"
            style={{ background: "rgba(0, 212, 255, 0.15)", border: "1px solid rgba(0, 212, 255, 0.4)" }}
          >
            <span style={{ fontSize: "8px", color: "#00D4FF", fontFamily: "monospace", fontWeight: 700 }}>Q</span>
          </div>
          <div className="flex-1">
            {message.isThinking ? (
              <div
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl rounded-tl-sm text-sm"
                style={{
                  background: "rgba(13, 17, 23, 0.8)",
                  border: "1px solid rgba(30, 42, 58, 0.8)",
                  color: "#8B9CB8",
                }}
              >
                <span className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: "#00D4FF",
                        animation: `node-pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </span>
                {message.text}
              </div>
            ) : (
              <div
                className="px-4 py-3 rounded-2xl rounded-tl-sm text-sm"
                style={{
                  background: "rgba(13, 17, 23, 0.8)",
                  border: "1px solid rgba(30, 42, 58, 0.8)",
                  borderLeft: "2px solid rgba(0, 212, 255, 0.5)",
                  color: "#F0F6FF",
                  fontFamily: "'Inter', sans-serif",
                  lineHeight: 1.6,
                }}
              >
                <p>{message.text}</p>
                {message.highlights && (
                  <div className="mt-3 space-y-1.5">
                    {message.highlights.map((h, i) => (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <span style={{ color: "#8B9CB8" }}>{h.label}</span>
                        <span
                          className="font-mono font-medium"
                          style={{ color: h.color }}
                        >
                          {h.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {message.action && (
                  <button
                    className="mt-3 flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-150"
                    style={{
                      background: "rgba(0, 212, 255, 0.1)",
                      border: "1px solid rgba(0, 212, 255, 0.3)",
                      color: "#00D4FF",
                    }}
                  >
                    <Zap size={11} />
                    {message.action}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function HeroSection() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    CHAT_DEMO.forEach((msg, i) => {
      const t = setTimeout(() => {
        setVisibleMessages((prev) => [...prev, i]);
      }, msg.delay);
      timerRef.current.push(t);
    });
    return () => timerRef.current.forEach(clearTimeout);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#080B14" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/manus-storage/qorx-hero-bg_4bcb5608.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.35,
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(8,11,20,0.95) 0%, rgba(8,11,20,0.7) 50%, rgba(8,11,20,0.9) 100%)",
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-0"
        style={{ background: "linear-gradient(to bottom, transparent, #080B14)" }}
      />

      <div className="container relative z-10 pt-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Headline */}
          <div>
            <div className="qorx-badge inline-flex mb-6">
              AI Decision Intelligence OS · v1.0
            </div>

            <h1
              className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] mb-6"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: "-0.03em",
                color: "#F0F6FF",
              }}
            >
              Your data already
              <br />
              knows the answer.
              <br />
              <span className="qorx-gradient-text">QORX finds it.</span>
            </h1>

            <p
              className="text-lg mb-8 max-w-md leading-relaxed"
              style={{ color: "#8B9CB8", fontFamily: "'Inter', sans-serif" }}
            >
              The reasoning layer above every ERP, CRM, and database. Not another dashboard —
              QORX explains <em style={{ color: "#F0F6FF" }}>why</em> something happened,
              predicts <em style={{ color: "#F0F6FF" }}>what's next</em>, and executes
              the <em style={{ color: "#F0F6FF" }}>right action</em> automatically.
            </p>

            {/* Stats row */}
            <div className="flex gap-8 mb-10">
              {[
                { value: "< 5min", label: "to first insight" },
                { value: "94%", label: "root cause accuracy" },
                { value: "0", label: "analysts required" },
              ].map((stat, i) => (
                <div key={i}>
                  <div
                    className="text-2xl font-bold"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#00D4FF" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "#8B9CB8" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold qorx-btn-primary"
              >
                Connect your first data source
                <ArrowRight size={16} />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium qorx-btn-ghost"
              >
                See how it works
              </a>
            </div>

            {/* Trust signals */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {["#00D4FF", "#7C3AED", "#10B981"].map((c, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2"
                    style={{ background: c + "33", borderColor: c, opacity: 0.8 }}
                  />
                ))}
              </div>
              <p className="text-xs" style={{ color: "#8B9CB8" }}>
                Trusted by mid-market teams in Milan · Lombardy · Northern Italy
              </p>
            </div>
          </div>

          {/* Right: Chat Demo */}
          <div className="relative">
            <div
              className="rounded-2xl p-1 animate-float"
              style={{
                background: "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(124,58,237,0.2))",
              }}
            >
              <div
                className="rounded-xl overflow-hidden"
                style={{ background: "#0D1117", border: "1px solid rgba(30,42,58,0.8)" }}
              >
                {/* Chat header */}
                <div
                  className="flex items-center gap-3 px-4 py-3 border-b"
                  style={{ borderColor: "rgba(30,42,58,0.8)", background: "rgba(8,11,20,0.6)" }}
                >
                  <div className="flex gap-1.5">
                    {["#EF4444", "#F59E0B", "#10B981"].map((c, i) => (
                      <div key={i} className="w-3 h-3 rounded-full" style={{ background: c, opacity: 0.7 }} />
                    ))}
                  </div>
                  <div
                    className="flex items-center gap-2 text-xs"
                    style={{ color: "#8B9CB8", fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ background: "#10B981" }}
                    />
                    QORX · Lombardy Sales Analysis
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <div
                      className="text-xs px-2 py-0.5 rounded"
                      style={{
                        background: "rgba(245, 158, 11, 0.1)",
                        border: "1px solid rgba(245, 158, 11, 0.3)",
                        color: "#F59E0B",
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      <AlertTriangle size={10} className="inline mr-1" />
                      anomaly
                    </div>
                  </div>
                </div>

                {/* Chat messages */}
                <div className="p-4 space-y-1 min-h-[320px]">
                  {CHAT_DEMO.map((msg, i) => (
                    <ChatBubble
                      key={i}
                      message={msg}
                      visible={visibleMessages.includes(i)}
                    />
                  ))}
                </div>

                {/* Input bar */}
                <div
                  className="px-4 py-3 border-t flex items-center gap-2"
                  style={{ borderColor: "rgba(30,42,58,0.8)", background: "rgba(8,11,20,0.4)" }}
                >
                  <div
                    className="flex-1 text-sm px-3 py-2 rounded-lg"
                    style={{
                      background: "rgba(30,42,58,0.5)",
                      border: "1px solid rgba(30,42,58,0.8)",
                      color: "#8B9CB8",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Ask QORX anything about your business...
                    <span className="animate-typing-cursor" style={{ color: "#00D4FF" }}>|</span>
                  </div>
                  <button
                    className="p-2 rounded-lg transition-all duration-150"
                    style={{
                      background: "rgba(0,212,255,0.15)",
                      border: "1px solid rgba(0,212,255,0.3)",
                      color: "#00D4FF",
                    }}
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Floating metric badge */}
            <div
              className="absolute -bottom-4 -left-4 px-4 py-2.5 rounded-xl animate-float"
              style={{
                animationDelay: "1s",
                background: "rgba(13,17,23,0.95)",
                border: "1px solid rgba(16,185,129,0.3)",
                boxShadow: "0 0 20px rgba(16,185,129,0.1)",
              }}
            >
              <div className="flex items-center gap-2">
                <TrendingDown size={14} style={{ color: "#EF4444" }} />
                <span className="text-xs font-mono" style={{ color: "#F0F6FF" }}>
                  Revenue Lombardy
                </span>
                <span className="text-xs font-bold font-mono" style={{ color: "#EF4444" }}>
                  -18% WoW
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
