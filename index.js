
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

let storedUsername = null;

function login(event) {
  let theUsername=document.getElementById("username-input").value;
  let thePassword=document.getElementById("password-input").value;

  console.log(document.getElementById("username-input").value);
  console.log(document.getElementById("password-input").value);

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
      location.href='reps.html'
      console.log("redirected");
    }
    console.log('data', data);
    if(theUsername===data.username){
      console.log("usercorrect");
      if(thePassword===data.password){
        storedUsername = theUsername;
        location.href='reps.html';
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

let thisRepName = null;
console.log("rep name and " +thisRepName);

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
      console.log(responseMsg.id);
      responseMsg.addEventListener("click", function goToStuff(){
      thisRepName=this.id;
      console.log(thisRepName);
      location.href=`repinfo.html?rep=${childRepName}`;
      // let searchParames = new URLSearchParams();
      // searchParames.set("rep", childRepName);
      // location.search=searchParames;
      });

      repNames.appendChild(responseMsg);
      repNames.appendChild(responseDiv);
    });
  });
}

if(window.location.pathname.endsWith('reps.html')){
  document.getElementById("button").addEventListener("click", render());
}

function render2() {
  console.log(new URLSearchParams(window.location.search).get("rep"));
  console.log(thisRepName)
  let theRepName = new URLSearchParams(window.location.search).get("rep");
  document.getElementById("button2").style.display = "none";
  const repinfoDiv = document.getElementById('repinfo-div');
  repinfoDiv.innerHTML = '';
  let repReference = ref(database, 'talkgreen/reps/' + theRepName)
  onValue(repReference, (snapshot)=>{
    snapshot.forEach(function(childSnapshot) {
      let childSnapVal = childSnapshot.val();
      let childRepBill = childSnapshot.key;
      let childRepVote = childSnapshot.val();

      console.log(childSnapVal);

      // NOTE: the response section is created for each element here
      let responseDiv = document.createElement('div');
      responseDiv.className = "repinfo-container";

      let responseMsg = document.createElement('p');
      responseMsg.innerText = "Bill " + childRepBill + ": " + childRepVote;
      responseMsg.className = "repinfo-msg";
      responseMsg.addEventListener("click", function goToStuff(){
      location.href='repinfo.html';
      });

      repinfoDiv.appendChild(responseMsg);
      repinfoDiv.appendChild(responseDiv);
    });
  });
}

if(window.location.pathname.endsWith('repinfo.html')){
  console.log(new URLSearchParams(window.location.search));
  document.getElementById("button2").addEventListener("click", render2());
}

function saveTemplate(){
  console.log("Saving Template FUnction")
  let theBill=document.getElementById('bill-enter').value;
  let theMessage=document.getElementById('template-enter').value;
  console.log(theBill);
  console.log(document.getElementById('bill-enter'));
  console.log(document.getElementById('bill-enter').value);
  console.log(document.getElementById('template-enter'));
  console.log(document.getElementById('template-enter').value);
  console.log(theMessage);
  let random = Math.floor(Math.random()*129837);
    set(ref(database, 'talkgreen/templates/'+random), {
      username: thisRepName,
      bill: theBill,
      message: theMessage
    });
    displayTemplates();
}

function displayTemplates() {
  console.log("displaying all templates.")
  const templateDiv = document.getElementById('template-div');
  templateDiv.innerHTML='';
  let templateReference=ref(database, 'talkgreen/templates');
  console.log(templateReference);

  onValue(templateReference, (snapshot)=>{
    snapshot.forEach(function(childSnapshot){
      let childSnapVal=childSnapshot.val();
      console.log(childSnapVal);
      let childTemplateUser=childSnapVal.username;
      console.log(childTemplateUser);
      let childTemplateBill=childSnapVal.bill;
      console.log(childTemplateBill);
      let childTemplateEmail=childSnapVal.message;
      console.log(childTemplateEmail);

      if(childTemplateUser===undefined){
        childTemplateUser="Anonymous";
      }

      //added code
      let templateDivv = document.createElement('div');
      templateDivv.className = "template-container";

      let eachTemplate=document.createElement('p');
      eachTemplate.className="eachtemplate-class";
      eachTemplate.innerText="\nUser: " + childTemplateUser + "\nBill: " + childTemplateBill + "\nTemplate: " + childTemplateEmail;
      templateDiv.appendChild(templateDivv);
      templateDiv.appendChild(eachTemplate);
    })
  })
}


if(window.location.pathname.endsWith('templates.html')){
  document.getElementById("save-button-id").addEventListener("click", saveTemplate, displayTemplates);
}