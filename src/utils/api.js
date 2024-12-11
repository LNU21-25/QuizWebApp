const API_BASE_URL = "https://courselab.lnu.se/quiz/question/1";

const API = {
  currentURL: API_BASE_URL,

  async fetchQuestion() {
    console.log(`Fetching question from API...`);
    console.log(`Request URL: ${this.currentURL}`);

    try {
      const response = await fetch(this.currentURL);

      if (!response.ok) {
        throw new Error(`Failed to fetch question: ${response.statusText}`);
      }

      const questionData = await response.json();
      
      // Update the current URL for the next question submission
      if (questionData.nextURL) {
        this.currentURL = questionData.nextURL;
      }

      console.log(`Question data:`, questionData);
      return questionData;
    } catch (error) {
      console.error(`Error during fetchQuestion: ${error.message}`);
      throw error;
    }
  },

  async submitAnswer(answer) {
    console.log(`Submitting answer to API...`);
    console.log(`Request URL: ${this.currentURL}`);

    try {
      const response = await fetch(this.currentURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answer }),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit answer: ${response.statusText}`);
      }

      const responseData = await response.json();
      
      // Update the current URL for the next question
      if (responseData.nextURL) {
        this.currentURL = responseData.nextURL;
      }

      console.log(`Response data:`, responseData);
      return responseData;
    } catch (error) {
      console.error(`Error during submitAnswer: ${error.message}`);
      throw error;
    }
  },
};

export default API;