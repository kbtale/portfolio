import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.honeyPot) {
      return NextResponse.json({ message: 'Bot detected' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("API: Missing RESEND_API_KEY");
      return NextResponse.json({ message: 'Missing RESEND_API_KEY environment variable' }, { status: 500 });
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { 
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        to: "cbolivar.dev@openrise.tech", 
        subject: `New Message from ${body.name}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Message:</strong></p>
          <p>${body.message}</p>
        `
      }),
    });

    const result = await response.json();
    
    if (response.ok) {
      return NextResponse.json({ success: true, id: result.id });
    } else {
      console.error("API: Resend Error:", result);
      return NextResponse.json({ 
        message: 'Resend failed to send email', 
        error: result 
      }, { status: response.status });
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ 
      message: 'Internal Server Error', 
      detail: errorMessage
    }, { status: 500 });
  }
}
