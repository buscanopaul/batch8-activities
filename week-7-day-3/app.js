//variables
var quiz = [];
  quiz[0] = new Question("What is the sound of the dog?", "aw", "meow", "awit");
  quiz[1] = new Question("What color is blood?", "Red", "White", "Green");
  quiz[2] = new Question("What color is grass?", "Green", "White", "Red");
  quiz[3] = new Question("What is the color of Blackboard?", "green", "black", "white");
  quiz[4] = new Question("What is the capital of the Philippines?", "Manila", "Sulu", "Boracay");
  quiz[5] = new Question("What is 2-2?", "0", "2", "4");
var randomQuestion;
var answers = [];
var currentScore = 0;

// event listener click random question
document.addEventListener("DOMContentLoaded", function(event) { 
  btnProvideQuestion();
});

// question first item is the answer
function Question(question,rightAnswer,wrongAnswer1,wrongAnswer2) {
    this.question = question;
    this.rightAnswer = rightAnswer;
    this.wrongAnswer1 = wrongAnswer1;
    this.wrongAnswer2 = wrongAnswer2;
};

//shuffle answer arrangement
function shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

// click random question
function btnProvideQuestion() { 
  
	var randomNumber = Math.floor(Math.random()*quiz.length);
	randomQuestion = quiz[randomNumber]; //getQuestion
  answers = [randomQuestion.rightAnswer, randomQuestion.wrongAnswer1, randomQuestion.wrongAnswer2];
  shuffle(answers);
  
  document.getElementById("question").innerHTML= randomQuestion.question;
  document.getElementById("answerA").value= answers[0];
  document.getElementById("answerA").innerHTML= answers[0];
  document.getElementById("answerB").value= answers[1];
  document.getElementById("answerB").innerHTML= answers[1];
  document.getElementById("answerC").value= answers[2];
  document.getElementById("answerC").innerHTML= answers[2];

}

// click event listener
function answerA_clicked() {
  var answerA = document.getElementById("answerA").value;
  	checkAnswer(answerA);
}

function answerB_clicked() {
		var answerB = document.getElementById("answerB").value;
  checkAnswer(answerB);
}
function answerC_clicked() {
  var answerC = document.getElementById("answerC").value;
  	
		checkAnswer(answerC);
}

// Increment score if correct
function adjustScore(isCorrect) {
  if (isCorrect) {
    currentScore++;
  } 

  if(currentScore % 5 === 0) {
    alert("5 in a row");
  }
  document.getElementById("score").innerHTML = currentScore;
}

// check if right answer
function checkAnswer(answer) {  
  if (answer == randomQuestion.rightAnswer) {
    adjustScore(true);
    btnProvideQuestion();
  } else { 
    alert("Nope!");
    adjustScore(false);
  }	  
}

//reset question and score
document.getElementById("reset").onclick = function() {
  btnProvideQuestion();
  document.getElementById("score").innerHTML = 0;
};
