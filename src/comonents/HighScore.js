const HighScore = {
    render(container) {
        container.innerHTML = `
            <h2>High Scores</h2>
            <ul id="high-scores"></ul>
            <button id="restart">Restart</button>
        `;

        document.getElementById('restart').addEventListener('click', () => {
            location.reload();
        });
    }
};

export default HighScore;
