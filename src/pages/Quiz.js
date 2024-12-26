import API from "../utils/api.js";
import Question from "../components/Question.js";
import { addHighScore } from "/pages/Leaderboard.js";
import renderLeaderboard from "/pages/Leaderboard.js";
import HighScore from "../components/HighScore.js";

export default async function renderQuiz(container, nickname) {
  let score = 0;
  let currentNickname = nickname;
  let currentQuestion = null;

  container.innerHTML = `
    <div class="background">
      <div class="center-box">
        <div id="quiz-content"></div>
        <div id="score-display">Score: 0</div>
      </div>
    </div>
  `;

  const quizContent = document.getElementById("quiz-content");
  const scoreDisplay = document.getElementById("score-display");

  async function loadNextQuestion() {
    try {
      const questionData = await API.fetchQuestion();
      currentQuestion = new Question(questionData, () => {
        finishQuiz();
      });

      quizContent.innerHTML = currentQuestion.getHTML();
      currentQuestion.startTimer();
      setupAnswerSubmission(currentQuestion);
    } catch (error) {
      console.error("Error loading question:", error);
      quizContent.innerHTML = `<p>Error loading question. Please try again.</p>`;
    }
  }

  function setupAnswerSubmission(currentQuestion) {
    const submitBtn = document.getElementById("submit-answer");
    const answerInput = document.getElementById("answer-input");
    const multipleChoiceForm = document.getElementById("multiple-choice-form");

    if (submitBtn && answerInput) {
      submitBtn.addEventListener("click", async () => {
        currentQuestion.stopTimer();
        await submitAnswer(currentQuestion, answerInput.value);
      });
    }

    if (multipleChoiceForm) {
      multipleChoiceForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const selectedRadio = document.querySelector('input[name="question-choice"]:checked');
        currentQuestion.stopTimer();

        if (selectedRadio) {
          await submitAnswer(currentQuestion, selectedRadio.value);
        } else {
          alert("Please select an answer.");
          currentQuestion.startTimer();
        }
      });
    }
  }

  async function submitAnswer(currentQuestion, answer) {
    try {
      const response = await API.submitAnswer(answer);

      const timeLeft = currentQuestion.getRemainingTime();
      score += timeLeft * 10;
      scoreDisplay.textContent = `Score: ${score}`;
      await loadNextQuestion();
    } catch (error) {
      console.error("Error submitting answer:", error);
      quizContent.innerHTML = `
        <div class="failed-message">
          <h2>Incorrect Answer</h2>
          <p>"Better luck next time!"}</p>
        </div>
      `;

      // Wait for 2 seconds before navigating to the leaderboard
      setTimeout(() => {
        finishQuiz();
      }, 1000);
    }
  }

  function finishQuiz() {
    if (currentQuestion) {
      currentQuestion.stopTimer();
    }
    
    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleString();
    addHighScore(new HighScore(currentNickname, score, formattedTime));
    renderLeaderboard(container);
  }

  await loadNextQuestion();
}


