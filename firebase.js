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
    let newID = `${10000-(5000 + score - (MAX_QUESTIONS-score))}`
    set(ref(db, `${level.innerText}/` + newID),{
        RollNo: newID,
        Level: level.innerText,
        NameOfStd: name.value,
        Score: document.querySelector('.o_score').innerText,
        Percent: `${Math.round(Math.fround(score/(MAX_QUESTIONS+1))*100)}%`,
        TimeToDone: document.querySelector('.o_time').innerText,
        Time: localTime
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
    let i = 0;
    while (i < 9999){
        get(child(dbref, `${level}/` + i)).then((snapshot)=>{
            if (snapshot.exists()){
                mylist.innerHTML += `<li>
                <img src="./assets/images/trophy-${badge++}.png">
                <span class="name">${snapshot.val().NameOfStd}</span>
                <span class="level">${snapshot.val().Level}</span>
                <span class="point">${snapshot.val().Score}</span>
                <span class="percent">${snapshot.val().Percent}</span>
                <span class="timeToDone">${snapshot.val().TimeToDone}</span>
                <span class="time">${snapshot.val().Time}</span>
                </li>`  
            }
        })
        .catch((error)=>{
            alert("Lỗi rồi lão đại" + error);
        });
        i++;
    }
};
function removeActive(){
    document.querySelector('.rankAllBtn').classList.remove('btn-active');
    document.querySelector('.rankN2Btn').classList.remove('btn-active');
    document.querySelector('.rankN3Btn').classList.remove('btn-active');
    document.querySelector('.rankN4Btn').classList.remove('btn-active');
    document.querySelector('.rankN5Btn').classList.remove('btn-active');
    badge = 1;
}

document.getElementById('rankBtn').addEventListener('click',()=>{
    // CreateList('All');
    // CreateList('N2');
    CreateList('N3');
    document.querySelector('.rankN3Btn').classList.add('btn-active');

    // CreateList('N4');
    // CreateList('N5');
});

document.querySelector('.rankAllBtn').addEventListener('click', () =>{
    removeActive();
    CreateList('Tự do');
    document.querySelector('.rankAllBtn').classList.add('btn-active');
});
document.querySelector('.rankN2Btn').addEventListener('click', () =>{
    removeActive();
    CreateList('N2');
    document.querySelector('.rankN2Btn').classList.add('btn-active');
});
document.querySelector('.rankN3Btn').addEventListener('click', () =>{
    removeActive();
    CreateList('N3');
    document.querySelector('.rankN3Btn').classList.add('btn-active');
});
document.querySelector('.rankN4Btn').addEventListener('click', () =>{
    removeActive();
    CreateList('N4');
    document.querySelector('.rankN4Btn').classList.add('btn-active');
});
document.querySelector('.rankN5Btn').addEventListener('click', () =>{
    removeActive();
    CreateList('N5');
    document.querySelector('.rankN5Btn').classList.add('btn-active');
});