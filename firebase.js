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
    let newID = getRandomInt(999)
    set(ref(db, "TheStudents/"  + newID),{
        RollNo: newID,
        Level: level.innerText,
        NameOfStd: name.value,
        Score: `${score}/${MAX_QUESTIONS+1}`,
        Percent: `${Math.round(Math.fround(score/(MAX_QUESTIONS+1))*100)}%`,
        TimeToDone: `${totalSeconds}s` ,
        Time: localTime
    })
    // .then(()=>{
    //     alert("Insert Successfully");
    // })
    .catch((error)=>{
        alert("Unsuccessfully, error" + error);
    });
}
saveScoreBtn.addEventListener('click', InsertData)

//-------------------------------------------------------Select Data
// function SelectData(){
//     const dbref = ref(db);
//     get(child(dbref, "TheStudents/" + rollbox.value)).then((snapshot)=>{
//         if (snapshot.exists()){
//             namebox.value = snapshot.val().NameOfStd;
//             rollbox.value = snapshot.val().RollNo;
//             secbox.value = snapshot.val().Section;
//         }
//         else{
//             alert("No data found");
//         }
//     })
//     .catch((error)=>{
//         alert("Unsuccessfully, error" + error);
//     });
// }
// selbtn.addEventListener('click', SelectData)
//-------------------------------------------------------Update Data
// function UpdateData(){
//     update(ref(db, "TheStudents/"  + rollbox.value),{
//         NameOfStd: namebox.value,
//         RollNo: rollbox.value,
//         Section: secbox.value,
//         // Gender: genbox.value,
//     })
//     .then(()=>{
//         alert("Update Successfully");
//     })
//     .catch((error)=>{
//         alert("Unsuccessfully, error" + error);
//     })

// }
// updbtn.addEventListener('click', UpdateData)
//-------------------------------------------------------Delete Data
// function DeleteData(){
//     remove(ref(db, "TheStudents/"  + rollbox.value))
//     .then(()=>{
//         alert("Delete Successfully");
//     })
//     .catch((error)=>{
//         alert("Unsuccessfully, error" + error);
//     })

// }
// delbtn.addEventListener('click', DeleteData)
//------------------------------------------------------------

function CreateList(){
    const dbref = ref(db);
    const mylist = document.getElementById('rankList'); 
    mylist.innerHTML = '';
    for (let i = 0 ; i< 999 ; i++){
        get(child(dbref, "TheStudents/" + i)).then((snapshot)=>{
        if (snapshot.exists()){
            mylist.innerHTML += `<li> 
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
    }

};
document.getElementById('rankBtn').addEventListener('click',CreateList);