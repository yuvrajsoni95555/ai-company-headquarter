import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { webhookUrl, event, payload } = await req.json();

    if (!webhookUrl) {
      return NextResponse.json({ error: "Webhook URL is required" }, { status: 400 });
    }

    const testPayload = {
      event: event || "test_ping",
      timestamp: new Date().toISOString(),
      source: "AI Company Headquarters (House of Jewelux)",
      founder: "Yuvraj Soni",
      data: payload || { test: true, ping: "pong" },
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "AI-Company-Headquarters-Dispatcher/1.0",
        },
        body: JSON.stringify(testPayload),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      return NextResponse.json({
        success: response.ok,
        status: response.status,
        statusText: response.statusText,
        url: webhookUrl,
        event: testPayload.event,
        delivered: true,
      });
    } catch (networkErr: any) {
      clearTimeout(timeout);
      return NextResponse.json({
        success: false,
        error: "Network / Unreachable Host",
        details: networkErr.message || "Failed to establish TCP connection to webhook destination",
        url: webhookUrl,
        delivered: false,
      });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
