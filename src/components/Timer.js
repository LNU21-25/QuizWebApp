const Timer = {
    interval: null,
    time: 10,
    container: null,

    init(container) {
        this.container = document.createElement('div');
        this.container.id = 'timer';
        container.appendChild(this.container);
        this.start();
    },

    start() {
        this.time = 10;
        this.container.textContent = `Time: ${this.time}s`;
        this.interval = setInterval(() => {
            this.time -= 1;
            this.container.textContent = `Time: ${this.time}s`;
            if (this.time <= 0) this.stop();
        }, 1000);
    },

    stop() {
        clearInterval(this.interval);
        alert('Time is up!');
    }
};

export default Timer;
