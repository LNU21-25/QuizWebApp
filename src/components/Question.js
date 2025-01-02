import Timer from '../components/Timer.js'

export default class Question {
  constructor (questionData, onTimerExpire) {
    this.id = questionData.id
    this.questionText = questionData.question
    this.message = questionData.message
    this.onTimerExpire = onTimerExpire
    const timeLimit = questionData.limit ?? 15
    this.timer = new Timer(timeLimit)
    this.alternatives = questionData.alternatives || null
  }

  getHTML () {
    // Check if alternatives exist (multiple-choice)
    if (this.alternatives) {
      return this.getMultipleChoiceHTML()
    }

    // Default to open-answer question
    return this.getOpenAnswerHTML()
  }

  getOpenAnswerHTML () {
    return `
      <div class="question-container">
        ${this.timer.getHTML()}
        <h2 class="question-text">${this.questionText}</h2>
        <input 
          type="text" 
          id="answer-input" 
          class="answer-input" 
          placeholder="Type your answer here"
        >
        <button id="submit-answer" class="submit-btn">Submit Answer</button>
      </div>
    `
  }

  getMultipleChoiceHTML () {
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
      `).join('')

    return `
      <div class="question-container">
        ${this.timer.getHTML()}
        <h2 class="question-text">${this.questionText}</h2>
        <form class="choices-container" id="multiple-choice-form">
          ${choiceInputs}
          <button type="submit" id="submit-answer" class="submit-btn">Submit Answer</button>
        </form>
      </div>
    `
  }

  // Method to start the timer
  startTimer () {
    this.timer.start()
    const checkTimer = setInterval(() => {
      if (this.timer.getRemainingTime() <= 0) {
        clearInterval(checkTimer)
        if (this.onTimerExpire) {
          this.onTimerExpire()
        }
      }
    }, 1000)
  }

  // Method to stop the timer
  stopTimer () {
    this.timer.stop()
  }

  // Method to get remaining time
  getRemainingTime () {
    return this.timer.getRemainingTime()
  }
}
