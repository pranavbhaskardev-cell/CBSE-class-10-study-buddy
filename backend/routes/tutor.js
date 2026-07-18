const express = require("express");
const router = express.Router();
const { callGemini } = require("../utils/gemini");
const { buildChapterLockPrompt } = require("../utils/chapterLock");

// POST /api/tutor  { chapterId, question, history: [{role, text}] }
router.post("/", async (req, res) => {
  try {
    const { chapterId, question, history = [] } = req.body;

    if (!chapterId || !question) {
      return res.status(400).json({ error: "chapterId and question are required." });
    }

    const { systemInstruction, info } = buildChapterLockPrompt(
      chapterId,
      "an experienced, friendly teacher who explains concepts clearly."
    );

    const fullInstruction = `${systemInstruction}
For every answer, structure it with: a simple explanation, 2-3 bullet points of key ideas, one real-world example, an exam tip, a common mistake students make, and a one-line summary at the end.`;

    const historyText = history
      .map((h) => `${h.role === "user" ? "Student" : "Tutor"}: ${h.text}`)
      .join("\n");

    const prompt = historyText
      ? `${historyText}\nStudent: ${question}`
      : question;

    const answer = await callGemini({ systemInstruction: fullInstruction, prompt });

    res.json({ answer, chapter: info.chapter, subject: info.subject, branch: info.branch });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
