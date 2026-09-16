const ACCENT = '#830012'

export function GridBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundSize: '40px 40px',
          backgroundImage: `
            linear-gradient(to right, ${ACCENT} 1px, transparent 1px),
            linear-gradient(to bottom, ${ACCENT} 1px, transparent 1px)
          `,
          opacity: 0.2,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #ffc9ec 0%, #f5efef 100%)',
          maskImage:
            'radial-gradient(ellipse at center, transparent 18%, black 72%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, transparent 18%, black 72%)',
        }}
      />
    </div>
  )
}
