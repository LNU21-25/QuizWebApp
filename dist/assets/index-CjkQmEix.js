(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();function E(i){i.innerHTML=`
    <div class="background">
      <div class="center-box">
        <h1>Welcome to the Quiz Game</h1>
        <p>Challenge yourself with our exciting quiz!</p>
        <input type="text" id="nickname" placeholder="Enter your nickname" required>
        <button id="start-quiz">Start Quiz</button>
      </div>
    </div>
  `,document.getElementById("start-quiz").addEventListener("click",()=>{const e=document.getElementById("nickname").value.trim();if(!e){alert("Please enter a nickname to start!");return}const t=new CustomEvent("navigate",{detail:{page:"quiz",nickname:e}});window.dispatchEvent(t)})}const T="https://courselab.lnu.se/quiz/question/1",h={currentURL:T,resetQuiz(){return this.currentURL=T,Promise.resolve()},async fetchQuestion(){console.log("Fetching question from API..."),console.log(`Request URL: ${this.currentURL}`);try{const i=await fetch(this.currentURL);if(!i.ok)throw new Error(`Failed to fetch question: ${i.statusText}`);const e=await i.json();return e.nextURL&&(this.currentURL=e.nextURL),console.log("Question data:",e),e}catch(i){throw console.error(`Error during fetchQuestion: ${i.message}`),i}},async submitAnswer(i){console.log("Submitting answer to API..."),console.log(`Request URL: ${this.currentURL}`);try{const e=await fetch(this.currentURL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({answer:i})});if(!e.ok)throw new Error(`Failed to submit answer: ${e.statusText}`);const t=await e.json();return console.log("Response data:",t),t.nextURL&&(this.currentURL=t.nextURL),t}catch(e){throw console.error(`Error during submitAnswer: ${e.message}`),e}}};class q{constructor(e){this.timeLimit=parseInt(e,10),this.remainingTime=this.timeLimit,this.intervalId=null}start(){this.stop(),this.intervalId=setInterval(()=>{this.remainingTime--,this.updateDisplay(),this.remainingTime<=0&&this.stop()},1e3)}stop(){this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null)}updateDisplay(){const e=document.getElementById("timer");if(e){const t=Math.floor(this.remainingTime/60),s=this.remainingTime%60;e.textContent=`Time left: ${t}:${s.toString().padStart(2,"0")}`}}getHTML(){return`
      <div id="timer" class="timer">
        Time left: ${Math.floor(this.timeLimit/60)}:${(this.timeLimit%60).toString().padStart(2,"0")}
      </div>
    `}reset(){this.stop(),this.remainingTime=this.timeLimit,this.updateDisplay()}getRemainingTime(){return this.remainingTime}}class I{constructor(e,t){this.id=e.id,this.questionText=e.question,this.message=e.message,this.onTimerExpire=t;const s=e.limit??15;this.timer=new q(s),this.alternatives=e.alternatives||null}getHTML(){return this.alternatives?this.getMultipleChoiceHTML():this.getOpenAnswerHTML()}getOpenAnswerHTML(){return`
      <div class="question-container">
        ${this.timer.getHTML()}
        <h2 class="question-text">${this.questionText}</h2>
        <input 
          type="text" 
          id="answer-input" 
          class="answer-input" 
          placeholder="Type your answer here"
        >
        <button id="submit-answer" class="submit-btn">Submit Answer</button>
      </div>
    `}getMultipleChoiceHTML(){const e=Object.entries(this.alternatives).map(([t,s])=>`
        <div class="choice-option">
          <input 
            type="radio" 
            id="choice-${t}" 
            name="question-choice" 
            value="${t}"
            class="choice-radio"
          >
          <label for="choice-${t}">${s}</label>
        </div>
      `).join("");return`
      <div class="question-container">
        ${this.timer.getHTML()}
        <h2 class="question-text">${this.questionText}</h2>
        <form class="choices-container" id="multiple-choice-form">
          ${e}
          <button type="submit" id="submit-answer" class="submit-btn">Submit Answer</button>
        </form>
      </div>
    `}startTimer(){this.timer.start();const e=setInterval(()=>{this.timer.getRemainingTime()<=0&&(clearInterval(e),this.onTimerExpire&&this.onTimerExpire())},1e3)}stopTimer(){this.timer.stop()}getRemainingTime(){return this.timer.getRemainingTime()}}class M{constructor(e,t,s){this.nickname=e,this.score=t,this.time=s}getHTML(){return`
        <li class="highscore-entry">
          <span class="nickname">${this.nickname}</span>
          <span class="score">${this.score}</span>
          <span class="time">${this.time}s</span>
        </li>
      `}}let u=[];function w(i){u.sort((t,s)=>s.score-t.score);const e=u.map(t=>t.getHTML()).join("");i.innerHTML=`
    <div class="leaderboard">
      <h2>Leaderboard</h2>
      <ul class="highscore-list">
        ${e}
      </ul>
      <button id="restart-quiz">Restart Quiz</button>
    </div>
  `,document.getElementById("restart-quiz").addEventListener("click",async()=>{try{await h.resetQuiz();const t=new CustomEvent("navigate",{detail:{page:"home"}});window.dispatchEvent(t)}catch(t){console.error("Failed to reset quiz:",t)}})}function R(i){u.push(i),u=u.sort((e,t)=>t.score-e.score).slice(0,10)}async function $(i,e){let t=0,s=e,n=null;i.innerHTML=`
    <div class="background">
      <div class="center-box">
        <div id="quiz-content"></div>
        <div id="score-display">Score: 0</div>
      </div>
    </div>
  `;const r=document.getElementById("quiz-content"),c=document.getElementById("score-display");async function p(){try{const o=await h.fetchQuestion();n=new I(o,()=>{f()}),r.innerHTML=n.getHTML(),n.startTimer(),y(n)}catch(o){console.error("Error loading question:",o),r.innerHTML="<p>Error loading question. Please try again.</p>"}}function y(o){const a=document.getElementById("submit-answer"),l=document.getElementById("answer-input"),m=document.getElementById("multiple-choice-form");a&&l&&a.addEventListener("click",async()=>{o.stopTimer(),await g(o,l.value)}),m&&m.addEventListener("submit",async b=>{b.preventDefault();const v=document.querySelector('input[name="question-choice"]:checked');o.stopTimer(),v?await g(o,v.value):(alert("Please select an answer."),o.startTimer())})}async function g(o,a){try{const l=await h.submitAnswer(a),m=o.getRemainingTime();t+=m*10,c.textContent=`Score: ${t}`,await p()}catch(l){console.error("Error submitting answer:",l),r.innerHTML=`
        <div class="failed-message">
          <h2>Incorrect Answer</h2>
          <p>"Better luck next time!"}</p>
        </div>
      `,setTimeout(()=>{f()},1e3)}}function f(){n&&n.stopTimer();const a=new Date().toLocaleString();R(new M(s,t,a)),w(i)}await p()}const d={home:E,quiz:$,leaderboard:w},L=(i,e={})=>{const t=document.getElementById("content");t.innerHTML="",d[i]&&(i==="quiz"?d[i](t,e.nickname):d[i](t))};window.addEventListener("navigate",i=>{L(i.detail.page,i.detail)});document.addEventListener("DOMContentLoaded",()=>{document.getElementById("navbar").addEventListener("click",e=>{if(e.target.tagName==="BUTTON"){const t=e.target.getAttribute("data-page"),s=new CustomEvent("navigate",{detail:{page:t}});window.dispatchEvent(s)}}),L("home")});
