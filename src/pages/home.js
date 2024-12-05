/**
 * Renders the home page
 * @param {HTMLElement} container - The container to render the home page in
 */
export function renderHomePage(container) {
    container.innerHTML = `
        <div class="game-box home-page">
            <h2>Welcome to Quiz Master</h2>
            <p>Test your knowledge and challenge yourself!</p>
            <p>Rules:</p>
            <ul>
                <li>You have 10 seconds to answer each question</li>
                <li>Answer correctly to progress</li>
                <li>Wrong answer or time running out ends the game</li>
            </ul>
            <button id="start-quiz-btn" class="submit-btn">Start Quiz</button>
        </div>
    `;

    // Add event listener to start quiz
    document.getElementById('start-quiz-btn')?.addEventListener('click', () => {
        // This will be handled by the main routing logic in index.js
        document.querySelector('[data-page="quiz"]').click();
    });
}