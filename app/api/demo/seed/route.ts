import { NextResponse } from 'next/server';
import { buildCompleteDemoLedger } from '../../../../lib/demo-data/sharma-wholesale';

export async function GET() {
  const data = buildCompleteDemoLedger();
  return NextResponse.json({ success: true, data });
}
