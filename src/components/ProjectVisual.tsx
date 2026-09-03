import { useId } from 'react'
import type { VisualVariant } from '../data/projects'

/* ------------------------------------------------------------------
   PLACEHOLDER VISUAL SYSTEM
   Generated abstract compositions standing in for real project imagery.
   They share one art direction — near-black ground, hairline geometry,
   a single accent event — so the portfolio reads as finished rather
   than empty. Replace with <img> when real work exists; the surrounding
   layout does not care which it gets.
   ------------------------------------------------------------------ */

type Props = {
  variant: VisualVariant
  /** Editorial caption in the corner, e.g. "Fig. 01". */
  caption?: string
  className?: string
}

/**
 * Patterns bleed past the frame; discrete forms stay whole and centred,
 * otherwise a 16:9 crop swallows them.
 */
const FIT: Record<VisualVariant, 'xMidYMid slice' | 'xMidYMid meet'> = {
  arc: 'xMidYMid slice',
  field: 'xMidYMid slice',
  grid: 'xMidYMid slice',
  sphere: 'xMidYMid meet',
  nest: 'xMidYMid meet',
  bars: 'xMidYMid meet',
  monogram: 'xMidYMid meet',
}

export function ProjectVisual({ variant, caption, className = '' }: Props) {
  const uid = useId().replace(/:/g, '')

  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-[var(--surface)] ${className}`}
      style={{
        backgroundImage:
          'radial-gradient(120% 120% at 20% 0%, #14141a 0%, #0c0c10 55%, #08080a 100%)',
      }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio={FIT[variant]}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <Composition variant={variant} uid={uid} />
      </svg>

      {/* Edge definition + vignette keep the block from floating */}
      <div
        className="pointer-events-none absolute inset-0 border border-[var(--line)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(90% 70% at 50% 45%, transparent 45%, rgb(0 0 0 / 0.5) 100%)',
        }}
      />

      {caption ? (
        <span className="label pointer-events-none absolute bottom-4 left-4 !text-[0.5625rem] text-[var(--faint)]">
          {caption}
        </span>
      ) : null}
    </div>
  )
}

const ACCENT = '#FFA9FF'
const HAIR = 'rgba(242,240,238,0.16)'
const HAIR_SOFT = 'rgba(242,240,238,0.07)'

function Composition({ variant, uid }: { variant: VisualVariant; uid: string }) {
  switch (variant) {
    /* Concentric arcs escaping the frame. */
    case 'arc':
      return (
        <>
          <defs>
            <radialGradient id={`${uid}-glow`} cx="78%" cy="18%" r="60%">
              <stop offset="0%" stopColor={ACCENT} stopOpacity="0.16" />
              <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" fill={`url(#${uid}-glow)`} />
          {[18, 30, 42, 54, 66, 78].map((r, i) => (
            <circle
              key={r}
              cx="76"
              cy="22"
              r={r}
              fill="none"
              stroke={i === 2 ? ACCENT : HAIR}
              strokeOpacity={i === 2 ? 0.55 : 1}
              strokeWidth={i === 2 ? 0.4 : 0.22}
            />
          ))}
          <line x1="0" y1="72" x2="100" y2="72" stroke={HAIR_SOFT} strokeWidth="0.22" />
        </>
      )

    /* Diagonal hairline field, faded by a soft mask. */
    case 'field':
      return (
        <>
          <defs>
            <linearGradient id={`${uid}-fade`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#fff" stopOpacity="0.05" />
            </linearGradient>
            <mask id={`${uid}-mask`}>
              <rect width="100" height="100" fill={`url(#${uid}-fade)`} />
            </mask>
          </defs>
          <g mask={`url(#${uid}-mask)`}>
            {Array.from({ length: 30 }, (_, i) => (
              <line
                key={i}
                x1={-40 + i * 6}
                y1="-10"
                x2={20 + i * 6}
                y2="110"
                stroke={HAIR}
                strokeWidth="0.24"
              />
            ))}
          </g>
          <line x1="8" y1="-10" x2="68" y2="110" stroke={ACCENT} strokeWidth="0.5" strokeOpacity="0.7" />
          <rect x="62" y="60" width="26" height="26" fill="none" stroke={HAIR} strokeWidth="0.24" />
        </>
      )

    /* Soft-lit sphere on a horizon. */
    case 'sphere':
      return (
        <>
          <defs>
            <radialGradient id={`${uid}-body`} cx="36%" cy="28%" r="72%">
              <stop offset="0%" stopColor="#585866" />
              <stop offset="45%" stopColor="#22222b" />
              <stop offset="100%" stopColor="#0a0a0d" />
            </radialGradient>
            <radialGradient id={`${uid}-halo`} cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor={ACCENT} stopOpacity="0" />
              <stop offset="88%" stopColor={ACCENT} stopOpacity="0.22" />
              <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="46" fill={`url(#${uid}-halo)`} />
          <circle cx="50" cy="50" r="28" fill={`url(#${uid}-body)`} />
          <circle
            cx="50"
            cy="50"
            r="28"
            fill="none"
            stroke={ACCENT}
            strokeOpacity="0.28"
            strokeWidth="0.3"
          />
          {/* Extended past the viewBox so the crosshair bleeds to the frame */}
          <line x1="-300" y1="50" x2="400" y2="50" stroke={HAIR_SOFT} strokeWidth="0.22" />
          <line x1="50" y1="-300" x2="50" y2="400" stroke={HAIR_SOFT} strokeWidth="0.22" />
        </>
      )

    /* Editorial bar rhythm. */
    case 'bars': {
      const widths = [2, 5, 1, 8, 3, 1, 6, 2, 4, 1, 7, 2]
      let cursor = 6
      return (
        <>
          {widths.map((w, i) => {
            const el = (
              <rect
                key={i}
                x={cursor}
                y={i % 3 === 0 ? 14 : 26}
                width={w}
                height={i % 3 === 0 ? 72 : 52}
                fill={i === 6 ? ACCENT : 'rgba(242,240,238,0.1)'}
                fillOpacity={i === 6 ? 0.8 : 1}
              />
            )
            cursor += w + 2.6
            return el
          })}
          <line x1="-300" y1="86" x2="400" y2="86" stroke={HAIR} strokeWidth="0.24" />
        </>
      )
    }

    /* Nested rotated squares. */
    case 'nest':
      return (
        <>
          {[68, 54, 40, 26, 12].map((s, i) => (
            <rect
              key={s}
              x={50 - s / 2}
              y={50 - s / 2}
              width={s}
              height={s}
              fill="none"
              stroke={i === 4 ? ACCENT : HAIR}
              strokeOpacity={i === 4 ? 0.85 : 1}
              strokeWidth={i === 4 ? 0.5 : 0.24}
              transform={`rotate(${i * 9} 50 50)`}
            />
          ))}
        </>
      )

    /* Outlined monogram, cropped by the frame. Stands in for the portrait. */
    case 'monogram':
      return (
        <>
          <defs>
            <radialGradient id={`${uid}-mono-glow`} cx="50%" cy="80%" r="60%">
              <stop offset="0%" stopColor={ACCENT} stopOpacity="0.14" />
              <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" fill={`url(#${uid}-mono-glow)`} />
          <text
            x="50"
            y="74"
            textAnchor="middle"
            fill="none"
            stroke="rgba(242,240,238,0.3)"
            strokeWidth="0.4"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '92px',
              fontWeight: 600,
              letterSpacing: '-0.04em',
            }}
          >
            E
          </text>
          <line x1="14" y1="82" x2="86" y2="82" stroke={ACCENT} strokeWidth="0.5" strokeOpacity="0.7" />
          <line x1="-300" y1="18" x2="400" y2="18" stroke={HAIR} strokeWidth="0.24" />
        </>
      )

    /* Masked dot grid with a single marker. */
    case 'grid':
    default:
      return (
        <>
          <defs>
            <radialGradient id={`${uid}-dotmask`} cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0.04" />
            </radialGradient>
            <mask id={`${uid}-dm`}>
              <rect width="100" height="100" fill={`url(#${uid}-dotmask)`} />
            </mask>
          </defs>
          <g mask={`url(#${uid}-dm)`}>
            {Array.from({ length: 13 }, (_, row) =>
              Array.from({ length: 13 }, (_, col) => (
                <circle
                  key={`${row}-${col}`}
                  cx={4 + col * 7.7}
                  cy={4 + row * 7.7}
                  r="0.55"
                  fill="rgba(242,240,238,0.34)"
                />
              )),
            )}
          </g>
          <rect x="57" y="34" width="16" height="16" fill={ACCENT} fillOpacity="0.85" />
          <rect x="27" y="52" width="16" height="16" fill="none" stroke={HAIR} strokeWidth="0.3" />
        </>
      )
  }
}
