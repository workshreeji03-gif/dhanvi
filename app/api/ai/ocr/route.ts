import { NextResponse } from 'next/server';
import { validateExtractedInvoice, ExtractedInvoiceData } from '../../../../lib/ai/invoice-extraction';

export async function POST(request: Request) {
  try {
    const rawData = await request.json();
    const validated = validateExtractedInvoice(rawData);
    return NextResponse.json({ success: true, data: validated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Invoice extraction validation failed' }, { status: 500 });
  }
}
