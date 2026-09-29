import { AI } from "@/config/app.config";
import { ROAST_SYSTEM_INSTRUCTION, buildUserPrompt } from "@/lib/prompt";
import { roastResponseSchema } from "@/lib/schema";
import { RoastRequest, RoastResult } from "@/types/roast";
import { ApiError, GoogleGenAI } from "@google/genai";

function friendlyErrorMessage(status: number | undefined, error: unknown): string {
  const baseMessage = error instanceof Error ? error.message : String(error);

  switch (status) {
    case 400:
      return `Invalid request to Gemini API (400). Please check your input or schema. (${baseMessage})`;
    case 403:
      return "Access denied (403). Your GEMINI_API_KEY in .env.local may be invalid or expired. Check https://aistudio.google.com/apikey.";
    case 404:
      return `Model "${AI.model}" not found (404). Check AI.model configuration in config/app.config.ts.`;
    case 429:
      return "Gemini API rate limit exceeded (429). Too many requests. Please wait a minute and try again.";
    case 503:
      return "Gemini servers are currently overloaded (503). All automatic retry attempts failed. Please try again shortly.";
    default:
      return `Gemini API error (${status ?? "unknown"}): ${baseMessage}`;
  }
}

export async function analyzeCode(request: RoastRequest): Promise<RoastResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || !apiKey.trim()) {
    throw new Error(
      "GEMINI_API_KEY is missing. Copy .env.example to .env.local, add your key, and restart the server."
    );
  }

  const ai = new GoogleGenAI({ apiKey: apiKey.trim() });
  const contents = buildUserPrompt(request);

  let lastError: unknown = null;

  for (let attempt = 1; attempt <= AI.maxAttempts; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: AI.model,
        contents,
        config: {
          systemInstruction: ROAST_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: roastResponseSchema,
        },
      });

      const responseText = response.text;
      if (!responseText || !responseText.trim()) {
        throw new Error("Gemini returned an empty response text.");
      }

      let parsed: Partial<RoastResult>;
      try {
        parsed = JSON.parse(responseText);
      } catch (jsonErr) {
        throw new Error(
          `Failed to parse Gemini response as JSON: ${
            jsonErr instanceof Error ? jsonErr.message : String(jsonErr)
          }`
        );
      }

      return {
        roast: parsed.roast ?? "",
        issues: Array.isArray(parsed.issues) ? parsed.issues : [],
        correctedCode: parsed.correctedCode ?? "",
        takeaway: parsed.takeaway ?? "",
      };
    } catch (err: unknown) {
      lastError = err;
      const status =
        err instanceof ApiError
          ? err.status
          : typeof (err as { status?: number })?.status === "number"
          ? (err as { status?: number }).status
          : undefined;

      if (status === 503 && attempt < AI.maxAttempts) {
        const delayMs = attempt * 1000;
        console.warn(
          `Gemini 503 received on attempt ${attempt}/${AI.maxAttempts}. Retrying in ${delayMs}ms...`
        );
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        continue;
      }

      throw new Error(friendlyErrorMessage(status, err));
    }
  }

  throw new Error(friendlyErrorMessage(503, lastError));
}
