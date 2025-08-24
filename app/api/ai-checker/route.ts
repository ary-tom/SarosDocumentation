

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(req: NextRequest) {
  const { code } = await req.json();

  const prompt = [
    "Analyze the following Saros SDK code and provide feedback in JSON format.",
    "The JSON object should have the following structure:",
    "{",
    '  "score": <an integer score from 0 to 100>,',
    '  "issues": [',
    '    {',
    '      "type": <"error" | "warning" | "info">,',
    '      "line": <line number>,',
    '      "message": "<a concise message about the issue>",',
    '      "suggestion": "<a suggestion to fix the issue>"',
    '    }',
    '  ],',
    '  "suggestions": [',
    '    "<a general suggestion for improvement>"',
    '  ],',
    '  "security": [',
    '    "<a security-related suggestion>"',
    '  ],',
    '  "performance": [',
    '    "<a performance-related suggestion>"',
    '  ]',
    "}",
    "Code to analyze:",
    "```typescript",
    code,
    "```",
  ].join("\n");

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    // Sometimes the model returns the JSON wrapped in ```json ... ```
    const jsonText = text.replace(/```json/g, "").replace(/```/g, "");
    const analysis = JSON.parse(jsonText);
    return NextResponse.json(analysis);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to analyze code" }, { status: 500 });
  }
}

