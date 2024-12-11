export default class Timer {
  constructor(timeLimit) {
    this.timeLimit = parseInt(timeLimit, 10);
    this.remainingTime = this.timeLimit;
    this.intervalId = null;
  }

  start() {
    // Clear any existing interval to prevent multiple timers
    this.stop();

    // Start the countdown interval
    this.intervalId = setInterval(() => {
      this.remainingTime--;

      // Update the timer display
      this.updateDisplay();

      // Stop when time reaches zero (without any automatic action)
      if (this.remainingTime <= 0) {
        this.stop();
      }
    }, 1000);
  }

  stop() {
    // Clear the interval if it exists
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  updateDisplay() {
    const timerElement = document.getElementById('timer');
    if (timerElement) {
      // Format time as minutes:seconds
      const minutes = Math.floor(this.remainingTime / 60);
      const seconds = this.remainingTime % 60;
      timerElement.textContent = `Time left: ${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  }

  getHTML() {
    return `
      <div id="timer" class="timer">
        Time left: ${Math.floor(this.timeLimit / 60)}:${(this.timeLimit % 60).toString().padStart(2, '0')}
      </div>
    `;
  }

  // Manually reset the timer if needed
  reset() {
    this.stop();
    this.remainingTime = this.timeLimit;
    this.updateDisplay();
  }

  // Get the current remaining time
  getRemainingTime() {
    return this.remainingTime;
  }
}