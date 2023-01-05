var questions = [{
    title: "Which of the following is not a feature of Javascript?",
    choices: ["Number", "Letter", "String", "Boolean"],
    answer: "Letter"
},
{
    title: "Which of the following is not a Javascript method?",
    choices: ["Array", "String", "Object", "Scientific"],
    answer: "Scientific"
},
{
    title: " Which of the following is not a way to log?",
    choices: ["Parenthesis Notation", "Bracket Notation", "This", "Dot Notation"],
    answer: "Parenthesis Notation"
},
{
    title: "Which of the following function of an array object adds and/or removes elements from an array?",
    choices: ["ToSource", "Sort", "Unshift", "Splice"],
    answer: "Splice"
},
{
    title: "Which of the following function of String object combines the text of two strings and returns a new string?",
    choices: ["Add", "Concat", " Merge", "Append"],
    answer: "Concat"
}
]

var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

function start() {

    timeLeft = 75;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(); 
        }
    }, 1000);

    next();
}
 
function endGame() {
    clearInterval(timer);

    var quizContent = `
    <h2>Game over!</h2>
    <h3>You got a ` + score +  ` /100!</h3>
    <h3>That means you got ` + score / 20 +  ` questions correct!</h3>
    <input type="text" id="name" placeholder="First name"> 
    <button onclick="setScore()">Set score</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName",  document.getElementById('name').value);
    getScore();
}

function getScore() {
    var quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 
    
    <button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>
    
    `;

    document.getElementById("quizBody").innerHTML = quizContent;
}

function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName",  "");

    resetGame();
}
 
function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;

    var quizContent = `
    <h1>
        JavaScript Coding Quiz
    </h1>
    <h3>
        Click to Play   
    </h3>
    <button onclick="start()">Start</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

function incorrect() {
    timeLeft -= 15; 
    next();
}

function correct() {
    score += 20;
    next();
}
 
function next() {
    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }

    var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }

    document.getElementById("quizBody").innerHTML = quizContent;
}
