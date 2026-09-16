import { describe, it, expect } from 'vitest'
import { EXPERIMENT_001, getAllExperiments, getExperimentById } from '@/lib/experiments/data'

describe('Dhanvi Experiments Data Model & Verification', () => {
  it('should verify all Experiment 001 numbers match the exact verified facts', () => {
    expect(EXPERIMENT_001.id).toBe('001')
    expect(EXPERIMENT_001.formattedId).toBe('EXPERIMENT 001')
    expect(EXPERIMENT_001.title).toBe('Multi-Agent Paper Trading')
    expect(EXPERIMENT_001.status).toBe('Completed')
    expect(EXPERIMENT_001.type).toBe('Paper Trading / Simulation')

    // Exact agent count and names
    expect(EXPERIMENT_001.agentsCount).toBe(5)
    expect(EXPERIMENT_001.agents).toHaveLength(5)
    const agentNames = EXPERIMENT_001.agents?.map((a) => a.name)
    expect(agentNames).toEqual([
      'News Agent',
      'Research Agent',
      'Market Analysis Agent',
      'Company Analysis Agent',
      'Trading Agent',
    ])

    // Exact financial and session parameters
    expect(EXPERIMENT_001.startingCapital).toBe('₹10,000')
    expect(EXPERIMENT_001.startTime).toBe('08:45')
    expect(EXPERIMENT_001.endTime).toBe('15:15')
    expect(EXPERIMENT_001.opportunitiesEvaluated).toBe(459)
    expect(EXPERIMENT_001.tradesSelected).toBe(33)
    expect(EXPERIMENT_001.selectionRate).toBe('~7.2%')
    expect(EXPERIMENT_001.sessionResult).toBe('+1.89%')
  })

  it('should verify strict terminology: evaluated vs selected, no fake trades executed claim', () => {
    // 459 must be evaluated, 33 must be selected
    expect(EXPERIMENT_001.opportunitiesEvaluated).toBe(459)
    expect(EXPERIMENT_001.tradesSelected).toBe(33)
    expect(EXPERIMENT_001.selectionRate).toBe('~7.2%')

    // Verify summary points terminology
    const summary = EXPERIMENT_001.summaryPoints?.join(' ')
    expect(summary).toContain('459 opportunities evaluated')
    expect(summary).toContain('33 trades selected')
    expect(summary).toContain('+1.89% paper result')
    expect(summary).toContain('Single-session simulated result')
  })

  it('should verify prominent disclosure exists with specific limitations', () => {
    expect(EXPERIMENT_001.disclosure).toBeDefined()
    expect(EXPERIMENT_001.disclosure).toContain('single paper-trading experiment')
    expect(EXPERIMENT_001.disclosure).toContain('does not represent live trading performance')
    expect(EXPERIMENT_001.disclosure).toContain('execution, fees, spreads, slippage, latency, liquidity and market impact')
    expect(EXPERIMENT_001.disclosure).toContain('Past or simulated performance does not guarantee future results')
  })

  it('should verify negative bounds: what Experiment 001 does NOT establish', () => {
    const limitations = EXPERIMENT_001.whatItDoesNotEstablish
    expect(limitations).toContain('expected future returns')
    expect(limitations).toContain('long-term profitability')
    expect(limitations).toContain('live trading performance')
    expect(limitations).toContain('strategy robustness across market regimes')
    expect(limitations).toContain('realistic execution performance')
    expect(limitations).toContain('scalability to large amounts of capital')
  })

  it('should verify future experiments are not fabricated', () => {
    const all = getAllExperiments()
    expect(all.length).toBeGreaterThanOrEqual(3)

    const exp2 = getExperimentById('002')
    expect(exp2).toBeDefined()
    expect(exp2?.status).toBe('Upcoming')
    expect(exp2?.title).toBe('—')

    const exp3 = getExperimentById('003')
    expect(exp3).toBeDefined()
    expect(exp3?.status).toBe('Upcoming')
    expect(exp3?.title).toBe('—')
  })
})
