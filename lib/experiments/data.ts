import { Experiment } from './types'

export const EXPERIMENT_001: Experiment = {
  id: '001',
  slug: '001',
  formattedId: 'EXPERIMENT 001',
  title: 'Multi-Agent Paper Trading',
  subtitle:
    'Testing whether specialized AI agents could coordinate across research, analysis and simulated trading during a complete market session.',
  status: 'Completed',
  type: 'Paper Trading / Simulation',
  agentsCount: 5,
  agents: [
    {
      name: 'News Agent',
      role: 'Context Ingestion',
      description: 'Collected and processed relevant market/news context.',
    },
    {
      name: 'Research Agent',
      role: 'Context Synthesis',
      description: 'Converted available information into broader research context.',
    },
    {
      name: 'Market Analysis Agent',
      role: 'Opportunity Identification',
      description: 'Evaluated market conditions and potential opportunities.',
    },
    {
      name: 'Company Analysis Agent',
      role: 'Fundamental Screening',
      description: 'Performed deeper analysis of candidate companies.',
    },
    {
      name: 'Trading Agent',
      role: 'Execution Selection',
      description:
        'Used the combined intelligence to determine which opportunities progressed to simulated trades.',
    },
  ],
  startingCapital: '₹10,000',
  startTime: '08:45',
  endTime: '15:15',
  opportunitiesEvaluated: 459,
  tradesSelected: 33,
  selectionRate: '~7.2%',
  sessionResult: '+1.89%',
  resultNote: 'Paper-trading return for this single experimental session',
  timeline: [
    {
      time: '08:45',
      title: 'Pre-market research begins',
      description: 'System initialization and macro baseline calibration prior to open.',
    },
    {
      time: '09:15',
      title: 'News Agent stream ingestion',
      description: 'News Agent processes market open bulletins and filing disclosures.',
    },
    {
      time: '10:00',
      title: 'Research Agent synthesis',
      description: 'Converts unstructured information into broader market research context.',
    },
    {
      time: '11:30',
      title: 'Market Analysis Agent evaluation',
      description: 'Evaluates intraday conditions and identifies 459 candidate opportunities.',
    },
    {
      time: '13:00',
      title: 'Company Analysis Agent screening',
      description: 'Conducts deeper company-level screening on shortlisted candidates.',
    },
    {
      time: '14:15',
      title: 'Trading Agent simulated selection',
      description: 'Determines the 33 opportunities progressing to simulated paper trades.',
    },
    {
      time: '15:15',
      title: 'Experiment complete',
      description: 'Market session close. Ledger recorded and session metrics finalized.',
    },
  ],
  whatWeTested: [
    {
      title: 'Coordination',
      question: 'Could five specialized agents contribute to one continuous decision workflow?',
    },
    {
      title: 'Filtering',
      question: 'Could the system evaluate many potential opportunities while selecting only a subset for action?',
    },
    {
      title: 'Autonomy',
      question: 'Could the research → analysis → decision pipeline operate continuously across a market session?',
    },
  ],
  whatItDoesNotEstablish: [
    'expected future returns',
    'long-term profitability',
    'live trading performance',
    'strategy robustness across market regimes',
    'realistic execution performance',
    'scalability to large amounts of capital',
  ],
  summaryPoints: [
    '5 specialized agents',
    '459 opportunities evaluated',
    '33 trades selected',
    '₹10,000 simulated capital',
    'Full experimental session',
    '+1.89% paper result (Single-session simulated result)',
  ],
  disclosure:
    'This was a single paper-trading experiment conducted during development of Dhanvi. It does not represent live trading performance or expected future returns. Paper trading and simulations may differ materially from real trading due to factors including execution, fees, spreads, slippage, latency, liquidity and market impact. Past or simulated performance does not guarantee future results.',
}

export const EXPERIMENT_002: Experiment = {
  id: '002',
  slug: '002',
  formattedId: 'EXPERIMENT 002',
  title: '—',
  subtitle: 'Upcoming experimental simulation in development.',
  status: 'Upcoming',
  type: 'Architecture / Simulation',
}

export const EXPERIMENT_003: Experiment = {
  id: '003',
  slug: '003',
  formattedId: 'EXPERIMENT 003',
  title: '—',
  subtitle: 'Upcoming experimental simulation in development.',
  status: 'Upcoming',
  type: 'Risk Governance / Simulation',
}

export const EXPERIMENTS: Experiment[] = [
  EXPERIMENT_001,
  EXPERIMENT_002,
  EXPERIMENT_003,
]

export function getAllExperiments(): Experiment[] {
  return EXPERIMENTS
}

export function getExperimentById(id: string): Experiment | undefined {
  return EXPERIMENTS.find((e) => e.id === id || e.slug === id)
}
