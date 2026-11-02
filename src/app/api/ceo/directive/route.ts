import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { directive } = await req.json();

    if (!directive || typeof directive !== "string") {
      return NextResponse.json({ error: "Directive text is required" }, { status: 400 });
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    // Check if an AI provider key is configured
    if (!geminiKey && !openaiKey) {
      return NextResponse.json(
        {
          success: false,
          requiresApiKey: true,
          message:
            "No AI model provider credentials detected. To enable live autonomous AI reasoning for Aegis Prime (CEO AI), please set GEMINI_API_KEY or OPENAI_API_KEY in your .env.local file or the Settings vault.",
          ceoSynthesis: {
            status: "AWAITING_CREDENTIALS",
            parsedIntent: directive,
            executiveDirective: `Directive received by Aegis Prime: "${directive}". Live neural inference is queued pending API credentials.`,
          },
        },
        { status: 200 }
      );
    }

    // If Gemini key is available, call the Gemini REST API
    if (geminiKey) {
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
                    text: `You are Aegis Prime, the Central Chief Executive Officer AI of House of Jewelux (a high-end bespoke luxury jewelry brand founded by Yuvraj Soni).
Founder Yuvraj Soni just issued the following directive:
"${directive}"

Respond in JSON format with:
- executiveSummary: concise executive analysis
- delegatedDepartments: array of department names tasked
- immediateActions: array of 2-3 specific deliverables
- founderReport: a direct 2-sentence update addressed to Founder Soni`,
                  },
                ],
              },
            ],
            generationConfig: {
              responseMimeType: "application/json",
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        return NextResponse.json(
          {
            success: false,
            error: "Gemini API error",
            details: errorData,
          },
          { status: 502 }
        );
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      const parsed = JSON.parse(rawText || "{}");

      return NextResponse.json({
        success: true,
        provider: "Gemini 1.5 Flash",
        ceoSynthesis: parsed,
      });
    }

    return NextResponse.json({
      success: false,
      message: "Provider configured but not executed",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Internal Server Error", message: err.message },
      { status: 500 }
    );
  }
}
