/**
 * QORX Contact / CTA Section + Footer
 * Design: Obsidian Command Center
 * Uses real QORX logo
 */
import { useState } from "react";
import { ArrowRight, Mail, MapPin, Github } from "lucide-react";
import { toast } from "sonner";

const GITHUB_REPO = "https://github.com/qorxhq/qorx";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Request received! We'll reach out within 24 hours.", {
        style: { background: "#0D1117", border: "1px solid rgba(16,185,129,0.3)", color: "#F0F6FF" },
      });
      setForm({ name: "", company: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <>
      {/* CTA Section */}
      <section
        id="contact"
        className="py-24 relative overflow-hidden"
        style={{ background: "#080B14" }}
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,255,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: CTA copy */}
            <div>
              <div className="qorx-badge inline-flex mb-6">Early access</div>
              <h2
                className="text-4xl lg:text-5xl font-bold mb-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F6FF", letterSpacing: "-0.02em" }}
              >
                Stop building dashboards
                <br />
                <span className="qorx-gradient-text">nobody reads.</span>
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#8B9CB8" }}>
                We're onboarding 1–2 design partners from the Milan / Lombardy area — free or
                discounted in exchange for case studies. If you have data spread across ERP, Excel,
                and a CRM, and your analysts spend more time building reports than making decisions,
                QORX is built for you.
              </p>

              {/* What you get */}
              <div className="space-y-3 mb-8">
                {[
                  "Connected to your first data source in under 5 minutes",
                  "Custom semantic model built with you during onboarding",
                  "First AI-generated insight on your real data in the same session",
                  "Full access to root cause, forecasting, and anomaly detection",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "rgba(0,212,255,0.15)", border: "1px solid rgba(0,212,255,0.3)" }}
                    >
                      <ArrowRight size={10} style={{ color: "#00D4FF" }} />
                    </div>
                    <span className="text-sm" style={{ color: "#8B9CB8" }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Contact info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm" style={{ color: "#8B9CB8" }}>
                  <Mail size={14} style={{ color: "#00D4FF" }} />
                  <span>hello@qorx.ai</span>
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: "#8B9CB8" }}>
                  <MapPin size={14} style={{ color: "#00D4FF" }} />
                  <span>Milan, Lombardy, Italy</span>
                </div>
                <a
                  href={GITHUB_REPO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm transition-colors duration-150"
                  style={{ color: "#8B9CB8" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#F0F6FF")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#8B9CB8")}
                >
                  <Github size={14} style={{ color: "#00D4FF" }} />
                  <span>github.com/qorxhq/qorx</span>
                </a>
              </div>
            </div>

            {/* Right: Contact form */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgba(13,17,23,0.8)",
                border: "1px solid rgba(30,42,58,0.8)",
              }}
            >
              <h3
                className="text-xl font-bold mb-1"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F6FF" }}
              >
                Request a demo
              </h3>
              <p className="text-sm mb-6" style={{ color: "#8B9CB8" }}>
                We'll respond within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs mb-1.5" style={{ color: "#8B9CB8" }}>
                      Full name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Marco Rossi"
                      className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-all duration-150"
                      style={{
                        background: "rgba(8,11,20,0.8)",
                        border: "1px solid rgba(30,42,58,0.8)",
                        color: "#F0F6FF",
                        fontFamily: "'Inter', sans-serif",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,212,255,0.4)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(30,42,58,0.8)")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs mb-1.5" style={{ color: "#8B9CB8" }}>
                      Company
                    </label>
                    <input
                      type="text"
                      required
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Rossi Manufacturing SPA"
                      className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-all duration-150"
                      style={{
                        background: "rgba(8,11,20,0.8)",
                        border: "1px solid rgba(30,42,58,0.8)",
                        color: "#F0F6FF",
                        fontFamily: "'Inter', sans-serif",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,212,255,0.4)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(30,42,58,0.8)")}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs mb-1.5" style={{ color: "#8B9CB8" }}>
                    Work email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="marco@rossimanufacturing.it"
                    className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-all duration-150"
                    style={{
                      background: "rgba(8,11,20,0.8)",
                      border: "1px solid rgba(30,42,58,0.8)",
                      color: "#F0F6FF",
                      fontFamily: "'Inter', sans-serif",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,212,255,0.4)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(30,42,58,0.8)")}
                  />
                </div>

                <div>
                  <label className="block text-xs mb-1.5" style={{ color: "#8B9CB8" }}>
                    Tell us about your data challenge
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="We have data in SAP and Excel, 2 analysts, and our COO wants to know why sellout is missing target every month..."
                    className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-all duration-150 resize-none"
                    style={{
                      background: "rgba(8,11,20,0.8)",
                      border: "1px solid rgba(30,42,58,0.8)",
                      color: "#F0F6FF",
                      fontFamily: "'Inter', sans-serif",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,212,255,0.4)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(30,42,58,0.8)")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold qorx-btn-primary disabled:opacity-60"
                >
                  {sending ? (
                    <>
                      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Connect your first data source
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>

                <p className="text-xs text-center" style={{ color: "#8B9CB8" }}>
                  No credit card required for design partner program.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-10 border-t"
        style={{ background: "#080B14", borderColor: "rgba(30,42,58,0.8)" }}
      >
        <div className="container">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Logo + tagline */}
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden transition-all duration-200 hover:shadow-[0_0_16px_rgba(0,212,255,0.3)]"
                  style={{
                    background: "rgba(0,212,255,0.06)",
                    border: "1px solid rgba(0,212,255,0.2)",
                  }}
                >
                  <img
                    src="/manus-storage/qorx-logo-real_2a91262a.png"
                    alt="QORX"
                    className="w-5 h-5 object-contain"
                  />
                </div>
                <span
                  className="text-lg font-bold"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F6FF", letterSpacing: "-0.04em" }}
                >
                  QORX
                </span>
              </div>
              <p className="text-xs" style={{ color: "#8B9CB8" }}>
                AI Decision Intelligence OS · Milan, Italy
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-6">
              {[
                { label: "How it works", href: "#how-it-works" },
                { label: "Architecture", href: "#architecture" },
                { label: "Pricing", href: "#pricing" },
                { label: "Request demo", href: "#contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs transition-colors duration-150"
                  style={{ color: "#8B9CB8" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#F0F6FF")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#8B9CB8")}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={GITHUB_REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs transition-colors duration-150 flex items-center gap-1"
                style={{ color: "#8B9CB8" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F0F6FF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8B9CB8")}
              >
                <Github size={11} />
                GitHub
              </a>
            </div>

            {/* Copyright */}
            <p className="text-xs" style={{ color: "#8B9CB8", fontFamily: "'JetBrains Mono', monospace" }}>
              © 2026 QORX · v1.0
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
