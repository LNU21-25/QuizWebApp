import API from "../utils/api.js";
import Question from "../components/Question.js";

export default async function renderQuiz(container) {
  // Set up the quiz container
  container.innerHTML = `
    <div class="background">
      <div class="center-box">
        <div id="quiz-content"></div>
      </div>
    </div>
  `;

  const quizContent = document.getElementById("quiz-content");
  let currentQuestion = null;

  async function loadNextQuestion() {
    try {
      // Fetch the next question data from the API
      const questionData = await API.fetchQuestion();
      
      // Create a new Question object
      currentQuestion = new Question(questionData);

      // Render the question's HTML in the container
      quizContent.innerHTML = currentQuestion.getHTML();

      // Set up answer submission
      setupAnswerSubmission();
    } catch (error) {
      console.error("Error loading question:", error);
      quizContent.innerHTML = `<p>Error loading question. Please try again.</p>`;
    }
  }

  function setupAnswerSubmission() {
    const submitBtn = document.getElementById("submit-answer");
    const answerInput = document.getElementById("answer-input");
    const multipleChoiceForm = document.getElementById("multiple-choice-form");

    // For open-answer questions
    if (submitBtn && answerInput) {
      submitBtn.addEventListener("click", () => submitAnswer(answerInput.value));
    }

    // For multiple-choice questions
    if (multipleChoiceForm) {
      multipleChoiceForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const selectedRadio = document.querySelector('input[name="question-choice"]:checked');
        if (selectedRadio) {
          submitAnswer(selectedRadio.value);
        } else {
          alert("Please select an answer");
        }
      });
    }
  }

  async function submitAnswer(answer) {
    try {
      // Submit the answer using the current API URL
      const response = await API.submitAnswer(answer);
      
      // Check response and load next question or handle end of quiz
      await loadNextQuestion();
    } catch (error) {
      console.error("Error submitting answer:", error);
      quizContent.innerHTML = `<p>Error submitting answer. Please try again.</p>`;
    }
  }

  // Start the quiz by loading the first question
  await loadNextQuestion();
}