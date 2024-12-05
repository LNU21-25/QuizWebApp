import './styles/main.css';
import { QuizAPI } from './utils/api.js';
import { renderHomePage } from './pages/home.js';
import { renderQuizPage } from './pages/quiz.js';
import { renderLeaderboardPage } from './pages/leaderboard.js';

class QuizApp {
    constructor() {
        this.contentContainer = document.getElementById('content');
        this.navLinks = document.querySelectorAll('.nav-links a');
        this.initEventListeners();
    }

    /**
     * Initialize event listeners for navigation
     */
    initEventListeners() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                this.navigateTo(page);
            });
        });

        // Initial page load
        this.navigateTo('home');
    }

    /**
     * Navigate to a specific page
     * @param {string} page - The page to navigate to
     */
    async navigateTo(page) {
        // Clear any existing game state or timers
        if (window.currentTimer) {
            clearInterval(window.currentTimer);
        }

        switch (page) {
            case 'home':
                renderHomePage(this.contentContainer);
                break;
            case 'quiz':
                renderQuizPage(this.contentContainer);
                break;
            case 'leaderboard':
                renderLeaderboardPage(this.contentContainer);
                break;
            default:
                renderHomePage(this.contentContainer);
        }

        // Update active nav link
        this.navLinks.forEach(link => link.classList.remove('active'));
        document.querySelector(`[data-page="${page}"]`).classList.add('active');
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});