/* global $ */
var player = 1;

function QuestionsMaker (questDisp, choice, correctAnswer) {
  this.questDisp = questDisp;
  this.choices = choice;
  this.correctAnswer = correctAnswer;
}

var Question1 = new QuestionsMaker("What's the nearest MRT to Ang Mo Kio?", ['Bishan', 'Chua Chu Kang', 'Pasir Ris', 'Buno Vista'], 0);
var Question2 = new QuestionsMaker("Where's Marina Bay Sand?", ['Marina Bay', 'Marina Bowl', 'Marina Barrage', 'Marina Port'], 0);
var Question3 = new QuestionsMaker('Who founded Singapore?', ['Tengku Abdul Rahman', 'Lord Hastings', 'Sir Stamford Raffles', 'William Farquhar'], 2);
var Question4 = new QuestionsMaker('What is Singapore most famous for?', ['Ayam Penyet', 'The Merlion', 'Beautiful Asian Women', 'MRT System'], 1);
var Question5 = new QuestionsMaker('When was Singapore Found?', ['195 BC', '1819', '1999', '2015'], 1);
var Question6 = new QuestionsMaker('What does COE stands for', ['Car offer Entitlement', 'Certificate of Entitlement', 'Certificate of Enlightment', 'Car of Entitlement'], 1);

var Quiz = {
  questionsIndex: 0,
  questions: [Question1, Question2, Question3, Question4, Question5, Question6],
  isGameOver: false,
  player1Points: 0,
  player2Points: 0
};

function restart () {
  Quiz.questionsIndex = 0;
  Quiz.isGameOver = false;
  Quiz.player1Points = 0;
  Quiz.player2Points = 0;
  player = 1;
}
function isGameOver () {
  return Quiz.isGameOver;
}
function whoWon () {
  if (Quiz.isGameOver === false) {
    return 0;
  }
  // if player 1 points is more than player 2
  if (Quiz.player1Points > Quiz.player2Points) {
    return 1;
  }
  // if player 2 points is more than player 1
  if (Quiz.player1Points < Quiz.player2Points) {
    return 2;
  }
  return 3;
}
function numberOfQuestions () {
  return Quiz.questions.length;
}
function currentQuestion () {
  return Quiz.questionsIndex;
}
function numberOfAnswers () {
  return Quiz.questions[Quiz.questionsIndex].choices.length;
}
function correctAnswer () {
  return Quiz.questions[Quiz.questionsIndex].correctAnswer;
}
function playTurn (choice) {
  if (Quiz.isGameOver) {
    return false;
  }
  var correct = false;
  console.log(choice + ' ' + Quiz.questions[Quiz.questionsIndex].correctAnswer);
  if (choice === Quiz.questions[Quiz.questionsIndex].correctAnswer) {
    correct = true;
    if (player === 2) {
      Quiz.player2Points++;
    } else {
      Quiz.player1Points++;
    }
  }
  ++Quiz.questionsIndex;
  if (Quiz.questionsIndex === numberOfQuestions()) {
    if (player === 1) {
      player = 2;
      Quiz.questionsIndex = 0;
    }
    else{
      Quiz.isGameOver = true;
    }
  }
  return correct;
}
// a function to update the display whenever the data changes
function updateDisplay () {
  if (isGameOver()) {
    if (whoWon() === 2) {
      $('h1').text("The most Singaporean winner is : " + whoWon());
      $('button').hide();
    } else if (whoWon() === 1) {
      $('h1').text("The most Singaporean winner is : " + whoWon());
      $('button').hide();
    } else if (whoWon() === 3) {
      $('h1').text('Wow! Both players are double confirm Singaporean');
      $('button').hide();
    }
  } else {
    $('h1').text(Quiz.questionsIndex + 1 + ') ' + Quiz.questions[Quiz.questionsIndex].questDisp);
    // hard coded display, only has 4 answers at a time. Each is displayed as a button, so can use the order (eg) that they appear in the dom to select them
    $('button').eq(0).text(Quiz.questions[Quiz.questionsIndex].choices[0]);
    $('button').eq(1).text(Quiz.questions[Quiz.questionsIndex].choices[1]);
    $('button').eq(2).text(Quiz.questions[Quiz.questionsIndex].choices[2]);
    $('button').eq(3).text(Quiz.questions[Quiz.questionsIndex].choices[3]);
  }
  // update player scores regardless
  $('h3').eq(0).text('Player 1: ' + Quiz.player1Points);
  $('h3').eq(1).text('Player 2: ' + Quiz.player2Points);
}

// the jQuery ready function will add click listeners once the dom is loaded
// $(function () {
$('button').click(function () {
    // if gameover then restart else log a player turn
  if (isGameOver()) {
    restart();
  } else {
    // can use jquery index() to find the position of this element in relation to its siblings. works as only answers are in this container
    playTurn($(this).index());
  }
  updateDisplay();
});

// update the display for the first time
updateDisplay();
$('#restart').click(function () {
    // if gameover then restart else log a player turn

  restart();
  $('button').show();
  updateDisplay();
});
// });
