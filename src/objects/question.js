export class Question {
  constructor (data) {
    this.id = data.id
    this.questionText = data.question
    this.limit = data.limit || 15
    this.nextURL = data.nextURL
    this.alternatives = data.alternatives || null
    this.message = data.message
  }

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
            </label>
          `
      }
      container.appendChild(options)
    } else {
      const input = document.createElement('input')
      input.type = 'text'
      input.id = 'answer'
      input.placeholder = 'Type your answer'
      container.appendChild(input)
    }

    return container
  }
}
