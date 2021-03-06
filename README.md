# Code Quiz

## Description
Most aspriing software developers will face many technical assessments over the course of their job search. As job seekers we need all the practice with quizzes and assessments we can get!

This app will give the user a quiz on JavaScript fundamentals. They will have one minute to answer as many questions as possible. They can then enter a high score and compare against their peers to stay motivated.

The app is built with HTML, CSS, and vanilla JavaScript.

Usage
The app can be accessed here: https://kvaden19.github.io/code-quiz.

Click "Start" to begin or click "View High Scores" to see the existing high scores.
![Code quiz landing page](/assets/images/instructions.png "Landing Page")

After the game starts, the user will see a 60 second countdown timer to the right of the screen and a point total to the left. The multiple-choice questions will appear in the center of the screen. The user can choose an answer by clicking the corresponding button. They will be told immediately whether the answer is correct or not. If correct, 10 points will be added to the total. If incorrect, 5 seconds will be subtracted from the timer.
![Example quiz question](/assets/images/question.png "Sample question")

Once the game ends, the user will be prompted for their initials. 

Finally the user will be taken to the high score page. Here they can view the top 5 scores (including theirs, if they made the cut)! From here, the user can choose to start the game again.
![High Score page](/assets/images/highscores.png "User Prompt")

## Future Improvements
- Put user score in local storage
- Improve app styling
- Add more questions

### Known Bugs
- There is an issue with the way questions are popped off the QuestionArray, e.g., it's happening more than wanted. This causes the users to see fewer questions than are programmed in. 
