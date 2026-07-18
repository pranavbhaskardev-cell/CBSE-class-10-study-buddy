// Frontend JavaScript for CBSE Study Buddy

const API_BASE_URL = 'http://localhost:5000/api';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('CBSE Study Buddy loaded');
    initializeEventListeners();
});

// Initialize event listeners
function initializeEventListeners() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                search();
            }
        });
    }
}

// Search function
async function search() {
    const query = document.getElementById('searchInput').value;
    if (!query) {
        alert('Please enter a search term');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(query)}`);
        const data = await response.json();
        console.log('Search results:', data);
        displaySearchResults(data);
    } catch (error) {
        console.error('Search error:', error);
        alert('Error performing search');
    }
}

// Navigate to different sections
function navigateTo(section) {
    console.log(`Navigating to: ${section}`);
    // TODO: Implement navigation logic
    alert(`Navigate to ${section} section`);
}

// Display search results
function displaySearchResults(results) {
    console.log('Displaying search results:', results);
    // TODO: Implement result display logic
}

// Fetch notes
async function fetchNotes(chapter, subject) {
    try {
        const response = await fetch(`${API_BASE_URL}/notes?chapter=${chapter}&subject=${subject}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching notes:', error);
        return null;
    }
}

// Fetch flashcards
async function fetchFlashcards(chapter, subject) {
    try {
        const response = await fetch(`${API_BASE_URL}/flashcards?chapter=${chapter}&subject=${subject}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching flashcards:', error);
        return null;
    }
}

// Fetch practice questions
async function fetchQuestions(chapter, subject, difficulty) {
    try {
        const response = await fetch(`${API_BASE_URL}/questions?chapter=${chapter}&subject=${subject}&difficulty=${difficulty}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching questions:', error);
        return null;
    }
}

// Fetch PYQ
async function fetchPYQ(year, chapter, subject) {
    try {
        const response = await fetch(`${API_BASE_URL}/pyq?year=${year}&chapter=${chapter}&subject=${subject}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching PYQ:', error);
        return null;
    }
}

// Fetch tutor assistance
async function getTutorHelp(topic, chapter, difficulty) {
    try {
        const response = await fetch(`${API_BASE_URL}/tutor?topic=${topic}&chapter=${chapter}&difficulty=${difficulty}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error getting tutor help:', error);
        return null;
    }
}

// Submit answer attempt
async function submitAnswer(questionId, answer) {
    try {
        const response = await fetch(`${API_BASE_URL}/questions/attempt/${questionId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ answer })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error submitting answer:', error);
        return null;
    }
}

console.log('CBSE Study Buddy - Frontend initialized');
