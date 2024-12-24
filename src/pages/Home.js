export default function renderHome(container) {
  container.innerHTML = `
    <div class="background">
      <div class="center-box">
        <h1>Welcome to the Quiz Game</h1>
        <p>Challenge yourself with our exciting quiz!</p>
        <input type="text" id="nickname" placeholder="Enter your nickname" required>
        <button id="start-quiz">Start Quiz</button>
      </div>
    </div>
  `;

  document.getElementById('start-quiz').addEventListener('click', () => {
    const nickname = document.getElementById('nickname').value.trim();
    if (!nickname) {
      alert('Please enter a nickname to start!');
      return;
    }

    // Navigate to the quiz page with the nickname
    const event = new CustomEvent('navigate', {
      detail: { page: 'quiz', nickname },
    });
    window.dispatchEvent(event);
  });
}