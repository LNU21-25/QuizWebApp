const Question = {
    render(container, questionData, onAnswer) {
        container.innerHTML = '';
        const questionEl = document.createElement('div');
        questionEl.innerHTML = `
            <h2>${questionData.question}</h2>
            ${questionData.alternatives ? Object.entries(questionData.alternatives)
                .map(([key, value]) => `<label><input type="radio" name="answer" value="${key}">${value}</label>`).join('') :
                `<input type="text" id="answer" />`}
            <button id="submit">Submit</button>
        `;
        container.appendChild(questionEl);

        document.getElementById('submit').addEventListener('click', () => {
            const answer = document.querySelector('input[name="answer"]:checked')?.value || document.getElementById('answer').value;
            onAnswer(answer === questionData.correct_answer); // Simulating answer validation
        });
    }
};

export default Question;
