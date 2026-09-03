/**
 * Static film grain + vignette.
 * Rendered once, never animated — costs nothing at runtime but gives the
 * flat black surface a photographic depth.
 */
export function Grain() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-[0.045] mix-blend-overlay"
        style={{ zIndex: 'var(--z-grain)' }}
      >
        <svg className="h-full w-full">
          <filter id="grain-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.82"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-filter)" />
        </svg>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: 'var(--z-grain)',
          background:
            'radial-gradient(120% 90% at 50% 0%, transparent 40%, rgb(0 0 0 / 0.45) 100%)',
        }}
      />
    </>
  )
}
