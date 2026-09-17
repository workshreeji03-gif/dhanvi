import { describe, it, expect } from 'vitest'
import { EXPERIMENT_001, EXPERIMENT_002, getAllExperiments, getExperimentById } from '@/lib/experiments/data'

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

  it('should verify all Experiment 002 numbers match the exact verified backtest output', () => {
    expect(EXPERIMENT_002.id).toBe('002')
    expect(EXPERIMENT_002.formattedId).toBe('EXPERIMENT 002')
    expect(EXPERIMENT_002.title).toBe('EMA Momentum Reversal Backtest')
    expect(EXPERIMENT_002.strategyId).toBe('DHA-DEMO-EMA-MOM v1')
    expect(EXPERIMENT_002.strategyName).toBe('EMA Momentum Reversal Alpha')
    expect(EXPERIMENT_002.type).toBe('Historical Backtest')
    expect(EXPERIMENT_002.status).toBe('Completed')
    expect(EXPERIMENT_002.instrument).toBe('RELIANCE.NS')
    expect(EXPERIMENT_002.timeframe).toBe('1 day')
    expect(EXPERIMENT_002.bars).toBe(72)
    expect(EXPERIMENT_002.executionModel).toBe('NEXT_BAR_OPEN')
    expect(EXPERIMENT_002.initialCapital).toBe('₹100,000.00')

    // Trade metrics
    expect(EXPERIMENT_002.trades).toBe(2)
    expect(EXPERIMENT_002.winningTrades).toBe(0)
    expect(EXPERIMENT_002.losingTrades).toBe(2)
    expect(EXPERIMENT_002.breakevenTrades).toBe(0)
    expect(EXPERIMENT_002.winRate).toBe('0.0%')
    expect(EXPERIMENT_002.netPnl).toBe('-₹883.34')
    expect(EXPERIMENT_002.returnPct).toBe('-0.88%')
    expect(EXPERIMENT_002.maximumDrawdown).toBe('-0.91%')
    expect(EXPERIMENT_002.maximumDrawdownAmount).toBe('₹912.23')
    expect(EXPERIMENT_002.profitFactor).toBe('0.00')

    // Cost modeling
    expect(EXPERIMENT_002.commission).toBe('₹78.75')
    expect(EXPERIMENT_002.slippage).toBe('₹39.37')
    expect(EXPERIMENT_002.totalExecutionCosts).toBe('₹118.12')
    expect(EXPERIMENT_002.finalEquity).toBe('₹99,116.66')
    expect(EXPERIMENT_002.backtestId).toBe('BT-AA2DA005')
    expect(EXPERIMENT_002.timestamp).toBe('2026-09-17 07:06:15 UTC')
  })

  it('should verify negative bounds and disclosure for Experiment 002', () => {
    expect(EXPERIMENT_002.disclosure).toBeDefined()
    expect(EXPERIMENT_002.disclosure).toContain('historical simulation produced by Dhanvi’s backtesting engine')
    expect(EXPERIMENT_002.disclosure).toContain('does not represent live trading performance')
    expect(EXPERIMENT_002.disclosure).toContain('Past or simulated performance does not guarantee future results')

    const limitations = EXPERIMENT_002.whatItDoesNotEstablish
    expect(limitations).toContain('expected future performance')
    expect(limitations).toContain('live trading profitability')
    expect(limitations).toContain('strategy robustness')
    expect(limitations).toContain('performance across different securities')
    expect(limitations).toContain('performance across different market regimes')
    expect(limitations).toContain('statistical significance')
  })

  it('should verify Experiment 003 remains upcoming and uninvented', () => {
    const all = getAllExperiments()
    expect(all.length).toBeGreaterThanOrEqual(3)

    const exp3 = getExperimentById('003')
    expect(exp3).toBeDefined()
    expect(exp3?.status).toBe('Upcoming')
    expect(exp3?.title).toBe('—')
  })
})

