const registerButton = document.getElementById('register-button');
const enterButton = document.getElementById('enter-button');
const closeButton = document.getElementById('close-button');
let ubication = location.href;

const register = () => {
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;

  console.log(email + password);
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(){
    checkEmail();
    close();
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
}

const enter = () => {
  let emailEnter = document.getElementById('email-enter').value;
  let passwordEnter = document.getElementById('password-enter').value;

  firebase.auth().signInWithEmailAndPassword(emailEnter, passwordEnter)
  .then(function(){
    let userSigIn = obtainUser();
    if(userSigIn.emailVerified){
      location.href='./home.html';
    }
    else {
      close();
      alert('debes validar tu email')
    }
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });
};

const observer = () => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log('Existe usuario activo');
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      console.log('email:'+ email+ 'mailverificado:'+emailVerified);
      // ...
    } else {
      // User is signed out.
      console.log('No existe un usuario activo');

    }
  });
};

const close = () => {
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

const obtainUser = () => {
  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;

  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;
  }
  return user;
}

observer();

if(ubication.includes('index.html')){
  registerButton.addEventListener('click', register);
  enterButton.addEventListener('click', enter);
}
else if (ubication.includes('home.html')) {
  closeButton.addEventListener('click', close);
}
