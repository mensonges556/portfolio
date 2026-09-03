# Emma — Portfolio

A premium, editorial portfolio experience. Dark stage, oversized grotesque
typography, a serif italic counter-voice, and `#FFA9FF` used strictly as a
signature accent.

> **All content is placeholder.** No real client, brand, project or metric is
> represented. See [Replacing the placeholders](#replacing-the-placeholders).

## Stack

| Concern    | Choice                     | Why |
| ---------- | -------------------------- | --- |
| Build      | Vite + React 19 + TypeScript | Single-page experience, no SSR needed |
| Styling    | Tailwind CSS v4 + CSS custom properties | Utilities for layout, tokens for the design system |
| Animation  | `motion` (Framer Motion)   | Scroll-linked values, variants, `AnimatePresence` |
| Scrolling  | `lenis`                    | Smooth scroll that still drives native scroll position |

Four runtime dependencies, each doing real work. Nothing is installed for
decoration.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
npm run preview  # serve the build
npm run lint
```

## Art direction

- **Ground** — near-black `#08080A`, warm off-white `#F2F0EE`, hairline rules
  at 10% opacity. Depth comes from a static film grain and a vignette, not
  from shadows.
- **Type** — Inter Tight for structure (uppercase, tight tracking, up to 26vw),
  Instrument Serif italic as the expressive counter-voice, JetBrains Mono for
  metadata rails and labels.
- **Accent** — `#FFA9FF` appears as: availability status, section indices,
  hover states, one accent event per placeholder visual, the custom cursor,
  and exactly three large typographic moments (`linger`, `remember.`,
  `memorable.`). Never as a background wash.
- **Motion** — one easing curve (`cubic-bezier(0.16, 1, 0.3, 1)`), short
  durations, masked line reveals, subtle parallax. Motion explains space; it
  never performs.

## Architecture

```
src/
  data/
    site.ts          # identity, nav, about, services — ALL PLACEHOLDER
    projects.ts      # featured project, index, archive — ALL PLACEHOLDER
  styles/
    tokens.css       # colour, type, spacing, motion tokens + Tailwind theme
    base.css         # reset, type primitives, shared micro-interactions
  lib/
    motion.ts        # easing, durations, shared variants
    scroll.ts        # Lenis singleton, scroll lock, scroll-to helpers
  hooks/
    useMediaQuery.ts       # pointer / breakpoint queries
    usePointerParallax.ts  # spring-smoothed pointer position
    useActiveSection.ts    # IntersectionObserver section tracking
  components/
    PageLoader  CustomCursor  Grain  Navigation  Hud
    Hero  Manifesto  Work  FeaturedProject  ProjectIndex  ProjectRow
    Archive  ProjectVisual  About  Services  Contact  Footer
    Reveal  MagneticButton
```

Presentation never hard-codes content: every section reads from `src/data`.

## Replacing the placeholders

1. **Identity, bio, expertise** — edit `src/data/site.ts` (name, email, socials,
   location, availability, about copy, services).
2. **Projects** — edit `src/data/projects.ts`. Each entry is a flat object:

   ```ts
   {
     number: '02',
     slug: 'project-two',
     title: 'Project Two',
     category: 'Brand Identity',
     year: '2026',
     description: '…',
     tags: ['Identity', 'Digital Rollout'],
     visual: 'arc',      // generated placeholder composition
     ratio: '4 / 5',     // desktop aspect ratio of the visual frame
   }
   ```

3. **Real imagery** — the placeholder art system lives in
   `ProjectVisual.tsx`. Swap `<ProjectVisual … />` for an `<img>` (or `<video>`)
   inside the same frame; the surrounding layout is agnostic:

   ```tsx
   <img src={project.image} alt="" loading="lazy" className="h-full w-full object-cover" />
   ```

4. **Placeholder disclosures** — remove the temporary notes once real content
   lands: `about.note` in `site.ts`, the caption props passed to
   `ProjectVisual`, the "placeholder set" asides in `Work`/`Contact`, and the
   footer line in `Footer.tsx`.
5. **Links** — social `href`s are `#`, and the email/phone are fictional.

## Interaction notes

- **Custom cursor** — desktop only, driven declaratively by data attributes:
  `data-cursor="hover"`, or `data-cursor="label" data-cursor-label="Open"`.
  Disabled entirely on touch and coarse pointers.
- **Project index** — hovering a row dims its siblings and glides a preview
  panel through the right half of the list. On touch, each row shows its own
  inline visual instead, since there is no hover to reveal.
- **Archive rail** — native scroll on touch, click-and-drag on desktop.
- **HUD** — scroll readout, local clock, availability and section index.
  Desktop only; retreats when the footer arrives.

## Accessibility

- Semantic landmarks, one `h1`, skip link, `aria-current` on the active nav item.
- The decorative spread hero wordmark is `aria-hidden`; a real `h1` carries the
  text for assistive tech.
- Visible focus rings in the accent colour; the mobile menu closes on `Escape`.
- `prefers-reduced-motion` is honoured globally through
  `<MotionConfig reducedMotion="user">`, a CSS override that collapses
  transitions, a skipped loader sequence, and disabled parallax, pointer
  tracking and scroll-linked reveals.

## Performance

Animations are limited to `transform`, `opacity` and `clip-path`. The grain is
a single static SVG, the placeholder visuals are inline SVG (no image
payload), and pointer/scroll work runs through spring-smoothed motion values
rather than per-frame React state.
