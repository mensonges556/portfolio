import { type ReactNode } from 'react'
import { Brush, PenTool, Sparkles, Video } from 'lucide-react'
import { motion } from 'motion/react'

const RINGS = [
  { id: 'art', value: 92, Icon: PenTool },
  { id: 'paint', value: 80, Icon: Brush },
  { id: 'ai', value: 80, Icon: Sparkles },
  { id: 'film', value: 50, Icon: Video },
]

const TAGS = [
  'UX / UI',
  'Motion',
  'Logo',
  'Identité',
  'Direction artistique',
  'Édition',
]

const EXPERTISE = [
  'Direction artistique',
  'Identité visuelle',
  'Campagnes sociales',
  'Motion et vidéo',
  'Design print',
  'Design web',
  'UX / UI',
  'Direction photo',
]

const ROLES = [
  {
    company: 'Studio exemple',
    role: 'Directrice artistique',
    dates: '2022 à aujourd’hui',
    text: 'Texte temporaire. À remplacer par le détail des missions, des livrables et de l’équipe encadrée.',
  },
  {
    company: 'Agence exemple',
    role: 'Graphiste senior',
    dates: '2019 à 2022',
    text: 'Texte temporaire. À remplacer par les projets print, motion et identité menés sur cette période.',
  },
]

const rise = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

function Glass({
  className = '',
  index = 0,
  children,
}: {
  className?: string
  index?: number
  children: ReactNode
}) {
  return (
    <motion.div
      className={`cv-glass ${className}`}
      custom={index}
      variants={rise}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      {children}
    </motion.div>
  )
}

function Ring({
  value,
  Icon,
  index,
}: {
  value: number
  Icon: typeof PenTool
  index: number
}) {
  const size = 108
  const radius = 42
  const circ = 2 * Math.PI * radius
  const offset = circ - (value / 100) * circ

  return (
    <div className="cv-ring">
      <div className="cv-ring-wrap">
        <svg
          className="cv-ring-gauge"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="cv-ring-track"
          />
          <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              className="cv-ring-value"
              strokeDasharray={circ}
              initial={{ strokeDashoffset: circ }}
              whileInView={{ strokeDashoffset: offset }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 1.35,
                delay: 0.2 + index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </g>
        </svg>
        <Icon strokeWidth={1.6} className="cv-ring-icon" />
      </div>
      <motion.span
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.45 + index * 0.1 }}
      >
        {value}%
      </motion.span>
    </div>
  )
}

export function Curriculum() {
  return (
    <section className="cv" id="cv">
      <div className="cv-stage">
        <Glass className="cv-rings" index={0}>
          <p className="cv-kicker">Compétences</p>
          <div className="cv-rings-grid">
            {RINGS.map((ring, i) => (
              <Ring key={ring.id} value={ring.value} Icon={ring.Icon} index={i} />
            ))}
          </div>
        </Glass>

        <Glass className="cv-bio" index={1}>
          <p className="cv-kicker">À propos</p>
          <h2>Designer, penseuse, créatrice</h2>
          <p>
            Texte temporaire. À remplacer par une courte présentation de
            Karla, son approche et ce qu’elle aime construire.
          </p>
        </Glass>

        <Glass className="cv-expertise" index={2}>
          <p className="cv-kicker">Expertises</p>
          <ul>
            {EXPERTISE.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Glass>

        <Glass className="cv-tags" index={3}>
          <p className="cv-kicker">Focus</p>
          <ul>
            {TAGS.map((tag, i) => (
              <motion.li
                key={tag}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.06 }}
              >
                <span />
                {tag}
              </motion.li>
            ))}
          </ul>
        </Glass>

        {ROLES.map((job, i) => (
          <Glass key={job.company} className="cv-role" index={5 + i}>
            <header>
              <span className="cv-role-mark">K</span>
              <div className="cv-role-head">
                <h3>{job.company}</h3>
                <time>{job.dates}</time>
              </div>
            </header>
            <p className="cv-role-title">{job.role}</p>
            <p className="cv-role-text">{job.text}</p>
          </Glass>
        ))}
      </div>
    </section>
  )
}
