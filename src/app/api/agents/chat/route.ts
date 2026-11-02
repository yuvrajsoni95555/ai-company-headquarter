import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { channel, message, targetAgent } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const geminiKey = process.env.GEMINI_API_KEY;

    if (!geminiKey) {
      return NextResponse.json({
        success: false,
        requiresApiKey: true,
        message:
          "Autonomous agent responses require an active GEMINI_API_KEY. Currently running in supervised standby mode.",
        reply: {
          sender: targetAgent || "Archon Prime (Chief Supervisor)",
          role: "Governance & Supervision",
          content: `Directive logged in #${channel}: "${message}". Autonomous AI response will activate once GEMINI_API_KEY is supplied.`,
        },
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `You are an AI department director at House of Jewelux (Founder: Yuvraj Soni).
Channel: #${channel}
Incoming message: "${message}"
Respond as the relevant department director with a professional, concise operational reply (max 2 sentences).`,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json({ error: "AI API error" }, { status: 502 });
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Acknowledged and logged.";

    return NextResponse.json({
      success: true,
      reply: {
        sender: targetAgent || "AI Director",
        role: "Autonomous Operational Agent",
        content: replyText.trim(),
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
