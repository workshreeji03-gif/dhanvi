export interface ExperimentAgent {
  name: string
  role: string
  description: string
}

export interface ExperimentTimelineStep {
  time: string
  title: string
  description: string
}

export interface Experiment {
  id: string
  slug: string
  formattedId: string
  title: string
  subtitle: string
  status: 'Completed' | 'Upcoming'
  type: string
  agentsCount?: number
  agents?: ExperimentAgent[]
  startingCapital?: string
  startTime?: string
  endTime?: string
  opportunitiesEvaluated?: number
  tradesSelected?: number
  selectionRate?: string
  sessionResult?: string
  resultNote?: string
  timeline?: ExperimentTimelineStep[]
  whatWeTested?: {
    title: string
    question: string
  }[]
  whatItDoesNotEstablish?: string[]
  summaryPoints?: string[]
  disclosure?: string
}
