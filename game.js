const question = document.getElementById("question");
const choices = document.getElementsByClassName("choice-text");
const quesitonCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let quesitonCounter = 0;
let availableQuestions = [];


let questions = [
    {
        question : "Inside which HTML element do we put the JavaScript 1??",
        choice1 : "<script>",
        choice2 : "<javascript>",
        choice3 : "<js>",
        choice4 : "<scripting>",
        answer : 1
    },
    {
        question : "Inside which HTML element do we put the JavaScript 2??",
        choice1 : "<script>",
        choice2 : "<javascript>",
        choice3 : "<js>",
        choice4 : "<scripting>",
        answer : 1
    },
    {
        question : "Inside which HTML element do we put the JavaScript 3??",
        choice1 : "<script>",
        choice2 : "<javascript>",
        choice3 : "<js>",
        choice4 : "<scripting>",
        answer : 1
    }
]

//Constants

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {

    quesitonCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {

    if(availableQuestions.length == 0 || quesitonCounter >= MAX_QUESTIONS){
        //go to the end page
        return window.location.assign('/end.html');
    }

    quesitonCounter++;

    quesitonCounterText.innerText = `${quesitonCounter}/${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    for (const choice of choices) {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    }
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

for (const choice of choices) {
    
    choice.addEventListener("click" , (e) => {
        if(!acceptingAnswers) return;
        
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = (selectedAnswer == currentQuestion.answer) ? "correct" : "incorrect";

        if(classToApply == 'correct'){
            incrementScore(CORRECT_BONUS);
        }
        
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        },1000)
        
    });
    
}

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}


startGame();