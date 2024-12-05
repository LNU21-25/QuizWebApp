// Import your modules for each section
import renderHome from './pages/Home.js';
import renderQuiz from './pages/Quiz.js';
import renderLeaderboard from './pages/LeaderBoard.js';

// Map the pages to their render functions
const pages = {
  home: renderHome,
  quiz: renderQuiz,
  leaderboard: renderLeaderboard,
};

// Function to switch the content
const switchPage = (page) => {
  const content = document.getElementById('content');
  content.innerHTML = ''; // Clear existing content
  if (pages[page]) {
    pages[page](content); // Render new content into the main element
  }
};

// Listen for navigation events
window.addEventListener('navigate', (event) => {
  switchPage(event.detail.page);
});

// Set up event listeners for navigation
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
