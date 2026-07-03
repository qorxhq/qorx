# QORX — Design Brainstorming

## Three Stylistic Approaches

### 1. Terminal Intelligence
**Theme:** Dark terminal aesthetic meets enterprise precision — monospace code meets sharp editorial typography.
**Intro:** Inspired by Bloomberg Terminal and command-line interfaces. The product is for people who live in data; the design respects that. Black background, amber/green accent, monospace code snippets woven into the UI.
**Probability:** 0.07

### 2. Obsidian Command Center
**Theme:** Deep space / obsidian dark with electric cyan and sharp white — a "mission control" aesthetic.
**Intro:** Think NASA control room meets AI product. Ultra-dark backgrounds, glowing data visualizations, sharp geometric lines. Communicates "this is serious infrastructure."
**Probability:** 0.09

### 3. Surgical White — Precision Intelligence
**Theme:** Clinical white with deep slate and a single electric accent — the aesthetic of a Bloomberg/Palantir hybrid.
**Intro:** Clean, high-contrast, almost brutalist in its restraint. White space is weaponized. Typography is the hero. A single electric indigo accent cuts through the white like a laser. Communicates precision, trust, and intelligence without visual noise.
**Probability:** 0.04

---

## CHOSEN APPROACH: Obsidian Command Center

### Design Movement
**Dark Enterprise Futurism** — referencing Palantir's Foundry, Linear, and Vercel's design language. Not "dark mode for the sake of it" — dark because the product is about seeing patterns in data, and dark backgrounds make data visualizations pop.

### Core Principles
1. **Data is the hero** — every visual element exists to surface information, not decorate
2. **Precision over decoration** — sharp edges, no unnecessary curves, geometric discipline
3. **Luminous hierarchy** — elements glow or pulse to indicate importance/activity
4. **Asymmetric tension** — layouts are deliberately off-center to create visual energy

### Color Philosophy
- **Background:** `#080B14` — near-black with a cold blue undertone (not pure black — too flat)
- **Surface:** `#0D1117` / `#111827` — GitHub-dark inspired card surfaces
- **Border:** `#1E2A3A` — barely-visible structural lines
- **Primary Accent:** `#00D4FF` — electric cyan — the "intelligence" color, used sparingly
- **Secondary Accent:** `#7C3AED` — deep violet — for AI/reasoning elements
- **Text Primary:** `#F0F6FF` — cold white
- **Text Secondary:** `#8B9CB8` — muted slate-blue
- **Success/Positive:** `#10B981` — emerald for metrics going up
- **Warning:** `#F59E0B` — amber for anomalies

**Emotional intent:** Walking into a room where the lights are off but every screen is alive with data. Calm authority. The product knows things you don't yet.

### Layout Paradigm
- **Asymmetric hero:** Left-aligned headline, right side shows animated chat interface mockup
- **Diagonal section breaks** using clip-path — no boring horizontal divides
- **Sticky left rail** for architecture diagram navigation
- **Card grid with varying sizes** — not uniform — some cards span 2 columns, creating rhythm
- **Full-bleed dark sections** alternating with slightly lighter card-surface sections

### Signature Elements
1. **Glowing data nodes** — small pulsing dots connected by thin lines (like a knowledge graph) used as background texture in hero
2. **Animated chat bubbles** — showing a real QORX conversation (question → analysis → decision) as a live demo
3. **Metric cards with live-looking numbers** — revenue figures, anomaly alerts, forecast lines rendered as mini-charts

### Interaction Philosophy
- Hover states reveal depth — cards lift with a subtle glow
- Scroll-triggered reveals — sections animate in as user scrolls
- The chat demo "types" in real-time as user scrolls past it
- CTA buttons have a subtle shimmer animation on hover

### Animation
- **Entrance:** Elements slide up 20px + fade in, staggered 60ms per item, 400ms ease-out
- **Hero background:** Slowly drifting particle network (CSS/canvas), very subtle, 0.3 opacity
- **Metric numbers:** Count up animation when entering viewport
- **Chat demo:** Typewriter effect for AI responses
- **Section transitions:** 200ms ease-out for all interactive states
- **Respect reduced-motion:** All animations gated behind `prefers-reduced-motion: no-preference`

### Typography System
- **Display/Headlines:** `Space Grotesk` — geometric, technical, slightly quirky. Bold 700 for H1, 600 for H2.
- **Body:** `Inter` — readable, neutral, professional. 400/500 weights.
- **Code/Data:** `JetBrains Mono` — for metric values, code snippets, terminal-style elements
- **Scale:** 72px hero → 48px H2 → 32px H3 → 18px body → 14px caption
- **Letter-spacing:** Headlines -0.02em (tighter), body 0, code 0.05em

### Brand Essence
**QORX: The AI that doesn't show you charts — it tells you what to do next.** For operations leaders drowning in dashboards. Uniquely positioned as the reasoning layer, not another BI tool.
**Personality:** Precise. Authoritative. Quietly confident.

### Brand Voice
- Headlines sound like a decisive analyst, not a startup: *"Your data already knows the answer. QORX finds it."*
- CTAs are direct: *"Connect your first data source"* not *"Get started today"*
- Microcopy is technical but human: *"Analyzing 847 transactions across 3 regions..."*
- **Banned phrases:** "Welcome to", "Get started today", "Revolutionary", "Game-changing", "Unlock the power of"

### Wordmark & Logo
- **Symbol:** A stylized `Q` where the tail of the Q becomes an arrow pointing right — representing "query → decision"
- The `Q` is constructed from two arcs with a gap — suggesting incompleteness that QORX fills
- Rendered in electric cyan `#00D4FF` on dark background
- Logotype: `QORX` in Space Grotesk Bold, letter-spacing -0.05em, all caps

### Signature Brand Color
`#00D4FF` — Electric Cyan — unmistakably QORX's. Used for: the logo accent, primary CTA buttons, active states, data highlights, and the "intelligence pulse" animation.
