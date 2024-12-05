/**
 * API module for handling quiz application communication with the server
 */
export class QuizAPI {
    /**
     * Fetch the initial or next question from the server
     * @param {string|number} [id=1] - The question ID to fetch
     * @returns {Promise<Object>} The question data from the server
     */
    static async fetchQuestion(id = 1) {
      try {
        const response = await fetch(`https://courselab.lnu.se/quiz/question/${id}`);
        if (!response.ok) throw new Error('Failed to fetch question');
        return await response.json();
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    }
  
    /**
     * Submit an answer to the server for validation
     * @param {Object} questionData - The current question's data
     * @param {string} answer - The user's answer to submit
     * @returns {Promise<Object>} The server's response to the answer
     */
    static async submitAnswer(questionData, answer) {
      if (!questionData || !questionData.nextURL) {
        throw new Error('Invalid question data');
      }
  
      try {
        const response = await fetch(questionData.nextURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ answer })
        });
  
        if (!response.ok) throw new Error('Failed to submit answer');
        return await response.json();
      } catch (error) {
        console.error('Answer Submission Error:', error);
        throw error;
      }
    }
  
    /**
     * Save high score to local storage
     * @param {string} nickname - Player's nickname
     * @param {number} totalTime - Total time taken to complete the quiz
     */
    static saveHighScore(nickname, totalTime) {
      const highScores = JSON.parse(localStorage.getItem('quizHighScores') || '[]');
      
      // Add new high score
      highScores.push({ nickname, time: totalTime });
      
      // Sort by time (ascending)
      const sortedHighScores = highScores
        .sort((a, b) => a.time - b.time)
        .slice(0, 5); // Keep top 5
      
      localStorage.setItem('quizHighScores', JSON.stringify(sortedHighScores));
    }
  
    /**
     * Retrieve high scores from local storage
     * @returns {Array} Array of top high scores
     */
    static getHighScores() {
      return JSON.parse(localStorage.getItem('quizHighScores') || '[]');
    }
  }
  
  // Export individual functions for compatibility with existing code
  export const fetchQuestion = QuizAPI.fetchQuestion;
  export const submitAnswer = QuizAPI.submitAnswer;
  export const saveHighScore = QuizAPI.saveHighScore;
  export const getHighScores = QuizAPI.getHighScores;