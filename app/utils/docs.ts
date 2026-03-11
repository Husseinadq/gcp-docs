export type DocType = 'tutorial' | 'how-to' | 'explanation' | 'reference'

type DocTypeMeta = {
  label: string
  kicker: string
  description: string
  icon: string
  badgeClass: string
  iconClass: string
  panelClass: string
}

const fallbackMeta: DocTypeMeta = {
  label: 'Guide',
  kicker: 'Use the right kind of page',
  description: 'The goal is to reduce guessing by matching the page format to the job you are trying to do.',
  icon: 'lucide:compass',
  badgeClass: 'bg-slate-100 text-slate-800',
  iconClass: 'bg-slate-100 text-slate-700',
  panelClass: 'border-slate-200 bg-white'
}

export const docTypeMeta: Record<DocType, DocTypeMeta> = {
  tutorial: {
    label: 'Tutorial',
    kicker: 'Learn by building',
    description: 'Use this when you are new and want a guided path with checkpoints, context, and a concrete outcome.',
    icon: 'lucide:graduation-cap',
    badgeClass: 'bg-atlas-100 text-atlas-900',
    iconClass: 'bg-atlas-100 text-atlas-800',
    panelClass: 'border-atlas-200/80 bg-atlas-50/70'
  },
  'how-to': {
    label: 'How-To',
    kicker: 'Solve one task fast',
    description: 'Use this when you already know the goal and want exact steps with as little theory as possible.',
    icon: 'lucide:wrench',
    badgeClass: 'bg-signal-100 text-signal-900',
    iconClass: 'bg-signal-100 text-signal-800',
    panelClass: 'border-signal-200/80 bg-signal-50/70'
  },
  explanation: {
    label: 'Explanation',
    kicker: 'Build a mental model',
    description: 'Use this when GCP feels mysterious and you need concepts, tradeoffs, and vocabulary to click.',
    icon: 'lucide:lightbulb',
    badgeClass: 'bg-sky-100 text-sky-900',
    iconClass: 'bg-sky-100 text-sky-800',
    panelClass: 'border-sky-200/80 bg-sky-50/70'
  },
  reference: {
    label: 'Reference',
    kicker: 'Look up facts fast',
    description: 'Use this when you already understand the topic and need concise properties, comparisons, or defaults.',
    icon: 'lucide:table-properties',
    badgeClass: 'bg-violet-100 text-violet-900',
    iconClass: 'bg-violet-100 text-violet-800',
    panelClass: 'border-violet-200/80 bg-violet-50/70'
  }
}

export function getDocTypeMeta(type?: string | null) {
  if (!type) {
    return fallbackMeta
  }

  return docTypeMeta[type as DocType] ?? fallbackMeta
}

export const docsModes = [
  {
    docType: 'tutorial' as const,
    path: '/docs/learn',
    title: 'Learn by Building',
    summary: 'Start here when you need a guided path that teaches the platform while you ship something real.'
  },
  {
    docType: 'how-to' as const,
    path: '/docs/how-to',
    title: 'Solve a Specific Task',
    summary: 'Use short, direct guides when you already know the outcome you want.'
  },
  {
    docType: 'explanation' as const,
    path: '/docs/explain',
    title: 'Understand the Platform',
    summary: 'Read these pages when GCP terms or product boundaries still feel vague.'
  },
  {
    docType: 'reference' as const,
    path: '/docs/reference',
    title: 'Look Up Facts Fast',
    summary: 'Use concise reference pages when you need comparisons, defaults, or service snapshots.'
  }
]

export const webAppPath = [
  {
    title: 'How GCP is organized',
    description: 'Get the platform model first so the rest of the docs stops feeling random.',
    path: '/docs/explain/how-gcp-is-organized'
  },
  {
    title: 'Ship your first web app on GCP',
    description: 'Follow one guided tutorial instead of reading five disconnected product pages.',
    path: '/docs/learn/ship-your-first-web-app-on-gcp'
  },
  {
    title: 'Deploy to Cloud Run',
    description: 'Use the task guide when you are ready to do the deployment for real.',
    path: '/docs/how-to/deploy-to-cloud-run'
  },
  {
    title: 'Cloud Run reference',
    description: 'Look up the service tradeoffs, when to use it, and when to avoid it.',
    path: '/docs/reference/cloud-run'
  }
]

export const commonTaskPaths = [
  '/docs/how-to/deploy-to-cloud-run',
  '/docs/how-to/store-user-uploads-in-cloud-storage',
  '/docs/explain/iam-in-plain-english'
]
