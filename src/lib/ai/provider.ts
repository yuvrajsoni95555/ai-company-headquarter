/**
 * AI Provider Architecture
 * Supports Google Gemini and OpenAI with configurable model routing and secure key resolution.
 */

export interface LLMRequestOptions {
  model?: string;
  systemPrompt?: string;
  temperature?: number;
  jsonMode?: boolean;
}

export interface LLMResponse {
  text: string;
  provider: "gemini" | "openai";
  model: string;
  tokensUsed?: number;
}

export class MissingCredentialsError extends Error {
  constructor(provider: string = "Gemini or OpenAI") {
    super(
      `Missing API Key for ${provider}. Please configure GEMINI_API_KEY or OPENAI_API_KEY in your .env.local file or in the Settings Vault.`
    );
    this.name = "MissingCredentialsError";
  }
}

/**
 * Resolves the active API key and provider from environment or request headers
 */
export function resolveAIProvider(headers?: Headers): {
  provider: "gemini" | "openai" | null;
  apiKey: string | null;
} {
  // 1. Check server environment variables first
  if (process.env.GEMINI_API_KEY) {
    return { provider: "gemini", apiKey: process.env.GEMINI_API_KEY };
  }
  if (process.env.OPENAI_API_KEY) {
    return { provider: "openai", apiKey: process.env.OPENAI_API_KEY };
  }

  // 2. Check request headers passed from Settings Vault (client secure storage)
  if (headers) {
    const geminiHeader = headers.get("x-gemini-api-key");
    if (geminiHeader && geminiHeader.trim()) {
      return { provider: "gemini", apiKey: geminiHeader.trim() };
    }
    const openaiHeader = headers.get("x-openai-api-key");
    if (openaiHeader && openaiHeader.trim()) {
      return { provider: "openai", apiKey: openaiHeader.trim() };
    }
  }

  return { provider: null, apiKey: null };
}

/**
 * Executes a completion call against Gemini REST API
 */
async function callGemini(
  prompt: string,
  apiKey: string,
  options: LLMRequestOptions = {}
): Promise<LLMResponse> {
  const model = options.model || "gemini-1.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const bodyPayload: any = {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      temperature: options.temperature ?? 0.7,
    },
  };

  if (options.systemPrompt) {
    bodyPayload.systemInstruction = {
      parts: [{ text: options.systemPrompt }],
    };
  }

  if (options.jsonMode) {
    bodyPayload.generationConfig.responseMimeType = "application/json";
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyPayload),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API Error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  const tokensUsed = data.usageMetadata?.totalTokenCount || 0;

  return {
    text,
    provider: "gemini",
    model,
    tokensUsed,
  };
}

/**
 * Executes a completion call against OpenAI API
 */
async function callOpenAI(
  prompt: string,
  apiKey: string,
  options: LLMRequestOptions = {}
): Promise<LLMResponse> {
  const model = options.model || "gpt-4o-mini";
  const url = "https://api.openai.com/v1/chat/completions";

  const messages: any[] = [];
  if (options.systemPrompt) {
    messages.push({ role: "system", content: options.systemPrompt });
  }
  messages.push({ role: "user", content: prompt });

  const bodyPayload: any = {
    model,
    messages,
    temperature: options.temperature ?? 0.7,
  };

  if (options.jsonMode) {
    bodyPayload.response_format = { type: "json_object" };
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(bodyPayload),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenAI API Error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content || "";
  const tokensUsed = data.usage?.total_tokens || 0;

  return {
    text,
    provider: "openai",
    model,
    tokensUsed,
  };
}

/**
 * Universal Unified LLM Dispatcher
 */
export async function executeLLM(
  prompt: string,
  options: LLMRequestOptions = {},
  headers?: Headers
): Promise<LLMResponse> {
  const { provider, apiKey } = resolveAIProvider(headers);

  if (!provider || !apiKey) {
    throw new MissingCredentialsError();
  }

  if (provider === "gemini") {
    return callGemini(prompt, apiKey, options);
  }

  if (provider === "openai") {
    return callOpenAI(prompt, apiKey, options);
  }

  throw new Error(`Unsupported AI provider: ${provider}`);
}
