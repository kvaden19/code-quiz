// Define the DOM variables
var startButton = document.getElementById("startButton");
var pointsCard = document.getElementById("pointsCard");
var timerCard = document.getElementById("timerCard");
var mainCard = document.getElementById("mainCard");
var question = document.getElementById("question");
var answerOptions = document.getElementsByClassName("answerOptions");
var answerBanner = document.getElementById("answerBanner");

// Define the score variable that will track the user's points
var userScore = 0;

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
    var q1 = new Question("Here is the 1st question?", "A", "B", "C", "D", "B")
    var q2 = new Question("Here is the 2nd question?", "1", "2", "3", "4", "3")
    var q3 = new Question("Here is the 3rd question?", "red", "blue", "yellow", "green", "red")

    // Add each Question object to the array
    questionArray.push(q1);
    questionArray.push(q2);
    questionArray.push(q3);
}

function gamePlay() {
    window.alert("Game start!");
    // Start a 30 second countdown timer
    // While (timer or question array hasn't reached zero)
        // Show user a random question
        // If correct button is clicked, points++ and show "Correct!"; else take off 10 seconds and show "Sorry!"
}

function enterHighScore() {
    // Give user an input for initials and save object (initials, score) in localStorage
    return;
}

// Create high score table -- how would I show a bunch of objects sorted by an attribute?
//     - Put in a couple dummy scores