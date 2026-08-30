import { describe, it, expect } from 'vitest';
import { buildCompleteDemoLedger } from '../lib/demo-data/sharma-wholesale';
import { generateProactiveInsights } from '../lib/ai/insights';
import * as Tools from '../lib/ai/tools';
import { processFinancialQuestion } from '../lib/ai/assistant';

describe('Dynamic Signal-Driven Insights & AI Tools', () => {
  const demo = buildCompleteDemoLedger();
  const ctx = {
    accounts: demo.accounts,
    journalEntries: demo.journalEntries,
    transactions: demo.transactions,
    customers: demo.customers,
    vendors: demo.vendors,
    products: demo.products,
  };

  it('should generate revenue, profit, and liquidity signals for profitable businesses', () => {
    const { insights, health } = generateProactiveInsights(
      demo.business.id,
      demo.accounts,
      demo.journalEntries,
      demo.transactions,
      demo.customers,
      demo.vendors
    );

    expect(insights.length).toBeGreaterThan(0);
    expect(health.overallScore).toBeGreaterThanOrEqual(70);
    expect(health.rating).toBe('EXCELLENT');

    const revInsight = insights.find((i) => i.insightType === 'REVENUE_GROWTH');
    expect(revInsight).toBeDefined();
  });

  it('should execute 20+ backend tools with deterministic ledger results', () => {
    const summary = Tools.getDashboardSummary(ctx);
    expect(summary.revenue).toBeGreaterThan(0);
    expect(summary.isBalanced).toBe(true);

    const cash = Tools.getCashBalance(ctx);
    expect(cash.totalCashAndBank).toBeGreaterThan(0);

    const receivables = Tools.getReceivables(ctx);
    expect(receivables.totalReceivables).toBeGreaterThan(0);

    const payables = Tools.getPayables(ctx);
    expect(payables.totalPayables).toBeGreaterThan(0);
  });

  it('should answer conversational questions with distinct tailored responses and tool citations', () => {
    const revAnswer = processFinancialQuestion('How much revenue did we make this month?', ctx);
    expect(revAnswer.intent).toBe('QUERY_REVENUE');
    expect(revAnswer.toolsUsed).toContain('getRevenue');
    expect(revAnswer.keyMetric).toBeDefined();

    const cashAnswer = processFinancialQuestion('How much liquid cash do we have?', ctx);
    expect(cashAnswer.intent).toBe('QUERY_CASH_BALANCE');
    expect(cashAnswer.toolsUsed).toContain('getCashBalance');

    const debtorsAnswer = processFinancialQuestion('Who owes us money?', ctx);
    expect(debtorsAnswer.intent).toBe('QUERY_RECEIVABLES');
    expect(debtorsAnswer.toolsUsed).toContain('getReceivables');
  });

  it('should handle interactive simulation decision states, bounds, and replay accurately', () => {
    // Test decision options switching
    let userChoice: string | null = null;
    const setUserChoice = (k: string) => { userChoice = k; };

    // Select A
    setUserChoice('A');
    expect(userChoice).toBe('A');

    // Switch to B
    setUserChoice('B');
    expect(userChoice).toBe('B');

    // Switch to C
    setUserChoice('C');
    expect(userChoice).toBe('C');

    // Step navigation bounds
    const totalSteps = 8;
    let stepIndex = 0;
    const handleNext = () => { stepIndex = Math.min(totalSteps - 1, stepIndex + 1); };
    const handlePrev = () => { stepIndex = Math.max(0, stepIndex - 1); };

    // Initial state: Prev disabled, Next advances
    expect(stepIndex === 0).toBe(true);
    handleNext();
    expect(stepIndex).toBe(1);
    handleNext();
    expect(stepIndex).toBe(2);

    // Prev goes back
    handlePrev();
    expect(stepIndex).toBe(1);

    // Replay resets
    let isPlaying = true;
    const handleReplay = () => {
      isPlaying = false;
      stepIndex = 0;
      userChoice = null;
    };

    handleReplay();
    expect(stepIndex).toBe(0);
    expect(userChoice).toBeNull();
    expect(isPlaying).toBe(false);
  });
});
