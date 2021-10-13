const main                   = document.querySelector('#main');
const start                  = document.querySelector('#start');
const startBtn               = document.querySelector('.startBtn');
const returnBtn              = document.querySelector('.returnBtn');
const preQuestionBoardBtn    = document.querySelector('.preQuestionBoardBtn');
const preQuestionBoard__list = document.querySelector('#preQuestionBoard__list');
const rankBtn                = document.querySelector('#rankBtn');
const rankBoard__list        = document.querySelector('#rankList');
const saveScoreBtn           = document.querySelector('#saveScoreBtn');
const finalScore             = document.querySelector("#finalScore");
const endtext                = document.querySelector('#end-text');
const percent                = document.querySelector('#percentCorrect');
const level                  = document.querySelector('#level');
// Khởi tạo
document.getElementById('main').style.display             = "flex";
document.getElementById('start').style.display            = "none";
document.getElementById('end').style.display              = "none";
document.getElementById('returnBtn').style.display        = "none";
document.getElementById('score').style.display            = "none";
document.getElementById('preQuestionBtn').style.display   = "none";
document.getElementById('preQuestionBoard').style.display = "none";
document.getElementById('rankBoard').style.display        = "none";
// Quay về
returnBtn.addEventListener('click', ()=>{
    resetGame();
});
// Bắt đầu
startBtn.addEventListener('click', ()=>{
    document.getElementById('main').style.display           = "none";
    document.getElementById('rankBtn').style.display        = "none";
    document.getElementById('docBtn').style.display         = "none";
    document.getElementById('start').style.display          = "flex";
    document.getElementById('returnBtn').style.display      = "flex";
    document.getElementById('score').style.display          = "flex";
    document.getElementById('preQuestionBtn').style.display = "flex";
});
// Pre-question board
preQuestionBoardBtn.addEventListener('click', ()=>{
    document.getElementById('main').style.display             = "none";
    document.getElementById('preQuestionBoard').style.display = "flex";
    document.getElementById('returnBtn').style.display        = "flex";
});
// Ranking-Board
rankBtn.addEventListener('click',()=>{
    document.getElementById('main').style.display             = "none";
    document.getElementById('rankBoard').style.display        = "flex";
    document.getElementById('returnBtn').style.display        = "flex";
});
// Save scrore
saveScoreBtn.addEventListener('click',()=>{
    document.getElementById("gif").src= gif[getRandomInt(gif.length)];
    const o_username = document.getElementById('username').value;
    const o_point    = document.getElementById('score')
    const o_question = MAX_QUESTIONS;
    // Không biết tại sao nhưng counter = 1 ở lần 2 trở đi thì nó không dư
    questionCounter  = 1;
    score            = 0;
    resetGame();
})
// Reset
function resetGame(){
    document.getElementById('main').style.display             = "flex";
    document.getElementById('rankBtn').style.display          = "flex";
    document.getElementById('docBtn').style.display           = "flex";
    document.getElementById('start').style.display            = "none";
    document.getElementById('end').style.display              = "none";
    document.getElementById('returnBtn').style.display        = "none";
    document.getElementById('score').style.display            = "none";
    document.getElementById('preQuestionBtn').style.display   = "none";
    document.getElementById('preQuestionBoard').style.display = "none";
    document.getElementById('rankBoard').style.display        = "none"; 
}
//start
let questions =[...n3,...n4,...n5];   // vì nó trỏ đến các mảng khác nên ưu tiên để lên đây
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const scoreText = document.querySelector('#score');
let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []
const SCORE_POINTS = 1;

let MAX_QUESTIONS = questions.length;
// document.getElementById("number-box").value = 1; 
document.getElementById("number-box").value = questions.length;
function getInputValue(){
    var inputVal = document.getElementById("number-box").value;
    MAX_QUESTIONS = inputVal - 1;
    document.getElementById("number-box").innerText = inputVal;
    questionCounter = 1;
}
//------------------------------------------>
// Lưu lại tổng số câu ra chỗ riêng
let indexQuestions= [];
indexQuestions = questions;
function changeLevel_All(){
    level.innerText= "N0";
    level.style = "background: #000;  color: #fff;"
    questions = indexQuestions;
    MAX_QUESTIONS = questions.length;
    document.getElementById("number-box").value = questions.length;
    playAudio('./assets/audio/pop.wav');
    startGame();
}

function changeLevel_N3(){
    questions = n3;
    level.innerText= "N3";
    level.style = "background: #FDC830;  color: #fff;"
    MAX_QUESTIONS = questions.length;
    document.getElementById("number-box").value = questions.length;
    playAudio('./assets/audio/pop.wav');
    startGame();
}

function changeLevel_N4(){
    questions = n4;
    level.innerText= "N4";
    level.style = "background: #009FFF;  color: #fff;"
    MAX_QUESTIONS = questions.length;
    document.getElementById("number-box").value = questions.length;
    playAudio('./assets/audio/pop.wav');
    startGame();
}

function changeLevel_N5(){
    questions = n5;
    level.innerText= "N4";
    level.style = "background: #0f9b0f;  color: #fff;"
    MAX_QUESTIONS = questions.length;
    document.getElementById("number-box").value = questions.length;
    playAudio('./assets/audio/pop.wav');
    startGame();
}

//------------------------------------------>
function startGame(){
    // Bắt đầu và gán các giá trị vào Current question

    document.getElementById("gif").src= gif[getRandomInt(gif.length)];
    endtext.innerText = comment[getRandomInt(comment.length)];
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

function endGame(){
    document.getElementById('start').style.display = "none";
    document.getElementById('end').style.display = "flex";
    document.getElementById('returnBtn').style.display = "none";
    document.getElementById('score').style.display="none";
}
const preQuestionBtn = document.getElementById("preQuestionBtn");
let   preQuestion =[];
let   preAnswer   =[];
let   preId       =[];
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        // localStorage.setItem('mostRecentScore', score);
        endGame();
    }
    questionCounter++;
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    // Đẩy câu hỏi từ database vào question
    question.innerText = currentQuestion.id +':  '+currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })
    
    // Lưu lại giá trị trước khi cắt
    preId.push(currentQuestion.id);
    preQuestion.push(currentQuestion.question);
    preAnswer.push(currentQuestion['choice'+currentQuestion.answer]);
    preQuestionBtn.innerText = preQuestion[preQuestion.length-2];
    // Cho vào preQuestionBoard
    if (preQuestion.length-2>-1)
    preQuestionBoard__list.innerHTML += 
    `<li><p class='list__left'>${preId[preQuestion.length-2]}: ${preQuestion[preQuestion.length-2]}</p><p class='list__right'>${preAnswer[preQuestion.length-2]}</p></li>`
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
        setTimeout(() => {
            selectedChoice.classList.remove(classToApply);
            getNewQuestion()
        }, 1000)
    })
})
let maxScore= (MAX_QUESTIONS+1);
incrementScore = num => {
    score +=num
    scoreText.innerText = score
    finalScore.innerText = `${score}/${MAX_QUESTIONS+1}`
    percent.innerText = `${Math.round(Math.fround(score/(MAX_QUESTIONS+1))*100)}%`;
}
//--------------------------------------------->



//--------------------------------------------->
function playAudio(url) {
    new Audio(url).play();
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
comment = [
    'Chiến thần Nhật Ngữ',
    'Giỏi quá bạn ơi',
    'Sugoi Sugoi Onii-chan',
    '🙌万歳🙌',
    'Gì vậy trời',
    'Chiến thần N1',
    'Gòi xong tới công chuyện',
    'Rất xinh đẹp, tuyệt vời',
    'Đi lối này thưa ngài',
    'Kẻ hủy diệt Kanji',
    'Xin chào, tổng tư lệnh',
    '日本語が上手ですね！',
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

var bg_count= 0;
bg = [
    'background: linear-gradient(to right,#0f0c29,#302b63,#24243e) !important',
    'background: linear-gradient(to right,#0F2027,#203A43,#2C5364) !important',
    'background: linear-gradient(to right,#2c3e50,#2c3e50) !important',
    'background: linear-gradient(to right,#093028,#093028) !important',
    'background: linear-gradient(to right,#000428,#004e92) !important',
    'background: linear-gradient(to right,#434343,#004e92) !important',
    'background: linear-gradient(to right,#232526,#414345) !important',
];

var qbg_count= 0;
const qbg = [
    'background: #000; color: #fff;',
    'background: #000; color: #FDC830;',
    'background: #FDC830; color: #000;',
    'background: #fff; color: #000;',
]

// Khởi tạo frame, gif, comment ngẫu nhiên
document.getElementById("frame").src=frame[getRandomInt(frame.length)];
document.getElementById("gif").src= gif[getRandomInt(gif.length)];
endtext.innerText = comment[getRandomInt(comment.length)];

// Đổi màu frame tanuki khi click
document.querySelector('#frame').addEventListener('click', (e)=>{
    e.target.src=frame[getRandomInt(frame.length)];
    document.querySelector('#wrapper').style= bg[bg_count++];
    if (bg_count == bg.length) bg_count= 0;
    playAudio('./assets/audio/pop.wav');
})

//Click vào câu hỏi đổi màu
document.querySelector('.content-box__quiz').addEventListener('click',(e)=>{
    if (qbg_count == qbg.length) qbg_count= 0;
    e.target.style=qbg[qbg_count++];
})

 //--------------------
    

//---------------------
startGame();