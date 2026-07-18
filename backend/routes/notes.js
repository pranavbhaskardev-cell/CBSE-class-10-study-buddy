const express = require("express");
const router = express.Router();
const { callGemini, parseJsonSafely } = require("../utils/gemini");
const { buildChapterLockPrompt } = require("../utils/chapterLock");

// POST /api/notes  { chapterId }
router.post("/", async (req, res) => {
  try {
    const { chapterId } = req.body;
    if (!chapterId) return res.status(400).json({ error: "chapterId is required." });

    const { systemInstruction, info } = buildChapterLockPrompt(
      chapterId,
      "writing structured revision notes."
    );

    const prompt = `Generate structured revision notes for the chapter "${info.chapter}".
Return ONLY valid JSON, no markdown fences, in this exact shape:
{
  "sections": [
    { "heading": "string", "points": ["string", "string"] }
  ],
  "keywords": [{ "term": "string", "definition": "string" }],
  "examTips": ["string"],
  "summary": "string"
}
Include definitions, explanations, keywords, examples where relevant, and a concise summary.`;

    const raw = await callGemini({ systemInstruction, prompt, jsonMode: true });
    const notes = parseJsonSafely(raw);

    res.json({ notes, chapter: info.chapter });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
