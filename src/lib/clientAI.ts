/**
 * Client-Side AI Request Helper
 * Securely retrieves session credentials from browser localStorage and attaches
 * them to outgoing request headers without ever logging or exposing them in client bundles.
 */

export function getAIClientHeaders(extraHeaders: Record<string, string> = {}): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...extraHeaders,
  };

  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("ai_hq_settings");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.geminiApiKey && typeof parsed.geminiApiKey === "string" && parsed.geminiApiKey.trim()) {
          headers["x-gemini-api-key"] = parsed.geminiApiKey.trim();
        }
        if (parsed.openaiApiKey && typeof parsed.openaiApiKey === "string" && parsed.openaiApiKey.trim()) {
          headers["x-openai-api-key"] = parsed.openaiApiKey.trim();
        }
      }
    } catch {
      // In restricted contexts, proceed without headers
    }
  }

  return headers;
}
