import API from "../utils/api.js";

const Question = {
  async render(container, questionData, onNext) {
    container.innerHTML = `
      <div class="question-box">
        <h2>${questionData.question}</h2>
        <form id="question-form">
          ${
            questionData.alternatives
              ? Object.entries(questionData.alternatives)
                  .map(
                    ([key, value]) =>
                      `<label><input type="radio" name="answer" value="${key}"> ${value}</label><br />`
                  )
                  .join("")
              : `<input type="text" id="answer" placeholder="Type your answer" required />`
          }
          <button type="submit">Submit</button>
        </form>
      </div>
    `;

    const form = document.getElementById("question-form");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      // Retrieve the user's answer
      const answer =
        document.querySelector('input[name="answer"]:checked')?.value ||
        document.getElementById("answer").value;

      if (!answer) {
        alert("Please provide an answer before submitting.");
        return;
      }

      try {
        // Submit the answer and fetch the next question
        const nextQuestion = await API.submitAnswer(
          questionData.nextURL,
          answer
        );

        if (nextQuestion.nextURL) {
          // Continue to the next question
          onNext(nextQuestion);
        } else {
          // Quiz is over
          container.innerHTML = `
            <div class="question-box">
              <h2>Quiz Complete!</h2>
              <p>Thank you for participating. Your quiz is over.</p>
            </div>
          `;
        }
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    });
  },
};

export default Question;
