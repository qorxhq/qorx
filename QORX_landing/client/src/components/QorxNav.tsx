/**
 * QORX Navigation
 * Design: Obsidian Command Center — sticky nav with scroll-aware opacity
 * Transparent over hero, solid dark on scroll
 * Uses the real QORX logo (white Q on black) — shown naturally on dark bg
 */
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const GITHUB_REPO = "https://github.com/qorxhq/qorx";

export default function QorxNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "How it works", href: "#how-it-works" },
    { label: "Architecture", href: "#architecture" },
    { label: "Pricing", href: "#pricing" },
    { label: "Competitors", href: "#competitors" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(8, 11, 20, 0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(30, 42, 58, 0.8)" : "1px solid transparent",
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center overflow-hidden transition-all duration-200 group-hover:shadow-[0_0_16px_rgba(0,212,255,0.3)]"
              style={{
                background: "rgba(0,212,255,0.06)",
                border: "1px solid rgba(0,212,255,0.2)",
              }}
            >
              <img
                src="/manus-storage/qorx-logo-real_2a91262a.png"
                alt="QORX"
                className="w-6 h-6 object-contain"
              />
            </div>
            <span
              className="text-xl font-bold tracking-tighter"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F6FF", letterSpacing: "-0.04em" }}
            >
              QORX
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors duration-150"
                style={{ color: "#8B9CB8", fontFamily: "'Inter', sans-serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F0F6FF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8B9CB8")}
              >
                {link.label}
              </a>
            ))}

            {/* GitHub link */}
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium transition-colors duration-150 flex items-center gap-1.5"
              style={{ color: "#8B9CB8", fontFamily: "'Inter', sans-serif" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#F0F6FF"; e.currentTarget.querySelector(".gh-icon")?.setAttribute("fill", "#F0F6FF"); }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#8B9CB8"; e.currentTarget.querySelector(".gh-icon")?.setAttribute("fill", "#8B9CB8"); }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="#8B9CB8" className="gh-icon transition-colors duration-150">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              GitHub
            </a>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#pricing"
              className="text-sm font-medium px-4 py-2 rounded-lg transition-all duration-150 qorx-btn-ghost"
            >
              View pricing
            </a>
            <a
              href="#contact"
              className="text-sm font-semibold px-5 py-2 rounded-lg qorx-btn-primary"
            >
              Request demo
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: "#8B9CB8" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t"
          style={{ background: "rgba(8, 11, 20, 0.98)", borderColor: "rgba(30, 42, 58, 0.8)" }}
        >
          <div className="container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={{ color: "#8B9CB8" }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2"
              style={{ color: "#8B9CB8" }}
              onClick={() => setMobileOpen(false)}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="#8B9CB8">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              GitHub
            </a>
            <div className="pt-3 flex flex-col gap-2">
              <a href="#contact" className="text-sm font-semibold px-5 py-2.5 rounded-lg qorx-btn-primary text-center">
                Request demo
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
