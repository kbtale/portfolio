import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.honeyPot) {
      return NextResponse.json({ message: 'Bot detected' }, { status: 400 });
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      return NextResponse.json({ message: 'Missing WEB3FORMS_ACCESS_KEY environment variable' }, { status: 500 });
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        ...body
      }),
    });

    // Handle case where service might not return JSON
    const result = await response.json().catch(() => null);
    
    if (!result) {
      return NextResponse.json({ message: 'Web3Forms failed to respond correctly' }, { status: 502 });
    }

    return NextResponse.json(result, { status: response.ok ? 200 : response.status });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ 
      message: 'Internal Server Error', 
      detail: errorMessage
    }, { status: 500 });
  }
}
