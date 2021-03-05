// Define the DOM variables
var startButton = document.getElementById("startButton");
var highScoresButton = 0;

var pointsCard = document.getElementById("pointsCard");
var timerCard = document.getElementById("timerCard");

var instructions = document.getElementById("instructions");

var quizCard = document.getElementById("quizCard");
var question = document.getElementById("question");
var answerOptions = document.getElementsByClassName("answerOption");
var buttonA = document.getElementById("A");
var buttonB = document.getElementById("B");
var buttonC = document.getElementById("C");
var buttonD = document.getElementById("D");
var answerBanner = document.getElementById("answerBanner");

// TODO: Create / load a high score array of objects (initials, values)

// Define the gameplay variables
var userScore = 0;
var secondsLeft = 10;

startButton.addEventListener("click", gamePlay);

function setup() {
    // Define a Question object constructor
    class Question {
    constructor(question, choice1, choice2, choice3, choice4, answer) {
        this.question = question;
        this.choice1 = choice1;
        this.choice2 = choice2;
        this.choice3 = choice3;
        this.choice4 = choice4;
        this.answer = answer;
        }
    }

    // Define an array to hold Question objects
    questionArray = [];

    // Define the questions, answer choices, and correct answers that will be used in the quiz
    // TODO: Populate this with actual questions
    var q1 = new Question("Here is the 1st question?", "A", "B", "C", "D", "B")
    var q2 = new Question("Here is the 2nd question?", "1", "2", "3", "4", "C")
    var q3 = new Question("Here is the 3rd question?", "red", "blue", "yellow", "green", "A")

    // Add each Question object to the array
    questionArray.push(q1);
    questionArray.push(q2);
    questionArray.push(q3);

    // Sort Question array into a random order before passing to gamePlay function
    questionArray.sort(function(a, b){return 0.5 - Math.random()});
    return questionArray;
}

function getQuestion() {
    if (questionArray.length === 0 || secondsLeft <= 0) {
        endGame();
        return;
    }

    // Display the question in the main card with 4 answer buttons
    var q = questionArray.pop();
    quizCard.style.display = "block";
    question.textContent = q.question;
    answerOptions[0].textContent = q.choice1;
    answerOptions[1].textContent = q.choice2;
    answerOptions[2].textContent = q.choice3;
    answerOptions[3].textContent = q.choice4;
    return q;
}

function gamePlay() {
    // TODO: Hide / Disable HS and Start buttons
    instructions.style.display = "none";

    // Set up the array of questions
    questionArray = setup();

    timerCard.textContent = secondsLeft;
    // Start a 60 second countdown timer
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timerCard.textContent = secondsLeft;
        if(secondsLeft === 0) {
          clearInterval(timerInterval);
        }
      }, 1000);

    // Start userScore at zero
    pointsCard.textContent = userScore;

    q = getQuestion();

    // If correct button is clicked, add points and show "Correct!"; else take off 10 seconds and show "Sorry!"
    buttonA.addEventListener("click", function() {
        if (q.answer === "A") {
            userScore += 10;
            answerBanner.innerHTML = "Correct!";
            pointsCard.textContent = userScore;
            getQuestion();
        }
        else {
            answerBanner.innerHTML = "Sorry!";
            secondsLeft -= 5;
            timerCard.textContent = secondsLeft;
            getQuestion();
        }
    });
    buttonB.addEventListener("click", function() {
        if (q.answer === "B") {
            userScore += 10;
            answerBanner.innerHTML = "Correct!";
            pointsCard.textContent = userScore;
            getQuestion();
        }
        else {
            answerBanner.innerHTML = "Sorry!";
            secondsLeft -= 5;
            timerCard.textContent = secondsLeft;
            getQuestion();
        }
    });
    buttonC.addEventListener("click", function() {
        if (q.answer === "C") {
            userScore += 10;
            answerBanner.innerHTML = "Correct!";
            pointsCard.textContent = userScore;
            getQuestion();
        }
        else {
            answerBanner.innerHTML = "Sorry!";
            secondsLeft -= 5;
            timerCard.textContent = secondsLeft;
            getQuestion();
        }
    });
    buttonD.addEventListener("click", function() {
        if (q.answer === "D") {
            userScore += 10;
            answerBanner.innerHTML = "Correct!";
            pointsCard.textContent = userScore;
            getQuestion();
        }
        else {
            answerBanner.innerHTML = "Sorry!";
            secondsLeft -= 5;
            timerCard.textContent = secondsLeft;
            getQuestion();
        }
    });
}

function endGame() {
    window.alert('Game is over!');
    // Once game is over, give user an input for initials
    // save object (initials, score) in localStorage
    // Push onto the existing array
    // Sort the array by score
    // Format the array to sit in the main card
    // Add a button + Event Listener to go back to the main game (same as HS button)
    return;
}


