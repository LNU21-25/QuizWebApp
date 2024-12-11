class Timer {
    constructor(limit) {
      this.time = parseInt(limit, 10);
      this.interval = null;
      this.container = document.createElement("div");
      this.container.className = "timer";
      this.updateHTML();
    }
  
    updateHTML() {
      this.container.textContent = `Time: ${this.time}s`;
    }
  
    start(onEnd) {
      this.updateHTML();
      this.interval = setInterval(() => {
        this.time -= 1;
        this.updateHTML();
        if (this.time <= 0) {
          this.stop();
          onEnd(); // Call the provided onEnd callback when time is up
        }
      }, 1000);
    }
  
    stop() {
      clearInterval(this.interval);
    }
  
    interrupt() {
      this.stop();
      this.container.textContent = "Timer interrupted.";
    }
  
    getHTML() {
      return this.container;
    }
  }
  
  export default Timer;
  