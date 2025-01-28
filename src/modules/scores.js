/**
 *
 */
export function initializeScores () {
  console.log('Initializing scores section...')

  const scoresDiv = document.getElementById('scores')

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
