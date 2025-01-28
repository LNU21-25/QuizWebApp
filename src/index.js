import { initializeTitle } from './modules/title.js'
import { initializeQuiz } from './modules/quiz.js'
import { initializeScores } from './modules/scores.js'

console.log('Initializing app...')

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded.')

  // Initialize sections
  initializeTitle()
  initializeQuiz()
  initializeScores()

  // Add navbar scroll functionality
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault()
      const section = document.querySelector(link.getAttribute('href'))
      section.scrollIntoView({ behavior: 'smooth' })
      console.log(`Scrolled to ${link.getAttribute('href')}`)
    })
  })
})
