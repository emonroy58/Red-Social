/* global firebase : true*/
const urlSingUp = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD_a1alIox_XB6_IESao3Cv6G09mqacKoY';

const emailInput = document.getElementById('email_input');
const passwordInput = document.getElementById('password');
const passwordConfirmInput = document.getElementById('confirm_password');
const sendButton = document.getElementById('send_button');

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

sendButton.addEventListener('click', function () {
  logIn();
});

function logIn() {
  if(checkPasswords()){
    firebase.auth().createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
      .then(function(response) {
        console.log(response);
        //parse json to create a js object
        resposne = response.json;
        //get a user object inside the response object
        const user = response.user;
        //Save the data for the current User
        let userData = {
          id: user.uid,
          email: user.email,
        }



        //Move to the next page

      })
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



function singIn() {
  var emailSingIn = document.getElementById('email_sing_in').value;
  var passwordSingIn = document.getElementById('password_sing_in').value;

  firebase.auth().singInWithEmailAndPasword(emailSingIn, passwordSingIn)
    .catch(function(error) {
      //Handle Erros here.
      var errorCode = error.code;
      var errorMessages = error.messages;
    })
}

//var provider = new firebase.auth.GoogleAuthProvider();

function observer() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('hay usuario')
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

// function SingOut() {
//   firebase.auth().singOut()
//   .then(function(error){
//     console.log(Saliendo)
//   })
//   .catch((err) => {
//     console.log(error)
//   })
