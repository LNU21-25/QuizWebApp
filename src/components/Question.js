export default class Question {
  constructor(questionData) {
    this.id = questionData.id;
    this.questionText = questionData.question;
    this.timeLimit = questionData.limit;
    this.message = questionData.message;
    
    // Handle optional alternatives for multiple-choice
    this.alternatives = questionData.alternatives || null;
  }

  getHTML() {
    // Check if alternatives exist (multiple-choice)
    if (this.alternatives) {
      return this.getMultipleChoiceHTML();
    }
    
    // Default to open-answer question
    return this.getOpenAnswerHTML();
  }

  getOpenAnswerHTML() {
    return `
      <div class="question-container">
        <h2 class="question-text">${this.questionText}</h2>
        <input 
          type="text" 
          id="answer-input" 
          class="answer-input" 
          placeholder="Type your answer here"
        >
        <button id="submit-answer" class="submit-btn">Submit Answer</button>
      </div>
    `;
  }

  getMultipleChoiceHTML() {
    // Generate radio buttons from alternatives
    const choiceInputs = Object.entries(this.alternatives)
      .map(([key, value]) => `
        <div class="choice-option">
          <input 
            type="radio" 
            id="choice-${key}" 
            name="question-choice" 
            value="${key}"
            class="choice-radio"
          >
          <label for="choice-${key}">${value}</label>
        </div>
      `).join('');

    return `
      <div class="question-container">
        <h2 class="question-text">${this.questionText}</h2>
        <form class="choices-container" id="multiple-choice-form">
          ${choiceInputs}
          <button type="submit" id="submit-answer" class="submit-btn">Submit Answer</button>
        </form>
      </div>
    `;
  }
}