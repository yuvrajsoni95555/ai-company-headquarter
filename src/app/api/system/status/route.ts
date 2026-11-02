import { NextRequest, NextResponse } from "next/server";
import { resolveAIProvider } from "@/lib/ai/provider";
import { isSupabaseConfigured } from "@/lib/supabaseClient";

export async function GET(req: NextRequest) {
  const { provider, apiKey } = resolveAIProvider(req.headers);

  return NextResponse.json({
    aiProvider: {
      isConfigured: Boolean(apiKey),
      activeProvider: provider,
      hasGeminiServerKey: Boolean(process.env.GEMINI_API_KEY),
      hasOpenAIServerKey: Boolean(process.env.OPENAI_API_KEY),
      availableModels: provider === "gemini"
        ? ["gemini-1.5-pro", "gemini-1.5-flash", "gemini-2.0-flash"]
        : provider === "openai"
        ? ["gpt-4o", "gpt-4o-mini"]
        : [],
    },
    database: {
      isSupabaseConnected: isSupabaseConfigured,
      fallbackMode: "localStorage + in-memory store",
    },
    governance: {
      founder: "Yuvraj Soni",
      ceo: "Aegis Prime",
      chiefSupervisor: "Archon Prime",
      chiefQC: "Kaelen Voss",
      chiefAudit: "Justiciar Vance",
      departmentsCount: 23,
      cryptographicStandard: "RFC 6234 / NIST FIPS 180-4 SHA-256 Chained",
    },
  });
}
