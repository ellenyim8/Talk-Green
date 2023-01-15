import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, child, get, set, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABlfaefTsCRMoVBCd9sIUmS0Sedv6XPLk",
  authDomain: "talk-g-f00a3.firebaseapp.com",
  databaseURL: "https://talk-g-f00a3-default-rtdb.firebaseio.com/",
  projectId: "talk-g-f00a3",
  storageBucket: "talk-g-f00a3.appspot.com",
  messagingSenderId: "825274928575",
  appId: "1:825274928575:web:af4427edede903d428650a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let database = getDatabase(app);

console.log(database);

if(window.location.pathname.endsWith('login.html')){
document.getElementById("login-button").addEventListener("click", login);
}

function login(event) {
  let theUsername=document.getElementById("username-input").value;
  let thePassword=document.getElementById("password-input").value;
  console.log(theUsername);
  console.log(thePassword);
  let loginReference = ref(database, 'talkgreen/login/'+theUsername);
  console.log(loginReference);
  onValue(loginReference, (snapshot)=>{
    const data = snapshot.val();
    if(data===null){
      console.log("else statement execute");
      set(ref(database, 'talkgreen/login/'+theUsername), {
        username: theUsername,
        password: thePassword
      });
      console.log("new user made");
      location.href='get-start.html'
      console.log("redirected");
    }
    console.log('data', data);
    if(theUsername===data.username){
      console.log("usercorrect");
      if(thePassword===data.password){
        location.href='get-start.html';
        console.log("correct");
      } else {
        alert("Wrong password! Please try again.");
        console.log("wrong pass");
      }
    }
  })

  //take user to get-start
  //location.href='get-start.html';
}

//let thisRepName = null;

function render() {
  document.getElementById("button").style.display = "none";
  const repNames = document.getElementById('rep-names-div');
  repNames.innerHTML = '';
  console.log('test');
  let repReference = ref(database, 'talkgreen/reps');
  //const responseReference = database.ref('palisade/' + rep)
  onValue(repReference, (snapshot)=>{
    snapshot.forEach(function(childSnapshot) {
      let childSnapVal = childSnapshot.val();
      let childRepName = childSnapshot.key;

      console.log(childSnapVal);
      console.log(childRepName);

      // NOTE: the response section is created for each element here
      let responseDiv = document.createElement('div');
      responseDiv.className = "response-container";

      let responseMsg = document.createElement('p');
      responseMsg.innerText = childRepName;
      responseMsg.className = "response-msg";
      responseMsg.id = childRepName;
      responseMsg.addEventListener("click", function goToStuff(){
      location.href='repinfo.html';
      });

      repNames.appendChild(responseMsg);
      repNames.appendChild(responseDiv);
    });
  });
}

if(window.location.pathname.endsWith('reps.html')){
  document.getElementById("button").addEventListener("click", render());
}

function render2(thisRepName) {
  document.getElementById("button2").style.display = "none";
  const repinfoDiv = document.getElementById('repinfo-div');
  repinfoDiv.innerHTML = '';
  console.log(thisRepName);
  let repReference = ref(database, 'talkgreen/reps/' + thisRepName)
  onValue(repReference, (snapshot)=>{
    snapshot.forEach(function(childSnapshot) {
      let childSnapVal = childSnapshot.val();
      let childRepBill = childSnapshot.key;
      let childRepVote = childRepBill.value;

      console.log(childSnapVal);
      console.log(childRepName);

      // NOTE: the response section is created for each element here
      let responseDiv = document.createElement('div');
      responseDiv.className = "repinfo-container";

      let responseMsg = document.createElement('p');
      responseMsg.innerText = "Bill " + childRepBill + ": " + childRepVote;
      responseMsg.className = "repinfo-msg";
      responseMsg.addEventListener("click", function goToStuff(){
      location.href='repinfo.html';
      });

      /*let responseRepliesDiv = document.createElement('div');
      responseRepliesDiv.className = "response-replies-div";

      let responseReplyButton = document.createElement('button');
      responseReplyButton.addEventListener("click", function saveIt(){
        saveReply(rep, childMessageID);
      });
      responseReplyButton.className = "response-reply-button";

      let responseReplyButtonImg = document.createElement('img');
      responseReplyButtonImg.src = "reply-icon.png"
      responseReplyButtonImg.className = "response-reply-button-img";

      let responseReplyInput = document.createElement('input');
      responseReplyInput.id = childMessageID;
      responseReplyInput.type = 'text';
      responseReplyInput.placeholder = "Enter your response";
      responseReplyInput.className = "response-reply-input";*/

      repinfoDiv.appendChild(responseMsg);/*
      responseReplyButton.appendChild(responseReplyButtonImg);
      responseRepliesDiv.appendChild(responseReplyButton);
      responseRepliesDiv.appendChild(responseReplyInput);
      responseDiv.appendChild(responseRepliesDiv);*/
      repinfoDiv.appendChild(responseDiv);
    });
  });
}

document.getElementById("button2").addEventListener("click", render2());