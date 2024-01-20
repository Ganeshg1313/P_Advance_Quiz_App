const question = document.getElementById("question");
const choices = document.getElementsByClassName("choice-text");
const progressText = document.getElementById('progressText');
const progressBarFull = document.getElementById('progressBarFull');
const scoreText = document.getElementById('score');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let quesitonCounter = 0;
let availableQuestions = [];


let questions = [];

// async function fecthQuestions(){
//     try{
//         const response = await fetch("questions.json");
//         const result = await response.json();
//         for(let item of result) {
//           questions.push(item);
//         } 
//         startGame();
//     }
//     catch(e){
//         console.log(e);
//     }
    
// }

fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
    .then( res => {
        return res.json();
    })
    .then(loadedQuestions => {
        questions = loadedQuestions.results.map( loadedQuestion => {
            const formattedQuestion = {
                question : loadedQuestion.question
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
            answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);

            answerChoices.forEach((choice, index) => {
                formattedQuestion["choice" + (index+1)] = choice;
            })
            return formattedQuestion;
        })
        startGame();
    })
    .catch( err => {
        console.error(err);
    });


//Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {

        quesitonCounter = 0;
        score = 0;
        availableQuestions = [...questions];
        getNewQuestion();
        game.classList.remove("hidden");
        loader.classList.add("hidden");
};

getNewQuestion = () => {

    if(availableQuestions.length == 0 || quesitonCounter >= MAX_QUESTIONS){

        localStorage.setItem("mostRecentScore", score)
        //go to the end page
        return window.location.assign('/end.html');
    }

    quesitonCounter++;

    progressText.innerText = `Question ${quesitonCounter}/${MAX_QUESTIONS}`;

    //update the progress bar
    progressBarFull.style.width = `${(quesitonCounter / MAX_QUESTIONS) * 100}%`; 

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
