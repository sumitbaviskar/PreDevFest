import { DEFAULTS, LANGUAGES, LIMITS, ROAST_LEVELS } from "@/config/app.config";
import { analyzeCode } from "@/lib/gemini";
import { LanguageId, RoastLevel } from "@/types/roast";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body." },
      { status: 400 }
    );
  }

  const rawCode = typeof body.code === "string" ? body.code : "";
  const code = rawCode;
  const rawErrorMessage = typeof body.errorMessage === "string" ? body.errorMessage.trim() : "";
  const errorMessage = rawErrorMessage;

  if (!code || !code.trim()) {
    return NextResponse.json(
      { error: "No code provided." },
      { status: 400 }
    );
  }

  if (code.length > LIMITS.maxCodeLength) {
    return NextResponse.json(
      {
        error: `Code length (${code.length} chars) exceeds the maximum allowed limit of ${LIMITS.maxCodeLength} characters.`,
      },
      { status: 400 }
    );
  }

  if (errorMessage.length > LIMITS.maxErrorMessageLength) {
    return NextResponse.json(
      {
        error: `Error message length (${errorMessage.length} chars) exceeds the maximum allowed limit of ${LIMITS.maxErrorMessageLength} characters.`,
      },
      { status: 400 }
    );
  }

  const validLanguageIds = LANGUAGES.map((l) => l.id as string);
  const language: LanguageId =
    typeof body.language === "string" && validLanguageIds.includes(body.language)
      ? (body.language as LanguageId)
      : DEFAULTS.language;

  const validRoastLevels = ROAST_LEVELS.map((r) => r.id as string);
  const roastLevel: RoastLevel =
    typeof body.roastLevel === "string" && validRoastLevels.includes(body.roastLevel)
      ? (body.roastLevel as RoastLevel)
      : DEFAULTS.roastLevel;

  try {
    const result = await analyzeCode({
      code,
      language,
      roastLevel,
      errorMessage: errorMessage || undefined,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error analyzing code with Gemini:", error);
    const message = error instanceof Error ? error.message : "Internal server error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
