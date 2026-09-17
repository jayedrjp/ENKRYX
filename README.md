# ENKRYX Landing Page

Premium corporate SaaS landing page built with React, TypeScript, Tailwind CSS, and Lucide React.

## Stack

- React 18 + TypeScript
- Vite (build tool / dev server)
- Tailwind CSS (brand tokens configured in `tailwind.config.js`)
- lucide-react (icons)

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build      # type-checks then builds to /dist
npm run preview    # preview the production build
```

Requires Node 18+.

## Project structure

```
src/
  App.tsx                 # assembles all sections in order
  index.css                # Tailwind directives + base styles, reduced-motion support
  lib/
    tokens.ts               # brand color constants
    useReveal.ts             # fade-up-on-scroll IntersectionObserver hook
  components/
    Navbar.tsx
    Hero.tsx
    StatsCard.tsx
    TrustedBy.tsx
    ServiceCard.tsx
    Services.tsx
    WhyChoose.tsx
    HowWeWork.tsx
    PortfolioCard.tsx
    Portfolio.tsx
    TeamCard.tsx
    Team.tsx
    TestimonialCard.tsx
    Testimonials.tsx
    FAQAccordion.tsx
    FinalCTA.tsx
    Footer.tsx
    BackgroundDecor.tsx     # GridBackdrop, CircleDecor, DotMatrix
```

## Brand tokens

Defined once in `tailwind.config.js` and mirrored in `src/lib/tokens.ts`:

| Token   | Hex       |
|---------|-----------|
| azure   | `#006E87` |
| teal    | `#005A70` |
| heading | `#071827` |
| canvas  | `#FCFDFE` |
| card    | `#FFFFFF` |
| border  | `#DCE6EB` |
| grid    | `#EAF1F4` |
| muted   | `#5F7285` |

Font: Poppins (loaded via Google Fonts in `index.html`).

## Hero section (v2 — single animation stage)

Per follow-up feedback, the right side of the hero is now **one borderless
animation stage**, not a bento grid. `HeroAnimationStage.tsx` cycles through
the same four recolored illustrations **one at a time**: each scene slides in
from the right (`heroSceneEnter` keyframe in `index.css`), holds, then exits
left (`heroSceneExit`) before the next one enters. No card, border, panel, or
frame — the stage's own background is transparent so it floats directly on
the hero's white/grid background.

Below the stage: a small "Workflow Automation" caption, then a pagination row
— an elongated `#006E87` pill marks the active scene, small neutral-gray dots
mark the rest, updating as the animation cycles.

Timing (tweak in `HeroAnimationStage.tsx`): 650ms enter → 2.6s hold → 450ms
exit, then the next scene. `prefers-reduced-motion` is respected globally via
`index.css`, which collapses these to near-instant transitions rather than
disabling the scene change entirely.

### Previous iteration

An earlier pass arranged the four illustrations as a permanent bordered
"bento" grid (all visible at once, with corner labels like `01 —
ENGINEERING`). That approach was explicitly replaced by this one — if you see
a `HeroIllustrationSystem.tsx` reference anywhere (docs, old branches), it no
longer exists in this codebase.

## Hero section — illustrations

**Illustrations:** `public/illustrations/` contains four SVGs, originally
uploaded as colorful stock illustrations, that were programmatically recolored
to the brief's palette (white / near-black `#111111` / muted gray / accent
`#006E87`) while preserving their original SMIL entrance animations:

- `tri-monitor-stack.svg` — multi-monitor dev setup + tech badges (primary/largest)
- `desktop-monitor.svg` — single monitor product view
- `dev-coding.svg` — developer working across interfaces
- `man-and-robot.svg` — engineer + automated assistant (wide strip)

A fifth uploaded file (`Mobile_App_Showcase.svg`) was a much heavier,
deeply-nested Lottie-style export (~3,200 SMIL animation tags, including
opacity and path-morph animation) that couldn't be reliably resolved to a
correct static/recolored state in this pass, so it was left out of the
rotation. It's still in `/mnt/user-data/uploads` if you want it revisited
separately.

They're wired into `HeroAnimationStage.tsx` as sequential scenes (see above),
not a simultaneous grid.

**Recoloring approach:** each original fill/stroke/gradient-stop color was
converted to HSL; low-saturation/near-white/near-black colors were mapped onto
a neutral gray ramp, warm hues (skin tones, clothing, highlights) were also
desaturated onto that same gray ramp, and cool hues (screens, gears, badges —
the "technology" elements) were mapped onto an azure ramp anchored on
`#006E87`. This keeps people/objects readable as clean line art while
concentrating the accent color on the technical/UI elements, per the brief.

## Notes

- Placeholder content: team member names/photos and "Trusted by" logos are
  placeholders (initials/wordmarks). Swap in real client assets before shipping.
- Accessible by default: semantic landmarks, visible focus rings (`index.css`),
  `aria-label`/`aria-expanded` on interactive controls, `prefers-reduced-motion`
  respected globally.
- This project was authored in a sandboxed environment without npm registry
  access, so `npm install` / `npm run build` could not be executed here to
  confirm a clean TypeScript compile. Files were manually reviewed and
  bracket/paren balance was checked programmatically. The hero's visual
  composition (colors, typography, spacing, recolored illustrations) *was*
  verified by rendering a static HTML/CSS mirror of the same markup with a
  local headless renderer — but that renderer's CSS Grid support predates the
  spec, so the two-column layout and bento grid rendered stacked there even
  though the actual Tailwind classes (`grid-cols-[45%_55%]`, etc.) use
  standard, well-supported modern CSS Grid and should lay out side-by-side
  correctly in any current browser. Please run `npm install && npm run build`
  as your first step and sanity-check the live layout.
- `tri-monitor-stack.svg` is ~4.7MB (inherited from the original file — lots
  of inline path data for the gear icons). It still renders fine but is worth
  optimizing (e.g. `svgo`) before shipping to production if page weight matters.
