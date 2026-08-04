const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function generateSummary(text) {
    const limitedText = text.slice(0, 50000);

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `
        You are an AI study assistant.

Create a well-structured revision summary in Markdown.

Rules:
- Do NOT say "Here is the summary".
- Use ## headings.
- Use bullet points.
- Leave a blank line between sections.
- Highlight important words using **bold**.
- Make it easy for students to revise.

Notes:
${limitedText}
`,
    });

    return response.text;
}

async function generateFlashcards(text) {
    const limitedText = text.slice(0, 50000);

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `
You are an AI study assistant.

Generate exactly 10 flashcards from these notes.

Rules:
- Return ONLY valid JSON.
- Do not include markdown.
- Do not write explanations.
- Each flashcard must have a question and an answer.

Format:

[
  {
    "question": "...",
    "answer": "..."
  }
]

Notes:
${limitedText}
`,
    });

    return response.text;
}

module.exports = {
    generateSummary,
    generateFlashcards,
};