const express = require("express");
const router = express.Router();
const fetch = global.fetch || require("node-fetch");

// POST /api/search  { chapterQuery }  e.g. "CBSE Class 10 Science sample paper 2026"
router.post("/", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "query is required." });

    const apiKey = process.env.TAVILY_API_KEY;
    if (!apiKey) throw new Error("TAVILY_API_KEY is missing. Add it to your .env file.");

    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        query: `${query} site:cbse.gov.in OR site:ncert.nic.in OR site:cbseacademic.nic.in`,
        search_depth: "advanced",
        max_results: 6
      })
    });

    if (!response.ok) {
      throw new Error(`Tavily API error (${response.status}): ${await response.text()}`);
    }

    const data = await response.json();
    const results = (data.results || []).map((r) => ({
      title: r.title,
      url: r.url,
      snippet: r.content
    }));

    res.json({ results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
