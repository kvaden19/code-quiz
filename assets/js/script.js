// Define the DOM variables
var startButton = document.getElementById("startButton");
var highScoresButton = document.getElementById("highScoreView");

var pointsCard = document.getElementById("pointsCard");
var timerCard = document.getElementById("timerCard");

var instructions = document.getElementById("instructions");

var quizCard = document.getElementById("quizCard");
var question = document.getElementById("question");
var answerOptions = document.getElementsByClassName("answerOption");
var answerButtons = Array.from(document.getElementsByClassName("answerButton"));
var answerBanner = document.getElementById("answerBanner");

var finalPoints = document.getElementById("finalPoints");
var scoreForm = document.getElementById("scoreForm");
var highScoreInput = document.getElementById("enterHighScore");
var highScoreOL = document.getElementById("highScoreOL");

// Define the gameplay variables
var userScore = 0;
var secondsLeft = 60;

class HighScore {
    constructor(initials, score) {
        this.initials = initials;
        this.score = score;
        }
    }

function setupHighScores() { // Define pre-existing high scores
    var highScoreArray = [];

    var hs1 = new HighScore("KC", 100);
    var hs2 = new HighScore("SH", 40);
    var hs3 = new HighScore("BP", 10);
    var hs4 = new HighScore("KV", 60);
    var hs5 = new HighScore("EV", 30);

    highScoreArray.push(hs1);
    highScoreArray.push(hs2);
    highScoreArray.push(hs3);
    highScoreArray.push(hs4);
    highScoreArray.push(hs5);

    return highScoreArray;
}

function setupQuestions() {
    // Define a Question object constructor
    class Question {
    constructor(question, choice0, choice1, choice2, choice3, answer) {
        this.question = question;
        this.choice0 = choice0;
        this.choice1 = choice1;
        this.choice2 = choice2;
        this.choice3 = choice3;
        this.answer = answer;
        }
    }

    // Define an array to hold Question objects
    questionArray = [];

    // Define the questions, answer choices, and correct answers that will be used in the quiz
    var q1 = new Question("Math.random gives values between which two numbers?", "0, 100", "-1, 1", "0, 1", "Infinite", 2);
    var q2 = new Question("What keyword is used to define a JavaScript variable?", "var", "variable", "x", "y", 0);
    var q3 = new Question("How do you print a value to the console?", "print", "output", "log", "console.log", 3);
    var q4 = new Question("What keywords create a loop in JavaScript?", "for", "while", "do...while", "all of the above", 3);
    var q5 = new Question("What data type might you use to store a list?", "string", "array", "bigInt", "date", 1);
    var q6 = new Question("What keyword is used to get out of a loop?", "stop", "break", "halt", "cease", 1);
    var q7 = new Question("What does DOM stand for?", "Dormant Objective Month", "Document Objective Math", "Document Object Model", "Dominant Object Model", 2);
    var q8 = new Question("Which is NOT a valid DOM event?", "click", "hover", "onchange", "display", 3);
    var q9 = new Question("What type of data type is 'true'?", "string", "number", "array", "boolean", 3);
    var q10 = new Question("What method is used to get the first element from an array?", "hop", "get", "pop", "put", 2);

    // Add each Question object to the array
    questionArray.push(q1);
    questionArray.push(q2);
    questionArray.push(q3);
    questionArray.push(q4);
    questionArray.push(q5);
    questionArray.push(q6);
    questionArray.push(q7);
    questionArray.push(q8);
    questionArray.push(q9);
    questionArray.push(q10);

    // Sort Question array into a random order before passing to gamePlay function
    questionArray.sort(function(a, b){return 0.5 - Math.random()});
    return questionArray;
}

function getQuestion() {
    answerBanner.innerHTML = "";

    // If all questions have been answered, trigger the end game
    if (questionArray.length === 0) {
        enterScore();
        return;
    }

    // Display the question in the main card with 4 answer buttons
    quizCard.style.display = "block";
    var q = questionArray.pop();
    question.textContent = q.question;
    answerOptions[0].textContent = q.choice0;
    answerOptions[1].textContent = q.choice1;
    answerOptions[2].textContent = q.choice2;
    answerOptions[3].textContent = q.choice3;

    // If correct button is clicked, add points and show "Correct!"; else take off 5 seconds and show "Sorry!"
    answerButtons.forEach((button, index) => {
        button.addEventListener("click", e => {
            if (q.answer === index) {
                userScore += 10;
                answerBanner.innerHTML = "Correct!";
                pointsCard.textContent = userScore;
                q = setTimeout(getQuestion, 1000);
            }
            else {
                answerBanner.innerHTML = "Sorry!";
                secondsLeft -= 5;
                timerCard.textContent = secondsLeft;
                q = setTimeout(getQuestion, 1000);
            }  
        });
    });
}

function gamePlay() {
    // Set display elements
    startButton.style.display = "none";
    highScoresButton.style.display = "none";

    instructions.style.display = "none";
    displayHighScore.style.display = "none";
    enterHighScore.style.display = "none";
    quizCard.style.display = "block";

    timerCard.style.display = "block";
    pointsCard.style.diplay = "block";

    var userScore = 0;
    var secondsLeft = 60;

    // Start a 60 second countdown timer
    timerCard.textContent = secondsLeft;
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timerCard.textContent = secondsLeft;
        if(secondsLeft <= 0) {
          clearInterval(timerInterval);
        }
      }, 1000);
    if (secondsLeft <= 0) {
        enterScore();
        return;
    }

    // Start userScore at zero
    pointsCard.textContent = userScore;

    // Get the array of questions
    questionArray = setupQuestions();
    q = getQuestion();
}

function enterScore() {
    // Set display elements
    startButton.style.display = "none";
    highScoresButton.style.display = "none";

    instructions.style.display = "none";
    displayHighScore.style.display = "none";
    enterHighScore.style.display = "block";
    quizCard.style.display = "none";

    timerCard.style.display = "none";
    pointsCard.style.diplay = "block";

    // Show the user their score and ask for their initials
    highScoreInput.style.display = "block";
    finalPoints.textContent = userScore;

    function handleFormSubmit(event) {
        event.preventDefault();
        var userInput = document.getElementById("user-input").value;

        while (highScoreOL.hasChildNodes()) {  
            highScoreOL.removeChild(highScoreOL.firstChild);
        }

        var us1 = new HighScore(userInput, userScore);
        highScoreArray.push(us1);
        displayScores();
      }

    scoreForm.addEventListener("submit", handleFormSubmit);

    // TODO: Save object (initials, score) in localStorage
}

function displayScores() {
    // Set display elements
    startButton.style.display = "block";
    highScoresButton.style.display = "none";

    instructions.style.display = "none";
    displayHighScore.style.display = "block";
    enterHighScore.style.display = "none";
    quizCard.style.display = "none";

    timerCard.style.display = "none";
    pointsCard.style.diplay = "none";

    highScoreArray.sort(function(a, b) {return b.score - a.score});
    
    for (i=0; i<5; i++) {
        // append a child li to highScoreOL
        var li = document.createElement("li");                        
        li.innerHTML = highScoreArray[i].initials + '      ' + highScoreArray[i].score; 
        highScoreOL.appendChild(li);                                           
    }
}

highScoreArray = setupHighScores();

startButton.addEventListener("click", gamePlay);
highScoresButton.addEventListener("click", displayScores);