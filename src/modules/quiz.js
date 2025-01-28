import { API } from './utils/api.js'

/**
 * Initializes the quiz section UI.
 */
export function initializeQuiz () {
  console.log('Initializing quiz section...')

  const quizDiv = document.getElementById('quiz')

  quizDiv.innerHTML = `
    <h2>Quiz</h2>
    <div id="question-container"></div>
    <p id="timer"></p>
  `
}

/**
 * Starts the quiz for the given nickname.
 * @param {string} nickname - The player's nickname.
 */
export function startQuiz (nickname) {
  console.log(`Starting quiz for ${nickname}`)

  const api = new API()
  const questionContainer = document.getElementById('question-container')
  const timerElement = document.getElementById('timer')

  let currentQuestion = null
  let timer = null

  /**
   * Loads the next question from the API.
   */
  async function loadQuestion () {
    try {
      currentQuestion = await api.fetchQuestion()
      questionContainer.innerHTML = ''
      questionContainer.appendChild(currentQuestion.renderHTML())

      // Add event listener to submit button
      const submitButton = document.getElementById('submit-answer')
      if (submitButton) {
        submitButton.addEventListener('click', submitAnswer)
      }

      startTimer(currentQuestion.limit)
    } catch (error) {
      console.error('Error loading question:', error)
      questionContainer.textContent = 'Failed to load the question. Please try again later.'
    }
  }

  /**
   * Starts the timer for the current question.
   * @param {number} limit - Time limit in seconds.
   */
  function startTimer (limit) {
    console.log(`Starting timer with ${limit} seconds.`)
    let timeRemaining = limit

    timerElement.textContent = `Time remaining: ${timeRemaining}s`
    timer = setInterval(() => {
      timeRemaining--
      timerElement.textContent = `Time remaining: ${timeRemaining}s`
      if (timeRemaining <= 0) {
        clearInterval(timer)
        console.log('Time is up!')
        endGame('Time is up!')
      }
    }, 1000)
  }

  /**
   * Submits the user's answer to the API.
   */
  async function submitAnswer () {
    const answer = document.querySelector('input[name="answer"]:checked')?.value || document.getElementById('answer')?.value

    if (!answer) {
      alert('Please provide an answer.')
      console.log('No answer provided.')
      return
    }

    console.log('Submitting answer:', answer)

    clearInterval(timer)
    try {
      const data = await api.submitAnswer(answer, currentQuestion.nextURL)
      if (data.nextURL) {
        api.currentURL = data.nextURL
        loadQuestion()
      } else {
        endGame('Congratulations, you completed the quiz!')
      }
    } catch (error) {
      console.error('Error submitting answer:', error)
      endGame('An error occurred while submitting your answer.')
    }
  }

  /**
   * Ends the game with a given message.
   * @param {string} message - The message to display at the end of the game.
   */
  function endGame (message) {
    questionContainer.textContent = message
    const restartButton = document.createElement('button')
    restartButton.textContent = 'Restart Quiz'
    restartButton.addEventListener('click', () => location.reload())
    questionContainer.appendChild(restartButton)
    console.log('Game over:', message)
  }

  loadQuestion()
}
