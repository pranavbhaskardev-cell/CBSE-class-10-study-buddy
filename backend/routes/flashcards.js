const express = require("express");
const router = express.Router();
const { callGemini, parseJsonSafely } = require("../utils/gemini");
const { buildChapterLockPrompt } = require("../utils/chapterLock");

// POST /api/flashcards  { chapterId, count }
router.post("/", async (req, res) => {
  try {
    const { chapterId, count = 10 } = req.body;
    if (!chapterId) return res.status(400).json({ error: "chapterId is required." });

    const { systemInstruction, info } = buildChapterLockPrompt(
      chapterId,
      "creating revision flashcards."
    );

    const prompt = `Create ${count} flashcards for the chapter "${info.chapter}".
Cover definitions, formulas (if any), keywords, and important facts.
Return ONLY valid JSON, no markdown fences, in this exact shape:
{ "cards": [ { "front": "string question", "back": "string answer" } ] }`;

    const raw = await callGemini({ systemInstruction, prompt, jsonMode: true });
    const data = parseJsonSafely(raw);

    res.json({ cards: data.cards, chapter: info.chapter });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
