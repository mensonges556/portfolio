/* ------------------------------------------------------------------
   CONTENU DU SITE — 100 % PROVISOIRE.
   Règle éditoriale : peu de mots, beaucoup d'espace. Chaque bloc doit
   se lire en un coup d'œil — jamais comme un paragraphe explicatif.
   ------------------------------------------------------------------ */

export const site = {
  name: 'Emma',
  role: 'Créative digitale',
  discipline: 'Direction artistique · Design digital · Développement créatif',
  volume: 'Portfolio — Vol. 01',
  year: '2026',

  email: 'hello@emma.studio',
  phone: '+33 0 00 00 00 00',

  location: {
    city: 'Paris',
    mode: 'À distance',
    coordinates: '48.8566° N / 2.3522° E',
    timeZone: 'Europe/Paris',
    timeLabel: 'CET',
  },

  availability: 'Disponible — projets sélectionnés',
  availabilityShort: 'Disponible',

  nav: [
    { label: 'Projets', id: 'work', index: '01' },
    { label: 'À propos', id: 'about', index: '02' },
    { label: 'Expertise', id: 'expertise', index: '03' },
    { label: 'Contact', id: 'contact', index: '04' },
  ],

  socials: [
    { label: 'Instagram', handle: '@placeholder', href: '#' },
    { label: 'LinkedIn', handle: '/placeholder', href: '#' },
    { label: 'Behance', handle: '/placeholder', href: '#' },
    { label: 'Dribbble', handle: '/placeholder', href: '#' },
  ],
} as const

export const sectionIndex = [
  { id: 'hero', label: 'Intro' },
  { id: 'manifesto', label: 'Manifeste' },
  { id: 'work', label: 'Projets' },
  { id: 'about', label: 'À propos' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'contact', label: 'Contact' },
] as const

export const hudNotes = [
  'Dark mode',
  "La grille d'abord",
  'Moins, mieux',
  'Le détail compte',
  'Ouverte aux projets',
] as const

export const ui = {
  skipLink: 'Aller au contenu',
  navPrimary: 'Navigation principale',
  backToTop: 'Retour en haut',
  backToTopAria: (name: string) => `${name} — retour en haut`,
  goToSection: (label: string) => `Aller à ${label}`,
  menuOpen: 'Menu',
  menuClose: 'Fermer',
  scrolled: 'Parcouru',
  scrollHint: 'Défiler',
  cursor: {
    view: 'Voir',
    open: 'Ouvrir',
    drag: 'Glisser',
  },
} as const

export const hero = {
  tagline: 'Identités, interfaces, interactions — pensées pour',
  taglineAccent: 'durer',
  disciplines: ['Direction artistique', 'Design digital', 'Développement créatif'],
} as const

export type ManifestoWord = { text: string; accent?: boolean }

export const manifesto = {
  sectionTitle: 'Manifeste',
  sectionAside: '',
  approachLabel: 'Approche',
  /** Deux lignes, deux respirations — pas une phrase découpée mot à mot. */
  lines: [
    [{ text: 'Des expériences' }],
    [{ text: "qu'on" }, { text: 'retient.', accent: true }],
  ] satisfies ManifestoWord[][],
  principles: [
    {
      number: '01',
      title: "La structure d'abord",
      body: 'Grille, hiérarchie, silence.',
    },
    {
      number: '02',
      title: 'Le mouvement utile',
      body: 'Guider le regard. Pas le distraire.',
    },
    {
      number: '03',
      title: 'Les détails qui restent',
      body: 'Ce qui compte se voit au second passage.',
    },
  ],
} as const

export const work = {
  sectionTitle: 'Sélection',
  sectionAside: '2024 — 2026',
  featuredLabel: 'Focus',
  indexLabel: 'Index',
  indexCount: (n: number) => `${String(n).padStart(2, '0')} projets`,
  archiveLabel: 'Archives',
  archiveHint: 'Glisser',
  visualCaption: (fig: string) => `Fig. ${fig}`,
} as const

export const about = {
  sectionTitle: 'À propos',
  note: '',
  /** Court, percutant — une idée par ligne visuelle. */
  headline: ["Peu d'éléments.", 'Beaucoup de'],
  headlineAccent: 'précision',
  headlineEnd: '.',
  /** Une seule respiration textuelle — pas de biographie en trois actes. */
  bio: 'Direction, design et code — même main, même ligne. Paris. Quelques projets par an.',
  portraitCaption: 'Portrait',
  meta: [
    { label: 'Basée à', lines: ['Paris', 'À distance'] },
    {
      label: 'Domaines',
      lines: ['Direction artistique', 'Design digital', 'Développement créatif'],
    },
    { label: 'Actuellement', lines: ['Disponible', '2026'] },
    {
      label: 'Outils',
      lines: ['Figma · Blender', 'React · GSAP', 'After Effects'],
    },
  ],
} as const

export const services = [
  {
    number: '01',
    title: 'Direction artistique',
    keyword: 'direction',
    description: 'Tonalité, références, cadre visuel.',
    deliverables: ['Concept', 'Langage visuel', 'Charte'],
  },
  {
    number: '02',
    title: 'Design digital',
    keyword: 'clarté',
    description: 'Interfaces nettes, pensées pour le réel.',
    deliverables: ['Systèmes UI', 'Mise en page', 'Design system'],
  },
  {
    number: '03',
    title: 'Développement créatif',
    keyword: 'savoir-faire',
    description: 'Le code comme matière de design.',
    deliverables: ['React', 'WebGL / Canvas', 'Motion'],
  },
  {
    number: '04',
    title: 'Expérience de marque',
    keyword: 'présence',
    description: 'Une voix, toutes surfaces confondues.',
    deliverables: ['Identité', 'Déploiement digital', 'Outils'],
  },
  {
    number: '05',
    title: 'Design interactif',
    keyword: 'réponse',
    description: 'Timing, poids, retour — le vivant.',
    deliverables: ['Prototypes', 'Langage motion', 'Micro-interactions'],
  },
] as const

export const contact = {
  sectionLabel: 'Contact',
  lines: ['Créons', 'quelque chose', "d'inoubliable."] as const,
  accentLineIndex: 2,
  cta: 'Écrire',
  emailNote: '',
  marqueeRemote: 'à distance',
} as const

export const footer = {
  contact: 'Contact',
  socials: 'Réseaux',
  location: 'Basée à',
  rights: (year: string, name: string) => `© ${year} ${name}`,
  placeholderNote: '',
  backToTop: 'Haut de page',
} as const

export const expertise = {
  sectionTitle: 'Expertise',
  sectionAside: '01 — 05',
} as const
