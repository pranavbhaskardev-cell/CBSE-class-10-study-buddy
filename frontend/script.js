// Frontend JavaScript
// Main application logic

document.addEventListener('DOMContentLoaded', function() {
    console.log('CBSE Class 10 Study Buddy loaded');
    
    // Initialize app
    initializeApp();
});

function initializeApp() {
    // Setup event listeners
    setupNavigation();
    
    // Load initial content
    loadSection('home');
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            loadSection(sectionId);
        });
    });
}

function loadSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
    }
}

// API Base URL
const API_URL = process.env.API_URL || 'http://localhost:5000';

// Fetch wrapper function
async function fetchAPI(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API Fetch Error:', error);
        throw error;
    }
}
