

const main = document.querySelector('#main');
const start = document.querySelector('#start');
const leaderboard = document.querySelector('#highScores');
const startBtn= document.querySelector('.startBtn');
const leaderboardBtn= document.querySelector('.leaderboardBtn');
const returnBtn= document.querySelector('.returnBtn');
// khởi tạo
document.getElementById('main').style.display = "flex";
document.getElementById('start').style.display = "none";
document.getElementById('end').style.display = "none";
document.getElementById('highScores').style.display = "none";
document.getElementById('returnBtn').style.display = "none";
document.getElementById('score').style.display = "none";
// quay về
returnBtn.addEventListener('click', ()=>{
    document.getElementById('main').style.display = "flex";
    document.getElementById('start').style.display = "none";
    document.getElementById('highScores').style.display = "none";
    document.getElementById('returnBtn').style.display = "none";
    document.getElementById('score').style.display = "none";
    document.getElementById('end').style.display = "none";
});
// bắt đầu
startBtn.addEventListener('click', ()=>{
    document.getElementById('main').style.display = "none";
    document.getElementById('start').style.display = "flex";
    document.getElementById('returnBtn').style.display = "flex";
    document.getElementById('score').style.display = "flex";
    document.getElementById('progressBar').style.display = "flex";
});
// leaderboard
leaderboardBtn.addEventListener('click', ()=>{
    document.getElementById('main').style.display = "none";
    document.getElementById('highScores').style.display = "flex";
    document.getElementById('returnBtn').style.display = "flex";
});
// reset
function resetGame(){
    currentQuestion = {};
    acceptingAnswers = true;
    score = 0;
    questionCounter = 0;
    availableQuestions = [];
    document.getElementById('main').style.display = "flex";
    document.getElementById('start').style.display = "none";
    document.getElementById('end').style.display = "none";
    document.getElementById('highScores').style.display = "none";
    document.getElementById('returnBtn').style.display = "none";
    document.getElementById('score').style.display = "none";
}
//start
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []
const SCORE_POINTS = 10;

let MAX_QUESTIONS = questions.length;
function getInputValue(){
    var inputVal = document.getElementById("number-box").value;
    MAX_QUESTIONS = inputVal - 1;
}

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}
endGame = () =>{
    document.getElementById('start').style.display = "none";
    document.getElementById('end').style.display = "flex";
    document.getElementById('returnBtn').style.display = "none";
}
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        endGame();
    }
    questionCounter++
    // progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })
    availableQuestions.splice(questionsIndex, 1)
    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
        selectedChoice.classList.add(classToApply);
        // selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.classList.remove(classToApply);
            getNewQuestion()
        }, 1000)
    })
})
let maxScore= (MAX_QUESTIONS+1)*10;
const finalScore = document.querySelector("#finalScore")
const endtext = document.querySelector('#end-text');
incrementScore = num => {
    score +=num
    scoreText.innerText = score
    finalScore.innerText = score
    // comment = score;
    
    if ((score / maxScore) >= 0.3) endtext.innerText = 'Giỏi quá zị';
    if ((score / maxScore) >= 0.5) endtext.innerText = 'Quá vjp pro luôn';
    if ((score / maxScore) >= 0.7) endtext.innerText = 'U là tr';
}

// setComment();
// end
startGame();
const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector("#saveScoreBtn")
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})
saveScoreBtn.addEventListener('click', ()=>{
    resetGame();
})

function playAudio(url) {
    new Audio(url).play();
  }