// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-analytics.js";
import { getDatabase, set, get , ref , child , update, remove  } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZRqlpePG3xa5jJmW6uT2PnRj9QSLyr98",
  authDomain: "quiz-app-b9423.firebaseapp.com",
  databaseURL: "https://quiz-app-b9423-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "quiz-app-b9423",
  storageBucket: "quiz-app-b9423.appspot.com",
  messagingSenderId: "763027247251",
  appId: "1:763027247251:web:f3e3d760d94dfe822a3d66",
  measurementId: "G-E0Q1NG8WFE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
//-------------------

var name = document.getElementById('username');
const d = new Date();
const localTime = d.toLocaleString();

//-------------------------------------------------------Insert Data
function InsertData(){
    let newID = `${10000-(5000 + score * 2 - (MAX_QUESTIONS-score)*2 - Math.floor(totalSeconds/60))}`
    set(ref(db, `${level.innerText}/` + newID),{
        RollNo: newID,
        Level: contentbox.innerText,
        NameOfStd: name.value,
        Score: document.querySelector('.o_score').innerText,
        Percent: `${Math.round(Math.fround(score/(MAX_QUESTIONS+1))*100)}%`,
        TimeToDone: document.querySelector('.o_time').innerText,
        Time: localTime,
        questionID: labels,
        chart_correct: data.datasets[0].data,
        chart_steak: data.datasets[1].data,
        chart_count: data.datasets[2].data,
        chart_check: correct,
    })
    .catch((error)=>{
        alert("Unsuccessfully, error" + error);
    });
}
saveScoreBtn.addEventListener('click', InsertData)

//-------------------------------------------------------Select List Data

var badge=1;
function CreateList(level){
    const dbref = ref(db);
    const mylist = document.getElementById('rankList'); 
    mylist.innerHTML = '';
        get(child(dbref, `${level}`))
        .then((snapshot)=>{
            var box = [];

            snapshot.forEach(childSnapshot => {
                box.push(childSnapshot.val());
            });
            mylist.innerHTML = "";
            box.forEach((e) =>{                
                mylist.innerHTML += `<li>
                <span class="id">${e.RollNo}</span>
                <img src="./assets/images/trophy-${badge++}.png">
                <span class="name">${e.NameOfStd}</span>
                <span class="level">${e.Level}</span>
                <span class="point">${e.Score}</span>
                <span class="percent">${e.Percent}</span>
                <span class="timeToDone">${e.TimeToDone}</span>
                <span class="time">${e.Time}</span>
                </li>`  
            })
        })
        .catch((error)=>{
            alert("Lỗi rồi lão đại" + error);
        });
};


function removeActive(){
    document.querySelector('.rankAllBtn').classList.remove('btn-active');
    document.querySelector('.rankKanjiN3Btn').classList.remove('btn-active');
    document.querySelector('.rankKanjiN4Btn').classList.remove('btn-active');
    document.querySelector('.rankBunpouN3Btn').classList.remove('btn-active');
    document.querySelector('.rankBunpouN4Btn').classList.remove('btn-active');
    badge = 1;
}
var LEVEL
document.getElementById('rankBtn').addEventListener('click',()=>{
    CreateList('Tự do');
    LEVEL = 'Tự do';
    document.querySelector('.rankAllBtn').classList.add('btn-active');
});

document.querySelector('.rankAllBtn').addEventListener('click', () =>{
    removeActive();
    LEVEL = 'Tự do';
    CreateList('Tự do');
    document.querySelector('.rankAllBtn').classList.add('btn-active');
});
document.querySelector('.rankKanjiN3Btn').addEventListener('click', () =>{
    removeActive();
    LEVEL = 'Kanji N3';
    CreateList('Kanji N3');
    document.querySelector('.rankKanjiN3Btn').classList.add('btn-active');
});
document.querySelector('.rankKanjiN4Btn').addEventListener('click', () =>{
    removeActive();
    LEVEL = 'Kanji N4';
    CreateList('Kanji N4');
    document.querySelector('..rankKanjiN4Btn').classList.add('btn-active');
});
document.querySelector('.rankBunpouN3Btn').addEventListener('click', () =>{
    removeActive();
    LEVEL = 'Bunpou N3';
    CreateList('Bunpou N3');
    document.querySelector('.rankBunpouN3Btn').classList.add('btn-active');
});
document.querySelector('.rankBunpouN4Btn').addEventListener('click', () =>{
    removeActive();
    LEVEL = 'Bunpou N4';
    CreateList('Bunpou N4');
    document.querySelector('.rankBunpouN4Btn').classList.add('btn-active');
});
var ID
searchBtn.addEventListener('click', ()=>{
    LEVEL = prompt("HẠNG MỤC:")
    ID = prompt("NHẬP VÀO ID:");
     
    const dbref = ref(db);
    get(child(dbref, `${LEVEL}/${ID}`)).then((snapshot)=>{
        if (snapshot.exists()){
            document.querySelector('.o_list').innerHTML = '';
            document.querySelector('.level-box').innerText = LEVEL
            document.querySelector('.o_name').innerText = snapshot.val().NameOfStd
            document.querySelector('.o_score').innerText = snapshot.val().Score
            document.querySelector('.o_time').innerText = snapshot.val().TimeToDone
            for (let i = 0 ; i < snapshot.val().questionID.length; i++){
                if (snapshot.val().chart_check[i] == 1)
                {document.querySelector('.o_list').innerHTML += `<li class = "true overview">${snapshot.val().questionID[i]}</li>`}
                else
                {document.querySelector('.o_list').innerHTML += `<li class = "false overview">${snapshot.val().questionID[i]}</li>`}
            }
            labels.splice(0,labels.length);
            data.datasets[0].data.splice(0,data.datasets[0].data.length);
            data.datasets[1].data.splice(0,data.datasets[1].data.length);
            data.datasets[2].data.splice(0,data.datasets[2].data.length);
            for (let j = 0 ; j < snapshot.val().chart_correct.length ; j++){
                labels.push(snapshot.val().questionID[j])
                data.datasets[0].data.push(snapshot.val().chart_correct[j])
                data.datasets[1].data.push(snapshot.val().chart_steak[j])
                data.datasets[2].data.push(snapshot.val().chart_count[j])
            }
            chart.update();
        }
        else{
            alert("Không có dữ liệu");
        }
    })        
})
