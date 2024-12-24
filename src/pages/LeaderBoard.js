import HighScore from '../components/HighScore.js';
import api from '../utils/api.js';

let leaderboard = []; // Stores up to 10 high scores

export default function renderLeaderboard(container) {
  // Sort leaderboard by score in descending order
  leaderboard.sort((a, b) => b.score - a.score);

  // Generate HTML for all high scores
  const highScoresHTML = leaderboard.map((entry) => entry.getHTML()).join('');

  container.innerHTML = `
    <div class="leaderboard">
      <h2>Leaderboard</h2>
      <ul class="highscore-list">
        ${highScoresHTML}
      </ul>
      <button id="restart-quiz">Restart Quiz</button>
    </div>
  `;

  document.getElementById('restart-quiz').addEventListener('click', async () => {
    try {
      await api.resetQuiz(); // Add this method to your API class
      const event = new CustomEvent('navigate', { detail: { page: 'home' } });
      window.dispatchEvent(event);
    } catch (error) {
      console.error('Failed to reset quiz:', error);
    }
  });
}

export function addHighScore(highScore) {
  leaderboard.push(highScore);

  // Ensure leaderboard only keeps the top 10 scores
  leaderboard = leaderboard
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
}
