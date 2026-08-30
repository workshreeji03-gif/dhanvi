import { NextResponse } from 'next/server';
import { buildCompleteDemoLedger } from '../../../../lib/demo-data/sharma-wholesale';
import { processFinancialQuestion } from '../../../../lib/ai/assistant';

export async function POST(request: Request) {
  try {
    const { question, context } = await request.json();
    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    const demo = buildCompleteDemoLedger();
    const financialCtx = context || {
      accounts: demo.accounts,
      journalEntries: demo.journalEntries,
      transactions: demo.transactions,
      customers: demo.customers,
      vendors: demo.vendors,
    };

    const answer = processFinancialQuestion(question, financialCtx);
    return NextResponse.json({ success: true, answer });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'AI processing failed' }, { status: 500 });
  }
}
