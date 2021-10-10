const main = document.querySelector('#main');
const start = document.querySelector('#start');
const startBtn= document.querySelector('.startBtn');
const preQuestionBoardBtn= document.querySelector('.preQuestionBoardBtn');
const returnBtn= document.querySelector('.returnBtn');
const preQuestionBoard__list = document.querySelector('#preQuestionBoard__list')
// khởi tạo
document.getElementById('main').style.display = "flex";
document.getElementById('start').style.display = "none";
document.getElementById('end').style.display = "none";
document.getElementById('returnBtn').style.display = "none";
document.getElementById('score').style.display = "none";
document.getElementById('preQuestionBtn').style.display = "none";
document.getElementById('preQuestionBoard').style.display = "none";
// quay về
returnBtn.addEventListener('click', ()=>{
    resetGame();
});
// bắt đầu
startBtn.addEventListener('click', ()=>{
    document.getElementById('main').style.display = "none";
    document.getElementById('start').style.display = "flex";
    document.getElementById('returnBtn').style.display = "flex";
    document.getElementById('score').style.display = "flex";
    document.getElementById('preQuestionBtn').style.display = "flex";
});
// Pre-question board
preQuestionBoardBtn.addEventListener('click', ()=>{
    document.getElementById('main').style.display = "none";
    document.getElementById('preQuestionBoard').style.display = "flex";
    document.getElementById('returnBtn').style.display = "flex";
});
// reset
function resetGame(){
    // currentQuestion = {};
    // acceptingAnswers = true;
    // score = 0;
    // availableQuestions = [];
    // Khi bấm ok thì nó sẽ đếm lại từ 0
    questionCounter = 0;
    document.getElementById('main').style.display = "flex";
    document.getElementById('start').style.display = "none";
    document.getElementById('end').style.display = "none";
    document.getElementById('returnBtn').style.display = "none";
    document.getElementById('score').style.display = "none";
    document.getElementById('preQuestionBtn').style.display = "none";
    document.getElementById("number-box").value = questions.length;
    document.getElementById('preQuestionBoard').style.display= "none"; 
}
//start
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const scoreText = document.querySelector('#score');
let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []
const SCORE_POINTS = 10;

let MAX_QUESTIONS = questions.length;
// document.getElementById("number-box").value = 1; 
document.getElementById("number-box").value = questions.length;
function getInputValue(){
    var inputVal = document.getElementById("number-box").value;
    MAX_QUESTIONS = inputVal - 1;
}

// startGame = () => {
function startGame(){
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}
// endGame = () =>{
function endGame(){
    document.getElementById('start').style.display = "none";
    document.getElementById('end').style.display = "flex";
    document.getElementById('returnBtn').style.display = "none";
    document.getElementById('score').style.display="none";
}
const preQuestionBtn = document.getElementById("preQuestionBtn");
let   preQuestion =[];
let   preAnswer =[];
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        // localStorage.setItem('mostRecentScore', score);
        endGame();
    }
    questionCounter++;
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })
    
    // Lưu lại giá trị trước khi cắt
    preQuestion.push(currentQuestion.question);
    preAnswer.push(currentQuestion['choice'+currentQuestion.answer]);
    preQuestionBtn.innerText = preQuestion[preQuestion.length-2];
    // Cho vào preQuestionBoard
    if (preQuestion.length-2>-1)
    preQuestionBoard__list.innerHTML += 
    `<li><p class='list__left'>${preQuestion[preQuestion.length-2]}</p><p class='list__right'>${preAnswer[preQuestion.length-2]}</p></li>`
    //-------
    availableQuestions.splice(questionsIndex, 1);
    acceptingAnswers = true;
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
}
startGame();
//--------------------------------------------->
const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector("#saveScoreBtn")
// username.addEventListener('keyup', () => {
//     saveScoreBtn.disabled = !username.value
// })
// saveScoreBtn.addEventListener('click', ()=>{
//     resetGame();
// })
//--------------------------------------------->
function playAudio(url) {
    new Audio(url).play();
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
comment = [
    'Đồ tể nihongo',
    'Giỏi quá bạn ưi',
    'Sừ goi sừ goi',
    'Nì hôn zin',
    'U là tr',
    'Giỏi quá zị',
    'Chiến thần N1',
    'Gòi xong tới công chuyện'
];
gif =[
    './assets/images/gif-1.gif', 
    './assets/images/gif-2.gif',
    './assets/images/gif-3.gif',
    './assets/images/gif-4.gif',
    './assets/images/gif-5.gif',
    './assets/images/gif-6.gif',
    './assets/images/gif-7.gif',
    './assets/images/gif-8.gif',
    './assets/images/gif-9.gif',
    './assets/images/gif-10.gif'
];
frame=[
    './assets/images/Frame-1.png',
    './assets/images/Frame-2.png',
    './assets/images/Frame-3.png'
]
endtext.innerText = comment[getRandomInt(comment.length)];
document.getElementById("gif").src= gif[getRandomInt(gif.length)];
document.getElementById("frame").src=frame[getRandomInt(frame.length)];
function choosePic(){
    document.getElementById("frame").src=frame[getRandomInt(frame.length)];
};
function changeColor(){
    bg = [
        'background: linear-gradient(to right,#0f0c29,#302b63,#24243e) !important',
        'background: linear-gradient(to right,#0F2027,#203A43,#2C5364) !important',
        'background: linear-gradient(to right,#2c3e50,#2c3e50) !important',
        'background: linear-gradient(to right,#093028,#093028) !important',
        'background: linear-gradient(to right,#000428,#004e92) !important',
        'background: linear-gradient(to right,#434343,#004e92) !important',
        'background: linear-gradient(to right,#232526,#414345) !important',
    ];
    document.getElementById('wrapper').style= bg[getRandomInt(bg.length)];
}

