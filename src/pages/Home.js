export default function renderHome(container) {
  container.innerHTML = `
    <div class="background">
      <div class="center-box">
        <h1>Welcome to the Quiz Game</h1>
        <p>Challenge yourself with our exciting quiz!</p>
        <button id="start-quiz">Start Quiz</button>
      </div>
    </div>
  `;

  // Add event listener to the button
  document.getElementById('start-quiz').addEventListener('click', () => {
    const event = new CustomEvent('navigate', { detail: { page: 'quiz' } });
    window.dispatchEvent(event);
  });
}
