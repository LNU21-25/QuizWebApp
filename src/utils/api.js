const API_BASE_URL = "https://courselab.lnu.se/quiz/question/";

const API = {
  async fetchQuestion(questionId = 1) {
    const response = await fetch(`${API_BASE_URL}${questionId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch question: ${response.statusText}`);
    }
    return response.json();
  },

  async submitAnswer(answerUrl, answer) {
    const response = await fetch(answerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answer }),
    });
    if (!response.ok) {
      throw new Error(`Failed to submit answer: ${response.statusText}`);
    }
    return response.json();
  },
};

export default API;