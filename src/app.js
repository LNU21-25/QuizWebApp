// Import modules
import renderHome from '/pages/Home.js';
import renderQuiz from '/pages/Quiz.js';
import renderLeaderboard from './pages/LeaderBoard.js';

// Map pages to render functions
const pages = {
  home: renderHome,
  quiz: renderQuiz,
  leaderboard: renderLeaderboard,
};

// Function switch
const switchPage = (page) => {
  const content = document.getElementById('content');
  content.innerHTML = ''; // Clear existing content
  if (pages[page]) {
    pages[page](content); // Render new content into the main element
  }
};

// Listener
window.addEventListener('navigate', (event) => {
  switchPage(event.detail.page);
});

// Set up listeners for navigation
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  navbar.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      const page = event.target.getAttribute('data-page');
      const navigateEvent = new CustomEvent('navigate', { detail: { page } });
      window.dispatchEvent(navigateEvent);
    }
  });

  // Default page load
  switchPage('home');
});
