const express = require("express");
const router = express.Router();
const fetch = global.fetch || require("node-fetch");
const { callGemini, parseJsonSafely } = require("../utils/gemini");
const { buildChapterLockPrompt } = require("../utils/chapterLock");

async function tavilySearch(query) {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) throw new Error("TAVILY_API_KEY is missing. Add it to your .env file.");

  const response = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: apiKey,
      query,
      search_depth: "advanced",
      max_results: 5
    })
  });

  if (!response.ok) {
    throw new Error(`Tavily API error (${response.status}): ${await response.text()}`);
  }

  const data = await response.json();
  return (data.results || []).map((r) => ({ title: r.title, url: r.url, content: r.content }));
}

// POST /api/pyq  { chapterId }
router.post("/", async (req, res) => {
  try {
    const { chapterId } = req.body;
    if (!chapterId) return res.status(400).json({ error: "chapterId is required." });

    const { systemInstruction, info } = buildChapterLockPrompt(
      chapterId,
      "analyzing previous year CBSE board question patterns."
    );

    const searchResults = await tavilySearch(
      `CBSE class 10 ${info.branch} previous year board exam questions "${info.chapter}"`
    );

    const searchContext = searchResults
      .map((r, i) => `Source ${i + 1} (${r.title}): ${r.content}`)
      .join("\n\n");

    const prompt = `Using the search context below about past CBSE board papers, analyze the chapter "${info.chapter}".
Search context:
${searchContext}

Return ONLY valid JSON, no markdown fences, in this exact shape:
{
  "frequentConcepts": [ { "concept": "string", "timesAsked": "approx frequency description", "why": "string" } ],
  "marksDistribution": "string summary",
  "trend": "string describing the pattern across years",
  "expectedQuestions": [ { "question": "string", "confidence": "High|Medium|Low", "reason": "string" } ]
}
Generate 5 frequentConcepts and 6 expectedQuestions.`;

    const raw = await callGemini({ systemInstruction, prompt, jsonMode: true });
    const analysis = parseJsonSafely(raw);

    res.json({ analysis, sources: searchResults, chapter: info.chapter });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
