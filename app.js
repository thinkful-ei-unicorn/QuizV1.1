/**
 * store structure
 */
'use strict';

const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'what year was bitcoin invented?',
      answers: [
        '200 B.C.',
        '1980',
        '100000 in the future',
        '2008'
      ],
      correctAnswer: '2008'
    },
    {
      question: 'Approximately how many bitcoins will be minted in total?',
      answers: [
        '1 bitcoin',
        '6000',
        '10 billion but only on the dark web',
        '21 million'
      ],
      correctAnswer: '21 million'
    },
    {
      question: 'What is a smart contract?',
      answers: [
        'Smart contracts are self-executing contracts with the terms of the agreement between buyer and seller being directly written into lines of code.',
        'a contract that gives you paper cuts',
        'an agreement that got a college degree',
        'a contract that can beat you at video games'
      ],
      correctAnswer: 'Smart contracts are self-executing contracts with the terms of the agreement between buyer and seller being directly written into lines of code.'
    },
    {
      question: 'who controlls blockchain/bitcoin?',
      answers: [
        'Secret cartel of bankers',
        'Nobody, its decentralized!',
        'the president of the EU',
        'Your local pawnshop'
      ],
      correctAnswer: 'Nobody, its decentralized!'
    },
    {
      question: 'what is an airdrop?',
      answers: [
        'sort of like a teardrop but for tough people',
        'what we did to germany and japan in WW2',
        'Special parachute for airline passengers',
        'when a crypto team distributes tokens to users for free.'
      ],
      correctAnswer: 'when a crypto team distributes tokens to users for free.'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
};

function main() {
  console.log(`you got this jake`);

  renderQuiz();
  handleQuizStart();
  handleQuestionSubmit();
  handleNextQuestionSubmit();
  handleNewQuizReset();
}

$(main);

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

// GENERATE CONTENT FOR STARTING PAGE

function generateStartingPage() {
  // return the HTML for the quiz starting page
  return `<div class="mainPage">
  <img src="https://specials-images.forbesimg.com/imageserve/5f2a32ee3b52675a453e2881/960x0.jpg?width="50" height="300"">
  <h2>Fun Blockchain History Quiz!</h2>
  <p>
    You think you know blockchain? 
    Test your Blockhain knowlage with my fun quiz, if you can answer the following questions then you may be a blockchain master. 
    Bitcoin and blockchain are fun to think about, hopefully you will have as much fun with this exam as I had creating it!
    
  </p>
  <button id="startQuiz">GET ON CHAIN</button>
</div>`;
}

// GENERATE CONTENT FOR QUESTION PAGE

function generateQuestionPage() {
  // set current question
  let currentQuestion = store.questions[store.questionNumber];

  // loop over answers array for current question
  // map each answer to a new array
  let answers = currentQuestion.answers.map((answer, index) => {
    // for each answer, return a string with the desired html for a radio button
    if (index === 0) {
      return `<input type="radio" id="${answer}" name="answer" value=${answer} required>
    <label for="${answer}">${answer}</label><br />`;
    }

    return `<input type="radio" id="${answer}" name="answer" value=${answer}>
    <label for="${answer}">${answer}</label><br />`;
  });

  // return the question section
  // for the form, join array of strings and use those for input buttons
  return `
  <div class="questionSection">
    <div class="quizStatusSection">
      <div class="currentQuestion">
        <p>Question ${store.questionNumber + 1} out of ${
    store.questions.length
  }</p>
      </div>
      <div class="currentScore">
        <p>Current Score:</br> ${store.score} correct, ${
    store.questionNumber - store.score
  } incorrect</p>
      </div>
    </div>
    <h2>${currentQuestion.question}</h2>
    <form class="answerOptions">
      ${answers.join('')}
      <button id="submitAnswer" class="hideButton">SUBMIT ANSWER</button>
    </form>
  </div>`;
}

// GENERATE CONTENT FOR FEEDBACK SECTION

function generateGoodFeedback() {
  let currentCorrect = store.questions[store.questionNumber].correctAnswer;
  return `<div class="feedbackSectionCorrect">
  <h2 class="right">Correct!</h2>
  <p>You were correct, are you satoshi?? The answer is immutibly ${currentCorrect}.</p>
  <button id="nextQuestion">NEXT QUESTION</button>
</div>`;
}

function generateBadFeedBack() {
  let currentCorrect = store.questions[store.questionNumber].correctAnswer;

  return `<div class="feedbackSectionIncorrect">
  <h2 class="wrong">Incorrect</h2>
  <p>oh major pump, then downward DUMP, sorry! shouldve responded with "${currentCorrect}"</p>
  <button id="nextQuestion">NEXT QUESTION</button>
</div>`;
}

function generateFeedbackSection(choice, answer) {
  // check user choice against answer to decide what to set html to
  let feedbackHtml = ``;

  // hide the submit button
  $('.hideButton').hide();

  // if the choice matches the answer,
  if (choice === answer) {
    //set html to equal good feedback section
    feedbackHtml = generateGoodFeedback();

    //append good feedback section
    $('main').append(feedbackHtml);

    // increment question number and score
    store.questionNumber += 1;
    store.score += 1;
  } else {
    //set html to insert to be bad feedback section
    feedbackHtml = generateBadFeedBack();

    //append bad feedback section
    $('main').append(feedbackHtml);

    //increment question number
    store.questionNumber += 1;
  }
}

// GENERATE CONTENT FOR RESULTS PAGE

function generateResultsPage() {
  // return the HTML for the quiz starting page

  if (store.score === store.questions.length) {
    return `<div class="resultsSection">
    <h2>Satoshi! its really you! A perfect score!</h2>
    <p>Here are your results:</p>
    <div class="finalPercentCorrect">
    <h3>${store.score}0%</h3>
    </div>
    <p class="final-results">You answered ${store.score} out of ${store.questions.length} questions correct. this is not finacial advice!</p>
    <p>think you can do better? lets try again? Click below to get back on chain!</p>
    <button id="newQuiz">GET ON CHAIN</button>
    </div>`;
  } else if (store.score === 0) {
    return `<div class="resultsSection">
<h2>0 out of 10? lets try agian, we can learn quicly</h2>
<p>this is for fun! and remember this is not financal advice</p>
<p>lets get a higher score! Want to try again? Click the button below to return to the chain!</p>
<button id="newQuiz">GET ON CHAIN</button>
</div>`;
  } else {
    return `<div class="resultsSection">
<h2>Well done, I hope you had fun!</h2>
<p>Here are your results:</p>
<div class="finalPercentCorrect">
<h3>${store.score}0%</h3>
</div>
<p class="final-results">You got ${store.score} out of ${store.questions.length} questions correct.</p>
<p>lets get a higher score! Want to try again? Click the button below to return to the chain!</p>
<button id="newQuiz">GET ON CHAIN</button>
</div>`;
  }
}

// RESET QUIZ CONTENT

function resetQuiz() {
  $('main').empty();
  store.quizStarted = false;
  store.questionNumber = 0;
  store.score = 0;
  renderQuiz();
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

//RENDER A QUIZ PAGE, EITHER THE START OR THE NEXT QUESTION

function renderQuiz() {
  // set html to nothing to start
  let html = ``;

  // if the quiz is not started, generate main page
  if (!store.quizStarted) {
    html = generateStartingPage();
    $('main').html(html);

    // if quiz is started, generate question 1 html
  } else if (store.quizStarted) {
    html = generateQuestionPage();
    $('main').html(html);
  }
}

// RENDER THE RESULTS PAGE

function renderResultsPage() {
  let html = ``;

  // generate html for the results page
  html = generateResultsPage();

  // replace main html with results page html
  $('main').html(html);
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

// HANDLE A CLICK ON QUIZ START

function handleQuizStart() {
  // listen for a click on the start quiz button
  $('main').on('click', '#startQuiz', function (event) {
    // set the quiz started in the store to true
    store.quizStarted = true;
    shuffle(store.questions);

    // render a new quiz
    renderQuiz();
  });
}

// HANDLE A CLICK TO SUBMIT A QUESTION

function handleQuestionSubmit() {
  // listen for a click on the submit answer button
  $('main').on('submit', '.answerOptions', function (event) {
    event.preventDefault();

    // set the right answer for the current question as a variable
    let currentQuestionAnswer =
      store.questions[store.questionNumber].correctAnswer;

    // set the user choice as a variable
    let userChoice = $('input[name="answer"]:checked').attr('id');

    // generate a feedback section, passing function the user choice and right answer for this question
    generateFeedbackSection(userChoice, currentQuestionAnswer);
  });
}

// HANDLE A CLICK TO MOVE TO NEXT QUESTION

function handleNextQuestionSubmit() {
  let storeLength = store.questions.length;

  // listen for a click on the next question button
  $('main').on('click', '#nextQuestion', function (event) {
    event.preventDefault();

    // if we are on the last question when this is clicked then render the results page, else renderquiz
    if (store.questionNumber === storeLength) {
      renderResultsPage();
    } else {
      renderQuiz();
    }
  });
}

// HANDLE A CLICK FOR A BRAND NEW QUIZ

function handleNewQuizReset() {
  $('main').on('click', '#newQuiz', function (event) {
    event.preventDefault();

    resetQuiz();
  });
}

// SHUFFLE ARRAY

function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
