import { type ReactNode } from 'react'
import { Brush, PenTool, Sparkles, Video } from 'lucide-react'
import { motion } from 'motion/react'
import simsPortrait from '../../sims.png'
import Grainient from './Grainient'

const RINGS = [
  { id: 'art', value: 92, Icon: PenTool, label: 'Graphisme' },
  { id: 'paint', value: 80, Icon: Brush, label: 'Illustration' },
  { id: 'ai', value: 80, Icon: Sparkles, label: 'Motion & IA' },
  { id: 'film', value: 50, Icon: Video, label: 'Vidéo' },
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
  label,
  Icon,
  index,
}: {
  value: number
  label: string
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
      <motion.p
        className="cv-ring-label"
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.38 + index * 0.1 }}
      >
        {label}
      </motion.p>
      <motion.span
        className="cv-ring-pct"
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
      <div className="cv-panel" aria-hidden="true">
        <Grainient
          color1="#830012"
          color2="#830012"
          color3="#830012"
          timeSpeed={0.25}
          colorBalance={0.0}
          warpStrength={1.0}
          warpFrequency={5.0}
          warpSpeed={2.0}
          warpAmplitude={50.0}
          blendAngle={0.0}
          blendSoftness={0.05}
          rotationAmount={500.0}
          noiseScale={2.0}
          grainAmount={0.1}
          grainScale={2.0}
          grainAnimated={false}
          contrast={1.5}
          gamma={1.0}
          saturation={1.0}
          centerX={0.0}
          centerY={0.0}
          zoom={0.9}
        />
      </div>
      <div className="cv-layout">
        <motion.div
          className="cv-sims"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="cv-sims-float">
            <img src={simsPortrait} alt="" className="cv-sims-img" draggable={false} />
          </div>
        </motion.div>

        <div className="cv-stage">
          <div className="cv-stage-col cv-stage-col--primary">
            <Glass className="cv-bio" index={0}>
              <p className="cv-kicker">À propos</p>
              <h2>Designer, penseuse, créatrice</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum. Curabitur pretium
              tincidunt lacus.
            </p>
            </Glass>

            <Glass className="cv-rings" index={2}>
              <p className="cv-kicker">Compétences</p>
              <div className="cv-rings-grid">
                {RINGS.map((ring, i) => (
                  <Ring
                    key={ring.id}
                    value={ring.value}
                    label={ring.label}
                    Icon={ring.Icon}
                    index={i}
                  />
                ))}
              </div>
            </Glass>
          </div>

          <div className="cv-stage-col cv-stage-col--secondary">
            <Glass className="cv-tags" index={1}>
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

            <Glass className="cv-expertise" index={3}>
              <p className="cv-kicker">Expertises</p>
              <ul>
                {EXPERTISE.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Glass>
          </div>
        </div>
      </div>
    </section>
  )
}
