const wrapper                = document.querySelector('#wrapper');
const main                   = document.querySelector('#main');
const start                  = document.querySelector('#start');
const startBtn               = document.querySelector('.startBtn');
const returnBtn              = document.querySelector('.returnBtn');
const scoreBtn               = document.querySelector('#score');
const preQuestionBoardBtn    = document.querySelector('.preQuestionBoardBtn');
const preQuestionBoard__list = document.querySelector('#preQuestionBoard__list');
const rankBtn                = document.querySelector('#rankBtn');
const rankBoard__list        = document.querySelector('#rankList');
const saveScoreBtn           = document.querySelector('#saveScoreBtn');
const finalScore             = document.querySelector("#finalScore");
const endtext                = document.querySelector('#end-text');
const percent                = document.querySelector('#percentCorrect');
const level                  = document.querySelector('#level');
const analyticBtn            = document.querySelector('#analyticBtn');
const certificate            = document.querySelector('#certificate');
const contentbox             = document.querySelector('#content-box');
const searchBtn              = document.querySelector('#searchBtn');
analyticBtn.addEventListener('click', ()=>{
    main.style.display = "none";
    certificate.style.display = "flex";
    returnBtn.style.display= "flex";
    analyticBtn.style.display= "none";
    searchBtn.style.display = "flex";
    playAudio('./assets/audio/pop.wav');
})
// Khởi tạo
document.getElementById('main').style.display             = "flex";
document.getElementById('start').style.display            = "none";
document.getElementById('end').style.display              = "none";
document.getElementById('returnBtn').style.display        = "none";
document.getElementById('score').style.display            = "none";
document.getElementById('preQuestionBtn').style.display   = "none";
document.getElementById('preQuestionBoard').style.display = "none";
document.getElementById('rankBoard').style.display        = "none";
document.getElementById('certificate').style.display      = "none";

// Quay về
returnBtn.addEventListener('click', ()=>{
    playAudio('./assets/audio/pop.wav');
    resetGame();
});
// Bắt đầu
startBtn.addEventListener('click', ()=>{
    document.getElementById('main').style.display           = "none";
    document.getElementById('rankBtn').style.display        = "none";
    document.getElementById('docBtn').style.display         = "none";
    document.getElementById('analyticBtn').style.display    = "none";
    document.getElementById('start').style.display          = "flex";
    document.getElementById('returnBtn').style.display      = "flex";
    document.getElementById('score').style.display          = "flex";
    document.getElementById('preQuestionBtn').style.display = "flex";
    playAudio('./assets/audio/pop.wav');
    startBtn.style = 'color: #fff; background: #5105E0';
    startBtn.innerHTML = '<p>Tiếp tục</p>'
});
// Pre-question board
preQuestionBoardBtn.addEventListener('click', ()=>{
    document.getElementById('main').style.display             = "none";
    document.getElementById('preQuestionBoard').style.display = "flex";
    document.getElementById('returnBtn').style.display        = "flex";
    document.getElementById('analyticBtn').style.display      = "none";
    playAudio('./assets/audio/pop.wav');
});
// Ranking-Board
rankBtn.addEventListener('click',()=>{
    document.getElementById('main').style.display             = "none";
    document.getElementById('rankBoard').style.display        = "flex";
    document.getElementById('returnBtn').style.display        = "flex";
    document.getElementById('analyticBtn').style.display      = "none";
    document.getElementById('certificate').style.display      = "none";
    document.getElementById('frame').style.display         = "none";
    playAudio('./assets/audio/pop.wav');
});
// Save scrore
let o_name = ''
let o_point    = 0
let o_question = 0

saveScoreBtn.addEventListener('click',()=>{
    document.getElementById("gif").src= gif[getRandomInt(gif.length)];
    o_question = MAX_QUESTIONS;
    o_name     = document.getElementById('username').value
    document.querySelector('.o_name').innerText= o_name;
    // Không biết tại sao nhưng counter = 1 ở lần 2 trở đi thì nó không dư
    questionCounter      = 1;
    score                = 0;
    totalSeconds         = 0;
    finalScore.innerText = '0';
    percent.innerText    = '0%';
    scoreBtn.innerText   = '0';
    startBtn.innerHTML   = '<i class="fas fa-play"></i>';
    resetGame();

    // document.getElementById('end').style.display         = "none";
    // document.getElementById('certificate').style.display = "flex";
    // document.getElementById('returnBtn').style.display   = "flex";
})
// Reset
function resetGame(){
    document.getElementById('main').style.display             = "flex";
    document.getElementById('rankBtn').style.display          = "flex";
    document.getElementById('docBtn').style.display           = "flex";
    document.getElementById('analyticBtn').style.display      = "flex";
    document.getElementById('frame').style.display            = "flex";
    document.getElementById('certificate').style.display      = "none";
    document.getElementById('start').style.display            = "none";
    document.getElementById('end').style.display              = "none";
    document.getElementById('returnBtn').style.display        = "none";
    document.getElementById('score').style.display            = "none";
    document.getElementById('preQuestionBtn').style.display   = "none";
    document.getElementById('preQuestionBoard').style.display = "none";
    document.getElementById('rankBoard').style.display        = "none";
    document.getElementById('searchBtn').style.display        = "none"; 
}
//start
let questions =[...n3,...n4];   // vì nó trỏ đến các mảng khác nên ưu tiên để lên đây
const question  = document.querySelector('#question');
const choices   = Array.from(document.querySelectorAll('.choice-text'));
const scoreText = document.querySelector('#score');
const preQuestionBtn = document.getElementById("preQuestionBtn");
const SCORE_POINTS     = 1;
let currentQuestion    = {}
let acceptingAnswers   = true
let score              = 0
let questionCounter    = 0
let availableQuestions = []
let   preQuestion =[];
let   preAnswer   =[];
let   preId       =[];
let MAX_QUESTIONS = questions.length;
// document.getElementById("number-box").value = 1; 
document.getElementById("number-box").value = questions.length;
// function getInputValue(){
document.querySelector('#number-box').addEventListener('keyup', () =>{
    playAudio('./assets/audio/pop.wav');
    var inputVal = document.getElementById("number-box").value;
    MAX_QUESTIONS = inputVal - 1;
    document.getElementById("number-box").innerText = inputVal;
    questionCounter = 1;
    totalSeconds    = 0;
    document.getElementById('count').innerText = `${questionCounter}/${MAX_QUESTIONS+1}`
    document.querySelector('.o_list').innerHTML = '';
    startBtn.innerHTML   = '<i class="fas fa-play"></i>';
    //Reset chart
    labels.splice(0,labels.length);
    secondCount = 0;
    data.datasets[0].data.splice(0,data.datasets[0].data.length);
    data.datasets[1].data.splice(0,data.datasets[1].data.length);
    steak = 1;
    plus  = 1;
    chart.update();
})

//------------------------------------------>
// Lưu lại tổng số câu ra chỗ riêng
let indexQuestionsFull= [...n3,...n4];
function changeLevel_Full(){
    level.innerText= "Tự do";
    contentbox.innerText= "Tất cả";
    score= 0;
    document.querySelector('.level-box').innerText = "Tất cả";
    level.style = "background: #000;  color: #fff;"
    startBtn.innerHTML   = '<i class="fas fa-play"></i>';
    document.querySelector('.o_list').innerHTML = '';
    questions = indexQuestionsFull;
    MAX_QUESTIONS = questions.length;
    document.getElementById("number-box").value = questions.length;
    closeChoiceBoard();
    startGame();
}
let indexQuestionsN3= [...n3kanji,...n3bunpou];
function changeLevel_N3All(){
    level.innerText= "Tự do";
    contentbox.innerText= "Tự do N3";
    score= 0;
    document.querySelector('.level-box').innerText = "Tự do N3";
    level.style = "background: #000;  color: #fff;"
    startBtn.innerHTML   = '<i class="fas fa-play"></i>';
    document.querySelector('.o_list').innerHTML = '';
    questions = indexQuestionsN3;
    MAX_QUESTIONS = questions.length;
    document.getElementById("number-box").value = questions.length;
    closeChoiceBoard();
    startGame();
}
let indexQuestionsN4= [...n4kanji,...n4bunpou];
function changeLevel_N4All(){
    level.innerText= "Tự do";
    contentbox.innerText= "Tự do N4";
    score= 0;
    document.querySelector('.level-box').innerText = "Tự do N4";
    level.style = "background: #000;  color: #fff;"
    startBtn.innerHTML   = '<i class="fas fa-play"></i>';
    document.querySelector('.o_list').innerHTML = '';
    questions = indexQuestionsN4;
    MAX_QUESTIONS = questions.length;
    document.getElementById("number-box").value = questions.length;
    closeChoiceBoard();
    startGame();
}

function changeLevel_kanjiN3(){
    questions = n3kanji;
    level.innerText= "Kanji N3";
    contentbox.innerText = "Kanji N3";
    document.querySelector('.level-box').innerText = "Kanji N3";
    score= 0;
    scoreBtn.innerText = 0;
    startBtn.innerHTML   = '<i class="fas fa-play"></i>';
    level.style = "background: #FDC830;  color: #fff;"
    document.querySelector('.o_list').innerHTML = '';
    MAX_QUESTIONS = questions.length;
    document.getElementById("number-box").value = questions.length;
    closeChoiceBoard();
    startGame();
}

function changeLevel_kanjiN4(){
    questions = n4;
    level.innerText= "Kanji N4";
    contentbox.innerText = "Kanji N4";
    document.querySelector('.level-box').innerText = "Kanji N4";
    score= 0;
    scoreBtn.innerText = 0;
    startBtn.innerHTML   = '<i class="fas fa-play"></i>';
    document.querySelector('.o_list').innerHTML = '';
    level.style = "background: #009FFF;  color: #fff;"
    MAX_QUESTIONS = questions.length;
    document.getElementById("number-box").value = questions.length;
    closeChoiceBoard();
    startGame();
}


// let indexQuestionsBunpou= [...n3bunpou];
// function changeLevel_bunpouAll(){
//     level.innerText= "Tự do";
//     contentbox.innerText= "Tự do";
//     score= 0;
//     document.querySelector('.level-box').innerText = "Tự do";
//     level.style = "background: #000;  color: #fff;"
//     startBtn.innerHTML   = '<i class="fas fa-play"></i>';
//     document.querySelector('.o_list').innerHTML = '';
//     questions = indexQuestionsBunpou;
//     MAX_QUESTIONS = questions.length;
//     document.getElementById("number-box").value = questions.length;
//     closeChoiceBoard();
//     startGame();
// }
function changeLevel_bunpouN3(){
    questions = n3bunpou;
    level.innerText= "Bunpou N3";
    contentbox.innerText = "Bunpou N3";
    document.querySelector('.level-box').innerText = "Bunpou N3";
    score= 0;
    scoreBtn.innerText = 0;
    startBtn.innerHTML   = '<i class="fas fa-play"></i>';
    level.style = "background: #FDC830;  color: #fff;"
    document.querySelector('.o_list').innerHTML = '';
    MAX_QUESTIONS = questions.length;
    document.getElementById("number-box").value = questions.length;
    closeChoiceBoard();
    startGame();
}
function changeLevel_bunpouN4(){
    questions = n4bunpou;
    level.innerText= "Bunpou N4";
    contentbox.innerText = "Bunpou N4";
    document.querySelector('.level-box').innerText = "Bunpou N4";
    score= 0;
    scoreBtn.innerText = 0;
    startBtn.innerHTML   = '<i class="fas fa-play"></i>';
    level.style = "background: #FDC830;  color: #fff;"
    document.querySelector('.o_list').innerHTML = '';
    MAX_QUESTIONS = questions.length;
    document.getElementById("number-box").value = questions.length;
    closeChoiceBoard();
    startGame();
}


function openChoiceBoard(){
    document.getElementById('choiceContentBoard').style.display = "flex";
}
function closeChoiceBoard(){
    playAudio('./assets/audio/pop.wav');
    document.getElementById('choiceContentBoard').style.display = "none";
}
document.getElementById('content-box').addEventListener('click', openChoiceBoard)
document.getElementById('closeBtn').addEventListener('click',closeChoiceBoard)
document.getElementById('allFull').addEventListener('click',changeLevel_Full)
document.getElementById('allN3').addEventListener('click',changeLevel_N3All)
document.getElementById('allN4').addEventListener('click',changeLevel_N4All)
document.getElementById('kanjiN3').addEventListener('click',changeLevel_kanjiN3)
document.getElementById('kanjiN4').addEventListener('click',changeLevel_kanjiN4)
// document.getElementById('kanjiN5').addEventListener('click',changeLevel_kanjiN5)
// document.getElementById('bunpouAll').addEventListener('click',changeLevel_bunpouAll)
document.getElementById('bunpouN3').addEventListener('click',changeLevel_bunpouN3)
document.getElementById('bunpouN4').addEventListener('click',changeLevel_bunpouN4)

//------------------------------------------>
function startGame(){
    //Reset chart
    correct = [];
    totalSeconds = 0;
    secondCount = 0;
    labels.splice(0,labels.length);
    data.datasets[0].data.splice(0,data.datasets[0].data.length);
    data.datasets[1].data.splice(0,data.datasets[1].data.length);
    steak = 1;
    plus  = 1;
    chart.update();
    // Bắt đầu và gán các giá trị vào Current question
    document.querySelector('.o_list').innerHTML = '';
    document.querySelector('.o_score').innerText= 0+'/'+questions.length;
    document.getElementById("gif").src= gif[getRandomInt(gif.length)];
    endtext.innerText = comment[getRandomInt(comment.length)];
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}
function endGame(){
    document.querySelector('.o_time').innerText = `${pad(parseInt(totalSeconds / 3600))}:${pad(parseInt(totalSeconds / 60)%60)}:${pad(totalSeconds % 60)}`;
    totalSeconds = 0;
    document.getElementById('start').style.display = "none";
    document.getElementById('end').style.display = "flex";
    document.getElementById('returnBtn').style.display = "none";
    document.getElementById('score').style.display="none";
    document.getElementById('preQuestionBtn').style.display="none";
    document.getElementById('analyticBtn').style.display = "flex";
    questionCounter = 0;
}

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
    secondCount = 0;
    // Lưu lại giá trị trước khi cắt
    preId.push(currentQuestion.id);
    preQuestion.push(currentQuestion.question);
    preAnswer.push(currentQuestion['choice'+currentQuestion.answer]);
    preQuestionBtn.innerText = preId[preQuestion.length-2]+' '+preQuestion[preQuestion.length-2];
    // Cho vào preQuestionBoard
    if (preQuestion.length-2>-1)
    preQuestionBoard__list.innerHTML += 
    `<li><p class='list__left'>${preId[preQuestion.length-2]}: ${preQuestion[preQuestion.length-2]}</p><p class='list__right'>${preAnswer[preQuestion.length-2]}</p></li>`
    //-------
    availableQuestions.splice(questionsIndex, 1);
    acceptingAnswers = true;
    document.getElementById('count').innerText = `${questionCounter}/${MAX_QUESTIONS+1}`
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
        if(classToApply === 'correct') {
            correct.push(1);
            incrementScore(SCORE_POINTS);
            document.querySelector('.o_list').innerHTML += `<li class = "true overview">${currentQuestion.id}</li>`
        }
        else{
            steak = 1;
            correct.push(0);
            labels.push(currentQuestion.id);
            data.datasets[0].data.push(plus);
            data.datasets[1].data.push(steak);
            
            chart.update();
            document.querySelector('.o_list').innerHTML += `<li class = "false overview">${currentQuestion.id}</li>`
        }
        selectedChoice.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.classList.remove(classToApply);
            getNewQuestion()
        }, 1000)
        data.datasets[2].data.push(Math.floor(secondCount));
        chart.update();
    })
})
let maxScore= MAX_QUESTIONS+1;
incrementScore = num => {
    score +=num
    scoreText.innerText = score
    finalScore.innerText = `${score}/${MAX_QUESTIONS+1}`
    document.querySelector('.o_score').innerText = `${score}/${MAX_QUESTIONS+1}`
    percent.innerText = `${Math.round(Math.fround(score/(MAX_QUESTIONS+1))*100)}%`;
    labels.push(currentQuestion.id);
    data.datasets[0].data.push(++plus);
    data.datasets[1].data.push(++steak);
    chart.update();
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
    'background: linear-gradient(to right,#232526,#414345)',
    'background: linear-gradient(to right,#093028,#093028)',
    'background: linear-gradient(rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.2)), url("./assets/theme/Itsukishima Gate Japan/ItsukishimaGateJapan-day/ItsukishimaGateJapan-day.png")',
    'background: linear-gradient(rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.2)),url("./assets/theme/Itsukishima Gate Japan/ItsukishimaGateJapan-sunset/ItsukishimaGateJapan-sunset.png")',
    'background: url("./assets/theme/Itsukishima Gate Japan/ItsukishimaGateJapan-night/ItsukishimaGateJapan-night.png")',
    'background: linear-gradient(rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.2)),url("./assets/theme/Mt. Fuji Japan/Mt.FujiJapan-day/Mt.FujiJapan-day.png")',
    'background: linear-gradient(rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.2)),url("./assets/theme/Mt. Fuji Japan/Mt.FujiJapan-sunset/Mt.FujiJapan-sunset.png")',
    'background: url("./assets/theme/Mt. Fuji Japan/Mt.FujiJapan-night/Mt.FujiJapan-night.png")',
    'background: linear-gradient(to right,#0f0c29,#302b63,#24243e)',
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
class kappa
{
    on(){
        frame.push('./assets/images/Frame-4.png','./assets/images/Frame-5.png','./assets/images/Frame-6.png');
    };

}
let  rule = new kappa();

// Đếm giờ
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var hoursLabel = document.getElementById("hours");
var totalSeconds =0;
setInterval(setTime, 1000);
function setTime() {
  ++totalSeconds;
  ++secondCount;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60)%60);
  hoursLabel.innerHTML   = pad(parseInt(totalSeconds / 3600));
}
function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}
//---------------------> CHART
let plus = 1;
let steak = 1;
let secondCount = 1;
let correct = [];
let currentquestionID = [];
const labels = [];
const data = {
labels: labels,
datasets: [
{label: 'Đúng', backgroundColor: '#0f9b0f', borderColor: '#0f9b0f', data: []},
{label: 'Steak', backgroundColor: '#FDC830', borderColor: '#FDC830', data: []},
{label: 'Thời gian', backgroundColor: '#5105E0', borderColor: '#5105E0', data: []},
]};
const config = { type: 'line', data: data, options: {}};
// Tạo chart
var chart = new Chart(document.getElementById('chart'),config);

//---------------------
startGame();
