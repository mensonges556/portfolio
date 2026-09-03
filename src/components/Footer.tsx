import { footer, site } from '../data/site'
import { scrollToTop } from '../lib/scroll'
import { Reveal } from './Reveal'

export function Footer() {
  return (
    <footer className="shell pt-14 pb-8 lg:pb-10">
      <div className="grid-12 gap-y-10 border-t border-[var(--line)] pt-8">
        <Reveal className="col-span-12 flex flex-col gap-2 lg:col-span-4">
          <span className="text-[1.05rem] font-semibold tracking-[-0.03em] uppercase">
            {site.name}
          </span>
          <span className="label !tracking-[0.14em] text-[var(--faint)]">
            {site.discipline}
          </span>
        </Reveal>

        <div className="col-span-6 flex flex-col gap-3 lg:col-span-3">
          <Reveal>
            <span className="label !text-[0.5625rem] text-[var(--faint)]">{footer.contact}</span>
          </Reveal>
          <Reveal order={1}>
            <SwapLink href={`mailto:${site.email}`} label={site.email} />
          </Reveal>
          <Reveal order={2}>
            <span className="text-[0.9375rem] text-[var(--muted)]">{site.phone}</span>
          </Reveal>
        </div>

        <div className="col-span-6 flex flex-col gap-3 lg:col-span-3">
          <Reveal>
            <span className="label !text-[0.5625rem] text-[var(--faint)]">{footer.socials}</span>
          </Reveal>
          <ul className="flex flex-col gap-3">
            {site.socials.map((social, index) => (
              <li key={social.label}>
                <Reveal order={index + 1}>
                  <SwapLink href={social.href} label={social.label} meta={social.handle} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-12 flex flex-col gap-3 lg:col-span-2">
          <Reveal>
            <span className="label !text-[0.5625rem] text-[var(--faint)]">{footer.location}</span>
          </Reveal>
          <Reveal order={1}>
            <div className="text-[0.9375rem] text-[var(--muted)]">
              <span className="block">{site.location.city}</span>
              <span className="block">{site.location.mode}</span>
              <span className="label mt-2 block !text-[0.5625rem] text-[var(--faint)]">
                {site.location.coordinates}
              </span>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-4 border-t border-[var(--line)] pt-5 sm:flex-row sm:items-center sm:justify-between">
        <span className="label !text-[0.5625rem] text-[var(--faint)]">
          {footer.rights(site.year, site.name)}
        </span>

        {footer.placeholderNote ? (
          <span className="label !text-[0.5625rem] text-[var(--faint)]">
            {footer.placeholderNote}
          </span>
        ) : null}

        <button
          type="button"
          onClick={scrollToTop}
          data-cursor="hover"
          className="label group flex items-center gap-2 self-start sm:self-auto"
        >
          {footer.backToTop}
          <span
            aria-hidden="true"
            className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1"
          >
            <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
              <path d="M6 11V1M6 1 1.5 5.5M6 1l4.5 4.5" stroke="currentColor" strokeWidth="1" />
            </svg>
          </span>
        </button>
      </div>
    </footer>
  )
}

function SwapLink({
  href,
  label,
  meta,
}: {
  href: string
  label: string
  meta?: string
}) {
  return (
    <a href={href} className="group inline-flex items-baseline gap-2 text-[0.9375rem]">
      <span className="swap">
        <span className="swap__inner">{label}</span>
        <span className="swap__ghost" aria-hidden="true">
          {label}
        </span>
      </span>
      {meta ? (
        <span className="label !text-[0.5625rem] text-[var(--faint)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {meta}
        </span>
      ) : null}
    </a>
  )
}
