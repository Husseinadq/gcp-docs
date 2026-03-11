export type DocType = 'tutorial' | 'how-to' | 'explanation' | 'reference' | 'service-hub'

export type ServiceNavItem = {
  title: string
  shortTitle?: string
  path: string
  description: string
  icon: string
  category: string
}

export type ServiceGroup = {
  title: string
  description: string
  items: ServiceNavItem[]
}

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
  'service-hub': {
    label: 'Service Hub',
    kicker: 'Product overview',
    description: 'Use this page to decide whether the service fits the workload and where to start inside its docs.',
    icon: 'lucide:blocks',
    badgeClass: 'bg-slate-950 text-white',
    iconClass: 'bg-slate-950 text-white',
    panelClass: 'border-slate-300 bg-slate-50/85'
  },
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
    icon: 'lucide:book-open',
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

export const featuredServices: ServiceNavItem[] = [
  {
    title: 'Cloud Run',
    path: '/docs/cloud-run',
    description: 'Managed containers for web apps, APIs, and event handlers.',
    icon: 'lucide:rocket',
    category: 'Compute'
  },
  {
    title: 'GKE',
    path: '/docs/gke',
    description: 'Kubernetes on GCP for teams that need cluster-level control.',
    icon: 'lucide:boxes',
    category: 'Compute'
  },
  {
    title: 'Cloud Storage',
    shortTitle: 'Storage',
    path: '/docs/cloud-storage',
    description: 'Durable object storage for uploads, assets, and generated files.',
    icon: 'lucide:hard-drive',
    category: 'Storage'
  },
  {
    title: 'Cloud SQL',
    shortTitle: 'SQL',
    path: '/docs/cloud-sql',
    description: 'Managed relational databases for PostgreSQL, MySQL, and SQL Server.',
    icon: 'lucide:database',
    category: 'Databases'
  },
  {
    title: 'BigQuery',
    path: '/docs/bigquery',
    description: 'Analytics warehouse for large-scale querying and reporting.',
    icon: 'lucide:chart-column',
    category: 'Data and Analytics'
  },
  {
    title: 'Pub/Sub',
    path: '/docs/pub-sub',
    description: 'Messaging backbone for asynchronous and event-driven systems.',
    icon: 'lucide:waypoints',
    category: 'Messaging'
  },
  {
    title: 'Vertex AI',
    shortTitle: 'Vertex',
    path: '/docs/vertex-ai',
    description: 'Managed platform for AI models, prompts, pipelines, and serving.',
    icon: 'lucide:sparkles',
    category: 'AI and ML'
  },
  {
    title: 'IAM',
    path: '/docs/iam',
    description: 'Identity and access control across projects, workloads, and teams.',
    icon: 'lucide:key-round',
    category: 'Security and Identity'
  }
]

const extraServices: ServiceNavItem[] = [
  {
    title: 'Networking',
    path: '/docs/networking',
    description: 'VPCs, ingress, egress, service boundaries, and connectivity patterns.',
    icon: 'lucide:network',
    category: 'Networking'
  }
]

export const allServices: ServiceNavItem[] = [...featuredServices, ...extraServices]

export const serviceGroups: ServiceGroup[] = [
  {
    title: 'Compute',
    description: 'Run your workloads with the right control level.',
    items: allServices.filter((item) => item.category === 'Compute')
  },
  {
    title: 'Storage and Databases',
    description: 'Choose the right home for files, rows, and analytical data.',
    items: allServices.filter((item) => ['Storage', 'Databases', 'Data and Analytics'].includes(item.category))
  },
  {
    title: 'Messaging and AI',
    description: 'Move events cleanly and build AI-driven product features.',
    items: allServices.filter((item) => ['Messaging', 'AI and ML'].includes(item.category))
  },
  {
    title: 'Platform Foundations',
    description: 'Control identity, connectivity, and service boundaries.',
    items: allServices.filter((item) => ['Security and Identity', 'Networking'].includes(item.category))
  }
]

export const servicePathOrder = new Map(allServices.map((service, index) => [service.path, index]))

export const homepageGoalCards = [
  {
    title: 'Deploy a web app',
    description: 'Start with managed compute instead of building infrastructure from scratch.',
    path: '/docs/cloud-run',
    icon: 'lucide:globe'
  },
  {
    title: 'Store files',
    description: 'Put uploads, exports, and generated assets in object storage.',
    path: '/docs/cloud-storage',
    icon: 'lucide:folder-open'
  },
  {
    title: 'Add a database',
    description: 'Choose managed SQL when the product needs relational data.',
    path: '/docs/cloud-sql',
    icon: 'lucide:database'
  },
  {
    title: 'Build event pipelines',
    description: 'Use messaging when the system should react asynchronously.',
    path: '/docs/pub-sub',
    icon: 'lucide:workflow'
  },
  {
    title: 'Secure access',
    description: 'Understand who can do what before the project gets messy.',
    path: '/docs/iam',
    icon: 'lucide:shield-check'
  },
  {
    title: 'Build with AI',
    description: 'Use Vertex AI when product features need models, prompts, or serving.',
    path: '/docs/vertex-ai',
    icon: 'lucide:bot'
  }
]

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
