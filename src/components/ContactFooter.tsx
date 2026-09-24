import { useState } from 'react'
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { motion } from 'motion/react'
import navLogoKarla from '../../LOGO KARLA.svg'
import { CONTACT } from '../config/contact'
import { NAV_SOCIALS } from '../config/nav'
import Grainient from './Grainient'

export function ContactFooter() {
  const [copied, setCopied] = useState(false)
  const mailHref = `mailto:${CONTACT.email}?subject=${encodeURIComponent('Projet avec Karla')}`

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = mailHref
    }
  }

  return (
    <footer className="site-footer" id="contact">
      <div className="site-footer__panel" aria-hidden="true">
        <Grainient
          color1="#830012"
          color2="#5c000d"
          color3="#2a0810"
          timeSpeed={0.2}
          colorBalance={0.15}
          warpStrength={0.85}
          warpFrequency={4.5}
          warpSpeed={1.6}
          warpAmplitude={42.0}
          blendAngle={-12.0}
          blendSoftness={0.12}
          rotationAmount={380.0}
          noiseScale={2.0}
          grainAmount={0.055}
          grainScale={2.0}
          grainAnimated={false}
          contrast={1.45}
          gamma={1.0}
          saturation={1.0}
          centerX={0.0}
          centerY={0.15}
          zoom={0.92}
        />
      </div>
      <div className="site-footer__glow" aria-hidden="true" />
      <div className="site-footer__container">
      <div className="site-footer__inner">
        <motion.div
          className="site-footer__lead"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="site-footer__kicker">Contact</p>
          <h2 className="site-footer__title">Parlons de votre prochain projet</h2>
          <p className="site-footer__text">{CONTACT.availability}</p>
        </motion.div>

        <motion.div
          className="site-footer__card"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="site-footer__card-head">
            <span className="site-footer__card-icon" aria-hidden="true">
              <Mail strokeWidth={1.6} />
            </span>
            <div>
              <p className="site-footer__card-label">Écrivez-moi</p>
              <a className="site-footer__email" href={mailHref}>
                {CONTACT.email}
              </a>
            </div>
          </div>

          <div className="site-footer__actions">
            <a className="site-footer__btn site-footer__btn--primary" href={mailHref}>
              Envoyer un email
              <ArrowUpRight strokeWidth={2} aria-hidden="true" />
            </a>
            <button
              type="button"
              className="site-footer__btn site-footer__btn--ghost"
              onClick={() => void copyEmail()}
            >
              {copied ? (
                <>
                  <Check strokeWidth={2} aria-hidden="true" />
                  Copié
                </>
              ) : (
                <>
                  <Copy strokeWidth={2} aria-hidden="true" />
                  Copier l&apos;email
                </>
              )}
            </button>
          </div>

          <ul className="site-footer__socials">
            {NAV_SOCIALS.map(({ label, link }) => (
              <li key={link}>
                <a href={link} target="_blank" rel="noreferrer">
                  {label}
                  <ArrowUpRight strokeWidth={2} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className="site-footer__bar">
        <a href="#accueil" className="site-footer__logo" aria-label="Karla, accueil">
          <img src={navLogoKarla} alt="" draggable={false} width={110} height={34} />
        </a>
        <p className="site-footer__copy">
          © {new Date().getFullYear()} {CONTACT.displayName}. Tous droits réservés.
        </p>
      </div>
      </div>
    </footer>
  )
}
