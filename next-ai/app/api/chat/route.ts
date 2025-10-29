import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const backend = process.env.NEXT_PUBLIC_BACKEND_BASE!;
    
    if (!backend || backend.includes('your-subdomain')) {
      return NextResponse.json(
        { error: 'Backend URL not configured. Please set NEXT_PUBLIC_BACKEND_BASE in .env.local' }, 
        { status: 500 }
      );
    }

    const r = await fetch(`${backend}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store'
    });
    
    const data = await r.json();
    return NextResponse.json(data, { status: r.status });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'proxy error' }, { status: 500 });
  }
}
