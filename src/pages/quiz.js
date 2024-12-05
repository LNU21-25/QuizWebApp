import { QuizAPI } from '../utils/api.js';

/**
 * Render the quiz page
 * @param {HTMLElement} container - The container to render the quiz page in
 */
export async function renderQuizPage(container) {
    // Prompt for nickname
    const nickname = prompt('Enter your nickname:') || 'Anonymous';
    
    let currentQuestion = null;
    let startTime = Date.now();
    let totalGameTime = 0;

    /**
     * Initialize the timer
     * @param {number} seconds - Number of seconds for the timer
     */
    function initTimer(seconds) {
        // Clear any existing timer
        if (window.currentTimer) {
            clearInterval(window.currentTimer);
        }

        const timerEl = document.createElement('div');
        timerEl.classList.add('timer');
        container.querySelector('.game-box').prepend(timerEl);

        let timeLeft = seconds;
        window.currentTimer = setInterval(() => {
            timerEl.textContent = `Time left: ${timeLeft} seconds`;
            timeLeft--;

            if (timeLeft < 0) {
                endGame(false);
            }
        }, 1000);
    }

    /**
     * End the game
     * @param {boolean} won - Whether the player won or lost
     */
    function endGame(won) {
        // Clear timer
        if (window.currentTimer) {
            clearInterval(window.currentTimer);
        }

        // Calculate total game time
        totalGameTime = Math.round((Date.now() - startTime) / 1000);

        if (won) {
            container.innerHTML = `
                <div class="game-box">
                    <h2>Congratulations, ${nickname}!</h2>
                    <p>You completed the quiz in ${totalGameTime} seconds!</p>
                    <button id="save-score-btn" class="submit-btn">Save High Score</button>
                </div>
            `;

            // Add event listener to save high score
            document.getElementById('save-score-btn')?.addEventListener('click', () => {
                QuizAPI.saveHighScore(nickname, totalGameTime);
                // Navigate to leaderboard
                document.querySelector('[data-page="leaderboard"]').click();
            });
        } else {
            container.innerHTML = `
                <div class="game-box">
                    <h2>Game Over!</h2>
                    <p>You ran out of time or answered incorrectly.</p>
                    <button id="restart-btn" class="submit-btn">Restart Quiz</button>
                    <button id="leaderboard-btn" class="submit-btn">View Leaderboard</button>
                </div>
            `;

            // Add event listeners
            document.getElementById('restart-btn')?.addEventListener('click', () => {
                renderQuizPage(container);
            });

            document.getElementById('leaderboard-btn')?.addEventListener('click', () => {
                document.querySelector('[data-page="leaderboard"]').click();
            });
        }
    }

    /**
     * Render a question
     * @param {Object} questionData - The question data from the server
     */
    async function renderQuestion(questionData) {
        currentQuestion = questionData;

        // Create game box
        const gameBox = document.createElement('div');
        gameBox.classList.add('game-box');

        // Render question
        gameBox.innerHTML = `
            <div class="question">
                <h2>${questionData.question}</h2>
            </div>
            <div class="answers">
                ${questionData.alternatives 
                    ? Object.entries(questionData.alternatives)
                        .map(([key, value]) => `
                            <label>
                                <input type="radio" name="answer" value="${key}">
                                ${value}
                            </label>
                        `).join('')
                    : `<input type="text" id="text-answer" class="text-input">`
                }
            </div>
            <button id="submit-answer" class="submit-btn">Submit Answer</button>
        `;

        // Clear previous content and add new game box
        container.innerHTML = '';
        container.appendChild(gameBox);

        // Initialize timer
        initTimer(10);

        // Add submit answer event listener
        document.getElementById('submit-answer')?.addEventListener('click', async () => {
            // Get the answer
            const answer = questionData.alternatives 
                ? document.querySelector('input[name="answer"]:checked')?.value 
                : document.getElementById('text-answer')?.value;

            if (!answer) {
                alert('Please select an answer');
                return;
            }

            try {
                // Submit answer
                const response = await QuizAPI.submitAnswer(questionData, answer);

                // Check if correct
                if (response.nextURL) {
                    // Correct answer, fetch next question
                    const nextQuestion = await QuizAPI.fetchQuestion(response.nextURL);
                    renderQuestion(nextQuestion);
                } else {
                    // No next question means game is won
                    endGame(true);
                }
            } catch (error) {
                // Wrong answer or error
                endGame(false);
            }
        });
    }

    // Start the quiz with the first question
    try {
        const firstQuestion = await QuizAPI.fetchQuestion(1);
        renderQuestion(firstQuestion);
    } catch (error) {
        console.error('Failed to start quiz:', error);
        container.innerHTML = `
            <div class="game-box">
                <h2>Error</h2>
                <p>Failed to load quiz. Please try again later.</p>
            </div>
        `;
    }
}