import { AI, SAMPLE } from "../config/app.config";
import { analyzeCode } from "../lib/gemini";

async function main() {
  console.log("--------------------------------------------------");
  console.log("🌶️ Testing Code Roaster Gemini Connection...");
  console.log(`🤖 Target Model: ${AI.modelLabel} (${AI.model})`);
  console.log("--------------------------------------------------");

  try {
    const result = await analyzeCode({
      language: SAMPLE.language,
      code: SAMPLE.code,
      roastLevel: "sharp",
      errorMessage: "TypeError: unsupported operand type(s) for +=: 'int' and 'list'",
    });

    console.log("✅ Gemini Response Received Successfully!\n");
    console.log("🔥 Roast:\n", result.roast);
    console.log(`\n🐛 Total Issues Found: ${result.issues.length}`);
    result.issues.forEach((issue, idx) => {
      console.log(`   [${idx + 1}] Line ${issue.line} [${issue.severity}]: ${issue.title}`);
    });
    console.log("\n💡 Takeaway:\n", result.takeaway);
    console.log("\n✨ API check PASSED!");
  } catch (error) {
    console.error("❌ API check FAILED:");
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
