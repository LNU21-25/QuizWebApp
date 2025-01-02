export default class HighScore {
  constructor (nickname, score, time) {
    this.nickname = nickname
    this.score = score
    this.time = time
  }

  getHTML () {
    return `
        <li class="highscore-entry">
          <span class="nickname">${this.nickname}</span>
          <span class="score">${this.score}</span>
          <span class="time">${this.time}s</span>
        </li>
      `
  }
}
