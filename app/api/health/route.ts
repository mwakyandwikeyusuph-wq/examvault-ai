import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'examvault-ai',
    uptime: 'ok',
    timestamp: new Date().toISOString(),
  });
}
