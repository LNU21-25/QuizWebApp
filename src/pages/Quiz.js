import Question from "../components/Question.js";
import API from "../utils/api.js";

export default async function renderQuiz(container) {
  container.innerHTML = `
    <div class="background">
      <div class="center-box">
        <div id="quiz-content"></div>
      </div>
    </div>
  `;

  const quizContent = document.getElementById("quiz-content");

  try {
    // Fetch the first question
    const firstQuestion = await API.fetchQuestion();

    // Render the first question
    Question.render(quizContent, firstQuestion, (nextQuestion) => {
      // Render the next question when the user submits an answer
      Question.render(quizContent, nextQuestion, (subsequentQuestion) =>
        Question.render(quizContent, subsequentQuestion)
      );
    });
  } catch (error) {
    quizContent.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}
