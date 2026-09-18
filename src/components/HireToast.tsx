import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import pdpAvatar from '../../pdpbottoms.png'

export function HireToast() {
  const [dismissed, setDismissed] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('accueil')
    if (!hero) return

    const update = () => {
      const { bottom } = hero.getBoundingClientRect()
      setVisible(bottom < window.innerHeight * 0.88)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const handleHire = () => {
    setDismissed(true)
    window.location.assign('/#contact')
  }

  if (dismissed) return null

  return createPortal(
    <div
      className={`HireToast-fixed${visible ? ' is-visible' : ''}`}
      aria-hidden={!visible}
    >
    <div
      className="Toast-root-M1q HireOverlay-toastRoot-M4P Project-projectOverlay-OM0"
      role="alert"
    >
      <div className="HireOverlay-content-Lnb">
        <div className="Avatar-pie-vQ0 Avatar-root-cxI">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.behance.net/melamicosa"
            className="Avatar-avatar-G8t"
          >
            <img
              className="AvatarImage-avatarImage-PUL"
              src={pdpAvatar}
              alt="Profil appartenant à Karla"
              loading="lazy"
              draggable={false}
            />
          </a>
        </div>

        <div className="HireOverlay-infoContainer-FEQ">
          <p className="HireOverlay-displayName-Lde">
            Karla est disponible pour un recrutement
          </p>
        </div>

        <div className="HireOverlay-hireContainer-c9C">
          <button
            className="MessageButton-interactionButton-O6g HireOverlay-hireButton-cbb"
            data-id="hire"
            type="button"
            onClick={handleHire}
          >
            <span className="MessageButton-messageText-Hnz">Engager Karla</span>
          </button>
        </div>

        <button
          className="Toast-close-qft"
          aria-label="Fermer le bouton pour le composant toast"
          type="button"
          onClick={() => setDismissed(true)}
        >
          <svg
            className="Toast-closeIcon-U19"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 8.09 8.08"
          >
            <path d="M5.18 4.05L7.84 6.7a.75.75 0 0 1 .2.27.88.88 0 0 1 0 .31.83.83 0 0 1-.06.3.63.63 0 0 1-.18.27.42.42 0 0 1-.12.11l-.15.08h-.15a.72.72 0 0 1-.3 0h-.15l-.15-.08a.41.41 0 0 1-.12-.11L4.04 5.18 1.37 7.84a.42.42 0 0 1-.12.11l-.15.08H.95a.72.72 0 0 1-.3 0H.5l-.15-.08a.41.41 0 0 1-.12-.11.63.63 0 0 1-.19-.26.83.83 0 0 1 0-.3.88.88 0 0 1 0-.31.75.75 0 0 1 .18-.27L2.9 4.05.24 1.38a.63.63 0 0 1-.2-.27.83.83 0 0 1 0-.3.88.88 0 0 1 0-.29.75.75 0 0 1 .18-.27.73.73 0 0 1 .27-.18.84.84 0 0 1 .61 0 .73.73 0 0 1 .27.18l2.67 2.66L6.71.24a.73.73 0 0 1 .27-.18.84.84 0 0 1 .61 0 .73.73 0 0 1 .27.18.75.75 0 0 1 .18.28.88.88 0 0 1 0 .29.83.83 0 0 1-.06.3.63.63 0 0 1-.18.27L5.18 4.05z" />
          </svg>
        </button>
      </div>
    </div>
    </div>,
    document.body,
  )
}
