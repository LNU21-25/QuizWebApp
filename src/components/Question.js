const Question = {
    render(container, questionData, onAnswer) {
      container.innerHTML = `
        <div class="question-box">
          <h2>${questionData.question}</h2>
          <form id="question-form">
            ${questionData.alternatives
              ? Object.entries(questionData.alternatives)
                  .map(
                    ([key, value]) =>
                      `<label><input type="radio" name="answer" value="${key}"> ${value}</label><br />`
                  )
                  .join('')
              : `<input type="text" id="answer" placeholder="Type your answer" />`}
            <button type="submit">Submit</button>
          </form>
        </div>
      `;
  
      const form = document.getElementById('question-form');
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const answer =
          document.querySelector('input[name="answer"]:checked')?.value ||
          document.getElementById('answer').value;
        onAnswer(answer === questionData.correct_answer); // Simulating answer validation
      });
    },
  };
  
  export default Question;
  