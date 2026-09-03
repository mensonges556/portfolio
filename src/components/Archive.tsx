import { useEffect, useRef, type RefObject } from 'react'
import { archive } from '../data/projects'
import { ui, work } from '../data/site'
import { Reveal } from './Reveal'
import { ProjectVisual } from './ProjectVisual'

/**
 * Horizontal rail of visual studies. Native scroll on touch, click-and-drag
 * on desktop — the cursor announces the affordance instead of an icon.
 */
export function Archive() {
  const railRef = useRef<HTMLDivElement>(null)
  useDragScroll(railRef)

  return (
    <div className="pt-[clamp(3rem,7vw,6rem)]">
      <div className="flex items-baseline justify-between gap-6 border-t border-[var(--line)] pt-5">
        <Reveal>
          <span className="label">{work.archiveLabel}</span>
        </Reveal>
        <Reveal order={1}>
          <span className="label hidden text-[var(--faint)] lg:block">
            {work.archiveHint}
          </span>
        </Reveal>
      </div>

      <div
        ref={railRef}
        data-cursor="label"
        data-cursor-label={ui.cursor.drag}
        className="no-scrollbar mt-6 flex gap-3 overflow-x-auto overscroll-x-contain pb-2 sm:gap-4"
        style={{
          // Bleed to the viewport edge so the rail reads as continuous.
          marginInline: 'calc(var(--gutter) * -1)',
          paddingInline: 'var(--gutter)',
        }}
      >
        {archive.map((item, index) => (
          <figure
            key={item.id}
            className="group shrink-0 select-none"
            style={{ width: 'clamp(220px, 44vw, 340px)' }}
          >
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: index % 2 === 0 ? '4 / 5' : '1 / 1' }}
            >
              <div className="h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
                <ProjectVisual variant={item.visual} />
              </div>
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between gap-3">
              <span className="label !tracking-[0.12em]">{item.label}</span>
              <span className="label text-[var(--faint)]">{item.year}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

/** Click-and-drag scrolling for a horizontal container. */
function useDragScroll(ref: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let dragging = false
    let startX = 0
    let startScroll = 0

    const onDown = (event: PointerEvent) => {
      dragging = true
      startX = event.clientX
      startScroll = element.scrollLeft
      element.setPointerCapture(event.pointerId)
    }

    const onMove = (event: PointerEvent) => {
      if (!dragging) return
      element.scrollLeft = startScroll - (event.clientX - startX)
    }

    const onUp = (event: PointerEvent) => {
      dragging = false
      if (element.hasPointerCapture(event.pointerId)) {
        element.releasePointerCapture(event.pointerId)
      }
    }

    element.addEventListener('pointerdown', onDown)
    element.addEventListener('pointermove', onMove)
    element.addEventListener('pointerup', onUp)
    element.addEventListener('pointercancel', onUp)

    return () => {
      element.removeEventListener('pointerdown', onDown)
      element.removeEventListener('pointermove', onMove)
      element.removeEventListener('pointerup', onUp)
      element.removeEventListener('pointercancel', onUp)
    }
  }, [ref])
}
