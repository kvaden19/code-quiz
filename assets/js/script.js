// Define the DOM variables
var startButton = document.getElementById("startButton");
var highScoresButton = 0;

var pointsCard = document.getElementById("pointsCard");
var timerCard = document.getElementById("timerCard");

var instructions = document.getElementById("instructions");

var quizCard = document.getElementById("quizCard");
var question = document.getElementById("question");
var answerOptions = document.getElementsByClassName("answerOption");
var answerButtons = Array.from(document.getElementsByClassName("answerButton"));
var answerBanner = document.getElementById("answerBanner");

var finalPoints = document.getElementById("finalPoints");
var highScoreInput = document.getElementById("enterHighScore");
var highScoreOL = document.getElementById("highScoreOL");

// Define pre-existing high scores
var highScoreArray = [];

class HighScore {
    constructor(initials, score) {
        this.initials = initials;
        this.score = score;
        }
    }
    
var hs1 = new HighScore("KC", 100);
var hs2 = new HighScore("SH", 40);
var hs3 = new HighScore("BP", 10);
var hs4 = new HighScore("BP", 0);

highScoreArray.push(hs1);
highScoreArray.push(hs2);
highScoreArray.push(hs3);
highScoreArray.push(hs4);

// Define the gameplay variables
var userScore = 50;
var secondsLeft = 60;
var scoreForm = document.getElementById("scoreForm");

function setup() {
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
    // TODO: Populate this with actual questions
    var q1 = new Question("Here is the 1st question?", "A", "B", "C", "D", 1);
    var q2 = new Question("Here is the 2nd question?", "1", "2", "3", "4", 2);
    var q3 = new Question("Here is the 3rd question?", "red", "blue", "yellow", "green", 0);

    // Add each Question object to the array
    questionArray.push(q1);
    questionArray.push(q2);
    questionArray.push(q3);

    // Sort Question array into a random order before passing to gamePlay function
    questionArray.sort(function(a, b){return 0.5 - Math.random()});
    return questionArray;
}

function getQuestion() {
    // If all questions have been answered, trigger the end game
    if (questionArray.length === 0) {
        endGame();
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
    return q;
}

function gamePlay() {
    // TODO: Hide / Disable HS and Start buttons
    instructions.style.display = "none";

    // Start a 60 second countdown timer
    timerCard.textContent = secondsLeft;
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timerCard.textContent = secondsLeft;
        if(secondsLeft === 0) {
          clearInterval(timerInterval);
        }
      }, 1000);
    if (secondsLeft <= 0) {
        endGame();
        return;
    }

    // Start userScore at zero
    pointsCard.textContent = userScore;

    // Get the array of questions
    questionArray = setup();
    q = getQuestion();

    // If correct button is clicked, add points and show "Correct!"; else take off 5 seconds and show "Sorry!"
    answerButtons.forEach((button, index) => {
        button.addEventListener("click", e => {
            if (q.answer === index) {
                userScore += 10;
                answerBanner.innerHTML = "Correct!";
                pointsCard.textContent = userScore;
            }
            else {
                answerBanner.innerHTML = "Sorry!";
                secondsLeft -= 5;
                timerCard.textContent = secondsLeft;
            }
        q = getQuestion();
        });
    });
}

function endGame() {
    // Once the game is over, remove timer and quiz content
    quizCard.style.display = "none";
    timerCard.textContent = "";

    // Show the user their score and ask for their initials
    highScoreInput.style.display = "block";
    finalPoints.textContent = userScore;

    function handleFormSubmit(event) {
        event.preventDefault();
        var userInput = document.getElementById("user-input").value;

        var us1 = new HighScore(userInput, userScore);
        highScoreArray.push(us1);

        highScoreArray.sort(function(a, b) {return b.score - a.score});

        enterHighScore.style.display = "none";
        displayHighScore.style.display = "block";
        
        for (i=0; i<5; i++) {
            // append a child li to highScoreOL
            var li = document.createElement("li");                        
            li.innerHTML = highScoreArray[i].initials + '      ' + highScoreArray[i].score; 
            highScoreOL.appendChild(li);                                           
        }
      }

    scoreForm.addEventListener("submit", handleFormSubmit);

    // TODO: Save object (initials, score) in localStorage
    // localStorage.setItem("savedHS", JSON.stringify(savedHS));

    // TODO: Add a button + Event Listener to go back to the main game (same as HS button)
}

startButton.addEventListener("click", endGame); // testing