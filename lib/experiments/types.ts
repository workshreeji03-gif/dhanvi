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
  // Backtest / quantitative experiment specific fields
  backtestId?: string
  strategyId?: string
  strategyName?: string
  instrument?: string
  timeframe?: string
  bars?: number
  executionModel?: string
  initialCapital?: string
  trades?: number
  winningTrades?: number
  losingTrades?: number
  breakevenTrades?: number
  winRate?: string
  netPnl?: string
  returnPct?: string
  maximumDrawdown?: string
  maximumDrawdownAmount?: string
  profitFactor?: string
  commission?: string
  slippage?: string
  totalExecutionCosts?: string
  finalEquity?: string
  timestamp?: string
  methodology?: string
  limitations?: string[]
}

