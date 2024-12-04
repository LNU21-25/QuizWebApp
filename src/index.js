import './styles/main.css';
import { fetchQuestion } from './utils/api.js';
import Timer from './components/Timer.js';
import HighScore from './components/HighScore.js';
import Question from './components/Question.js';

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    const startGame = async () => {
        const questionData = await fetchQuestion(1);
        if (questionData) {
            Timer.init(app);
            Question.render(app, questionData, handleAnswer);
        }
    };

    const handleAnswer = (correct) => {
        if (correct) {
            // Fetch next question or end game
        } else {
            HighScore.render(app);
        }
    };

    startGame();
});
