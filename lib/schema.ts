import { SEVERITIES } from "@/config/app.config";
import { Schema, Type } from "@google/genai";

export const roastResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    roast: {
      type: Type.STRING,
      description: "The main comedic, witty Hinglish critique of the code.",
    },
    issues: {
      type: Type.ARRAY,
      description: "Structured list of detected issues ordered by severity.",
      items: {
        type: Type.OBJECT,
        properties: {
          line: {
            type: Type.INTEGER,
            description: "1-based line number where the issue appears.",
          },
          severity: {
            type: Type.STRING,
            enum: [...SEVERITIES],
            description: "Severity level of the issue.",
          },
          title: {
            type: Type.STRING,
            description: "Short punchy Hinglish title of the issue.",
          },
          codeSnippet: {
            type: Type.STRING,
            description: "The problematic code snippet extracted from input.",
          },
          diagnosis: {
            type: Type.STRING,
            description: "Hinglish explanation of why this is a problem.",
          },
          expected: {
            type: Type.STRING,
            description: "What should be done instead in Hinglish/simple English.",
          },
        },
        required: [
          "line",
          "severity",
          "title",
          "codeSnippet",
          "diagnosis",
          "expected",
        ],
      },
    },
    correctedCode: {
      type: Type.STRING,
      description: "The complete corrected code with no markdown fences.",
    },
    takeaway: {
      type: Type.STRING,
      description: "Final encouraging takeaway in Hinglish.",
    },
  },
  required: ["roast", "issues", "correctedCode", "takeaway"],
};
