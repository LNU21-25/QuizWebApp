/**
 * Initializes the scores section of the
 */
export function initializeScores () {
  console.log('Initializing scores section...')

  const scoresDiv = document.getElementById('leaderboard')

  scoresDiv.innerHTML = `
      <h2>High Scores</h2>
      <ul id="high-scores"></ul>
    `

  const highScores = JSON.parse(localStorage.getItem('highScores')) || []
  const highScoresList = document.getElementById('high-scores')

  highScores.forEach((score, index) => {
    const li = document.createElement('li')
    li.textContent = `#${index + 1}: ${score.nickname} - ${score.time}s`
    highScoresList.appendChild(li)
  })

  console.log('High scores loaded.')
}

/**
 * Saves the high score to local storage.
 * @param {string} nickname The player's nickname.
 * @param {number} score The player's score.
 */
export function saveHighScore (nickname, score) {
  let highScores = JSON.parse(localStorage.getItem('highScores')) || []

  highScores.push({ nickname, score })

  // Sort by highest score and keep only the top 5
  highScores.sort((a, b) => b.score - a.score)
  highScores = highScores.slice(0, 5)

  localStorage.setItem('highScores', JSON.stringify(highScores))
  updateLeaderboard()
}

/**
 * Updates the leaderboard with the current high scores.
 */
export function updateLeaderboard () {
  const highScores = JSON.parse(localStorage.getItem('highScores')) || []
  const highScoresList = document.getElementById('high-scores')

  highScoresList.innerHTML = ''
  highScores.forEach((entry, index) => {
    const li = document.createElement('li')
    li.textContent = `#${index + 1}: ${entry.nickname} - ${entry.score}`
    highScoresList.appendChild(li)
  })
}
