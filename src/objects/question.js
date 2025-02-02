/**
 * Represents a question object
 * @typedef {object} QuestionData
 * @property {number} id - The ID of the question
 * @property {string} question - The text of the question
 * @property {number} [limit=15] - The time limit for the question
 * @property {string} nextURL - The URL for the next question
 * @property {object|null} [alternatives=null] - The alternatives for the question
 * @property {string} message - The message for the question
 */
export class Question {
  constructor (data) {
    this.id = data.id
    this.questionText = data.question
    this.limit = data.limit || 15
    this.nextURL = data.nextURL
    this.alternatives = data.alternatives || null
    this.message = data.message
  }

  /**
   * Renders the question HTML
   * @returns {HTMLDivElement} The question container
   */
  renderHTML () {
    const container = document.createElement('div')
    container.innerHTML = `<p>${this.questionText}</p>`

    if (this.alternatives) {
      const options = document.createElement('div')
      for (const [key, value] of Object.entries(this.alternatives)) {
        options.innerHTML += `
            <label>
              <input type="radio" name="answer" value="${key}">
              ${value}
            </label><br>`
      }
      container.appendChild(options)
    } else {
      container.innerHTML += '<input type="text" id="answer">'
    }

    const submitButton = document.createElement('button')
    submitButton.id = 'submit-answer'
    submitButton.textContent = 'Submit Answer'
    container.appendChild(submitButton)

    return container
  }
}
