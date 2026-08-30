import { NextResponse } from 'next/server';
import { categorizeTransaction } from '../../../../lib/ai/categorization';

export async function POST(request: Request) {
  try {
    const { rows } = await request.json();
    if (!rows || !Array.isArray(rows)) {
      return NextResponse.json({ error: 'Rows array required' }, { status: 400 });
    }

    const processed = rows.map((row: any, idx: number) => {
      const cat = categorizeTransaction(row.description || '', row.amount || 0);
      return {
        id: `imp_${idx}`,
        date: row.date || new Date().toISOString().split('T')[0],
        description: row.description,
        amount: row.amount,
        type: row.type || (row.amount > 0 ? 'SALE' : 'EXPENSE'),
        category: cat.category,
        accountCode: cat.accountCode,
        requiresReview: cat.requiresReview,
        confidence: cat.confidence,
        matchRule: cat.matchRule,
      };
    });

    return NextResponse.json({ success: true, count: processed.length, data: processed });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Import failed' }, { status: 500 });
  }
}
