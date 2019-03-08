/* global firebase : true*/
//const urlSingUp = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD_a1alIox_XB6_IESao3Cv6G09mqacKoY';

const emailInput = document.getElementById('email_input');
const passwordInput = document.getElementById('password');
const passwordConfirmInput = document.getElementById('confirm_password');
const sendButton = document.getElementById('send_button');
const logInButton = document.getElementById('logIn-button');

var config = {
   apiKey: "AIzaSyD_a1alIox_XB6_IESao3Cv6G09mqacKoY",
   authDomain: "redsocial-501ac.firebaseapp.com",
   databaseURL: "https://redsocial-501ac.firebaseio.com",
   projectId: "redsocial-501ac",
   storageBucket: "redsocial-501ac.appspot.com",
   messagingSenderId: "246552558120"
 };
 firebase.initializeApp(config);

function checkPasswords(){
 let pass = passwordInput.value;
 let confirmPass = passwordConfirmInput.value;

 //check if pass is longer than 5 characters
 if(pass.length<6){
   alert('the password is not lenght enough');
   return false;
 }

 let passwordMatch = pass == confirmPass;

 if(!passwordMatch){
   alert('the passwords are not the same');
 }

 return passwordMatch;
}



function singIn() {
  if(checkPasswords()){
    firebase.auth().createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
    .then(function(){
      checkEmail();
      location.href='./editprofile.html';
    })
      // .then(function(response) {
      //   console.log(response);
      //   //parse json to create a js object
      //   resposne = response.json;
      //   //get a user object inside the response object
      //   const user = response.user;
      //   //Save the data for the current User
      //   let userData = {
      //     id: user.uid,
      //     email: user.email,
      //   }
      //
      //
      //
      //   //Move to the next page
      //
      // })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        switch(errorMessage){
          case 'EMAIL_EXISTS':
            alert('this email already exist');
            break;
          case 'INVALID_EMAIL':
            alert('this email is invalid please enter a valid one');
            break;
        }
      }
    );
  }

}



const logIn = () => {
  const emailSingIn = document.getElementById('email_sing_in').value;
  const passwordSingIn = document.getElementById('password_sing_in').value;

  firebase.auth().signInWithEmailAndPassword(emailSingIn, passwordSingIn)
  .then(function(){
      let userSigIn = obtainUser();
      if(userSigIn.emailVerified){
        location.href='./editprofile.html';
      }
      else {
        singOut();
        alert('debes validar tu email')
      }
    })
    .catch(function(error) {
      //Handle Erros here.
      const errorCode = error.code;
      const errorMessages = error.messages;
    });
}

//var provider = new firebase.auth.GoogleAuthProvider();

function observer() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('hay usuario')
      document.getElementById('user-name').innerHTML= user.displayName;
      document.getElementById('cliente-photo').setAttribute("src",user.photoURL);
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      console.log('no hay usuario')
      // ...
    }
  });
}
observer();



const checkEmail = () => {
  var user = firebase.auth().currentUser;
  user.sendEmailVerification()
  .then(function() {
    // Email sent.
    console.log('Enviando email');
  }).catch(function(error) {
    // An error happened.
    console.log(error);
  });
}

const singOut = () => {
  firebase.auth().signOut()
  .then(function() {
    // Sign-out successful.
    console.log('saliendo...');
    location.href = './index.html';
  }).catch(function(error) {
    // An error happened.
    console.log(error);
  });
}

const obtainUser = () => {
  let user = firebase.auth().currentUser;
  let userNew = {};

  if (user != null) {
    userNew.name = user.displayName;
    userNew.email = user.email;
    userNew.photoUrl = user.photoURL;
    userNew.emailVerified = user.emailVerified;
    userNew.uid = user.uid;
  }
  return userNew;
}

function googleSigIn(){

  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result){

    console.log(result)
    console.log("success.goole Account")

    location.href='./editprofile.html';

  })

  .catch(function(err){
    console.log(err);
    console.log("Intento fallido")
  })

}

if(location.href.includes('login.html')){
  logInButton.addEventListener('click',logIn);
  sendButton.addEventListener('click', function () {
    singIn();
  });

  const btnGoogle = document.getElementById('btn-google');
  btnGoogle.addEventListener('click', ()=>{
    googleSigIn()
  }  );
}
else if(location.href.includes('editprofile.html')){
  const signOutButton = document.getElementById('signOut-button');
  signOutButton.addEventListener('click', singOut)
}
