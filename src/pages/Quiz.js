import Question from '../components/Question.js';

export default function renderQuiz(container) {
  container.innerHTML = `
    <div class="background">
      <div class="center-box">
        <div id="quiz-content"></div>
      </div>
    </div>
  `;

  const quizContent = document.getElementById('quiz-content');

  // Example question data
  const questionData = {
    question: "What is the capital of France?",
    alternatives: { a: "Paris", b: "London", c: "Berlin", d: "Madrid" },
    correct_answer: "a",
  };

  // Handle answer submission
  const handleAnswer = (isCorrect) => {
    alert(isCorrect ? "Correct!" : "Incorrect. Try again!");
  };

  // Render the question component
  Question.render(quizContent, questionData, handleAnswer);
}
