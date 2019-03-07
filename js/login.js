const urlSingUp = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD_a1alIox_XB6_IESao3Cv6G09mqacKoY';

const emailInput = document.getElementById('email_input');
const passwordInput = document.getElementById('password');
const passwordConfirmInput = document.getElementById('confirm_password');
const sendButton = document.getElementById('send_button');

function checkPasswords(){
  let pass = passwordInput.value;
  let confirmPass = passwordConfirmInput.value;
  return pass == confirmPass;
}

sendButton.addEventListener('click', function () {
  if(checkPasswords()){
    register();
  }
  else
  {
    alert("not the same passwords");
  }
});

function register(){
  var data = {
    email: emailInput.value,
    password: passwordInput.value,
    returnSecureToken: true
  };

  var singUpRegsiter = {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  }

  fetch(urlSingUp, singUpRegsiter)
  .then((res) => {return res.json();})
  .catch(error => console.error('Error:', error))
  .then((response)=>{
    let responseRecived = response;
    if(responseRecived.hasOwnProperty('idToken')){
      alert('the email is already register');
    }
    else{
      var message = responseRecived.error.message;
      console.log(responseRecived);
      switch(message){
        case 'EMAIL_EXISTS':
          alert('this email already exist');
          break;
        case 'INVALID_EMAIL':
          alert('this email is invalid please enter a valid one');
          break;
      }
    }
  });
}


function singIn(){
  const emailSingIn = document.getElementById('email_sing_in').value;
  const passwordSingIn = document.getElementById('password_sing_in').value;

  firebase.auth().singInWithEmailAndPasword(emailSingIn,passwordSingIn)
  .catch(function(error){
    //Handle Erros here.
    var errorCode = error.code;
    var errorMessages = error.messages;
  })
}

//var provider = new firebase.auth.GoogleAuthProvider();

function observer(){
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
