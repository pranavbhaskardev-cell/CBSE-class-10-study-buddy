const express = require("express");
const cors = require("cors");
require("dotenv").config();

const chaptersRoute = require("./routes/chapters");
const tutorRoute = require("./routes/tutor");
const notesRoute = require("./routes/notes");
const flashcardsRoute = require("./routes/flashcards");
const competencyRoute = require("./routes/competency");
const pyqRoute = require("./routes/pyq");
const searchRoute = require("./routes/search");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check — hit this to confirm the server is alive
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "CBSE Study Buddy backend is running" });
});

app.use("/api/chapters", chaptersRoute);
app.use("/api/tutor", tutorRoute);
app.use("/api/notes", notesRoute);
app.use("/api/flashcards", flashcardsRoute);
app.use("/api/competency", competencyRoute);
app.use("/api/pyq", pyqRoute);
app.use("/api/search", searchRoute);

app.listen(PORT, () => {
  console.log(`CBSE Study Buddy backend listening on port ${PORT}`);
});// Backend server entry point
// Configuration and main server setup will go here
