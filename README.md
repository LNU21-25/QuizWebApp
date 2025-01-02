Add a representative image for the assignment and start with a short description of your solution.
![alt text](image.png)
My implementation takes advantage of the HTML heirarchy to switch out elements to navigate pages and display the correct information. I used 3 different pages like this. I also needed to implement objects that the pages could interact with for the Question, HighScore, and Timer. Finally the quiz uses and api call to get questions. The api keeps track of the current link, resets, and reports information back to the pages, and objects. 

Explain how a user can download and start your game.
clone the repo
navigate to the root (A2-Quiz)
run 'npm run server' in the terminal to start the application and open it in the browser through the defined port.

Shortly explain the rules of the game, so the user knows how to play it.
Give a nickname, start, answer questions within the time, score is calculated by time remaining*10 for each correctly answered question. 

Explain how to execute the linters that are part of the development environment and how to execute them.
run 'npm run lint'