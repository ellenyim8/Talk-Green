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

document.getElementById("login-button").addEventListener("click", login);

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