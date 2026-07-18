const express = require("express");
const router = express.Router();
const { callGemini, parseJsonSafely } = require("../utils/gemini");
const { buildChapterLockPrompt } = require("../utils/chapterLock");

// POST /api/competency  { chapterId }
router.post("/", async (req, res) => {
  try {
    const { chapterId } = req.body;
    if (!chapterId) return res.status(400).json({ error: "chapterId is required." });

    const { systemInstruction, info } = buildChapterLockPrompt(
      chapterId,
      "writing CBSE competency-based exam questions."
    );

    const prompt = `Generate CBSE competency-based questions for the chapter "${info.chapter}", matching the latest competency-focused exam pattern.
Return ONLY valid JSON, no markdown fences, in this exact shape:
{
  "mcqs": [ { "question": "string", "options": ["A","B","C","D"], "answerIndex": 0, "explanation": "string" } ],
  "caseBased": [ { "passage": "string", "questions": ["string"] } ],
  "assertionReason": [ { "assertion": "string", "reason": "string", "answer": "string", "explanation": "string" } ],
  "shortAnswer": ["string"],
  "longAnswer": ["string"]
}
Include 5 MCQs, 1 case-based set with 3 sub-questions, 3 assertion-reason questions, 4 short-answer, 2 long-answer.`;

    const raw = await callGemini({ systemInstruction, prompt, jsonMode: true });
    const questions = parseJsonSafely(raw);

    res.json({ questions, chapter: info.chapter });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
