# CBSE Class 10 Study Buddy

## 📚 Overview

CBSE Class 10 Study Buddy is a comprehensive web application designed to help students prepare for their CBSE Class 10 board examinations. The platform provides a centralized hub for study materials, practice questions, and learning resources.

## ✨ Features

### 1. **Study Notes** 📖
- Comprehensive chapter-wise notes
- Key concepts and formulas
- Easy-to-understand explanations
- Subject-wise organization (Mathematics, Science, Social Science, etc.)

### 2. **Interactive Flashcards** 🎴
- Quick revision flashcards
- Concept and definition pairs
- Multiple subjects and chapters
- Spaced repetition for effective learning

### 3. **Practice Questions** ❓
- Competency-based questions
- Multiple difficulty levels (Easy, Medium, Hard)
- Instant feedback on answers
- Topic-wise organization

### 4. **PYQ Analysis** 📊
- Previous Year Questions from board exams
- Trend analysis and insights
- Chapter frequency analysis
- Year-wise comparison

### 5. **AI Tutor** 🤖
- Interactive tutoring assistance
- Personalized learning help
- Explanation of complex topics
- Real-time Q&A support

### 6. **Global Search** 🔍
- Search across all resources
- Advanced filtering by subject and chapter
- Autocomplete suggestions

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pranavbhaskardev-cell/CBSE-class-10-study-buddy.git
   cd cbse-study-buddy
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your configuration and API keys
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   # Serve the frontend (can use live-server or any static server)
   # For development: python -m http.server 3000
   ```

### Environment Variables

Create a `.env` file in the backend directory based on `.env.example`:

```env
PORT=5000
NODE_ENV=development

# API Keys
OPENAI_API_KEY=your_key_here
GEMINI_API_KEY=your_key_here

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cbse_study_buddy
DB_USER=username
DB_PASSWORD=password

# Other Configuration
JWT_SECRET=your_secret_here
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

## 📁 Project Structure

```
cbse-study-buddy/
├── backend/
│   ├── server.js                 # Main server file
│   ├── package.json              # Dependencies
│   ├── .env.example              # Environment variables template
│   ├── .gitignore                # Git ignore rules
│   ├── routes/
│   │   ├── tutor.js              # AI Tutor endpoints
│   │   ├── notes.js              # Study notes endpoints
│   │   ├── flashcards.js         # Flashcards endpoints
│   │   ├── competencyQuestions.js # Practice questions endpoints
│   │   ├── pyqAnalysis.js        # PYQ analysis endpoints
│   │   └── search.js             # Global search endpoints
│   └── data/
│       └── chapters.json         # CBSE chapter database
├── frontend/
│   ├── index.html                # Main HTML file
│   ├── style.css                 # Styling
│   ├── script.js                 # Frontend logic
│   └── assets/                   # Images and icons (optional)
└── README.md                     # This file
```

## 🔧 API Endpoints

### Tutor
- `GET /api/tutor` - Get tutor assistance
- `POST /api/tutor` - Ask a question to the tutor

### Notes
- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get specific note
- `POST /api/notes` - Create new notes

### Flashcards
- `GET /api/flashcards` - Get all flashcards
- `GET /api/flashcards/:id` - Get specific flashcard
- `POST /api/flashcards` - Create new flashcards

### Competency Questions
- `GET /api/questions` - Get practice questions
- `GET /api/questions/:id` - Get specific question
- `POST /api/questions` - Create new questions
- `POST /api/questions/attempt/:id` - Submit answer

### PYQ Analysis
- `GET /api/pyq` - Get PYQ
- `GET /api/pyq/trends` - Get PYQ trends
- `GET /api/pyq/chapter-frequency/:subject` - Get chapter frequency
- `POST /api/pyq` - Add new PYQ

### Search
- `GET /api/search` - Global search
- `GET /api/search/suggestions` - Search suggestions

## 🛠️ Development

### Running Tests
```bash
cd backend
npm test
```

### Building for Production
```bash
npm run build
```

## 📖 Supported Subjects

- **Mathematics** - 15 Chapters
- **Science** - 16 Chapters (Physics, Chemistry, Biology)
- **Social Science** - 20 Chapters (History, Geography, Civics, Economics)
- **English** - Literature & Language
- **Hindi** - Language & Literature

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

### Steps to Contribute:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💡 Future Enhancements

- [ ] User authentication and profiles
- [ ] Progress tracking and analytics
- [ ] Mock tests and exams
- [ ] Video tutorials integration
- [ ] Mobile app version
- [ ] Offline support
- [ ] Community forum for discussions
- [ ] Expert Q&A sessions
- [ ] Personalized learning recommendations
- [ ] Doubt resolution chatbot

## 📧 Contact

For questions or feedback, please reach out to [pranavbhaskardev-cell](https://github.com/pranavbhaskardev-cell)

## 🙏 Acknowledgments

- CBSE Board for educational resources
- Contributors and community members
- All the students using this platform

---

**Made with ❤️ for CBSE Class 10 Students**
