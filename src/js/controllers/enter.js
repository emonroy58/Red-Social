function checkPasswords(pass, confirmPass) {
  //check if pass is longer than 5 characters
  if (pass.length < 6) {
    alert('the password is not lenght enough');
    return false;
  }

  let passwordMatch = pass == confirmPass;

  if (!passwordMatch) {
    alert;
  }
  return passwordMatch;
}

const checkEmail = () => {
  console.log('mail ennviado')
  var user = firebase.auth().currentUser;
  user.sendEmailVerification()
  console.log(user)
    .then(function() {
      // Email sent.
      console.log('Enviando email');
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

 const singOut = () => {
   firebase.auth().signOut()
   .then(function() {
     // Sign-out successful.
     console.log('saliendo...');
     window.location.hash = '#/';
   }).catch(function(error) {
     // An error happened.
     console.log(error);
   });
 }

(function(window, document) {
  library.controller('enter', {

    showFormLogin: function(){
      const loginSection = library.get('login-section');
      loginSection.style.display = "block";
    },
    showFormSingUp: function(){
      const registerSection = library.get('register-section');
      registerSection.style.display = "block";
    },
    signUp: function(form) {
      const email = form.email_input.value;
      const password = form.password.value;
      const passwordConfirm = form.confirm_password.value;
      if (checkPasswords(password, passwordConfirm)) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(function(result) {
            console.log(result)
            window.location.hash = '#/editprofile';
            result = checkEmail()
            return result
          })
          .then(function(response) {
            console.log(response);
            //parse json to create a js object
            response = response.json;
            //get a user object inside the response object
            const user = response.user;
            //Save the data for the current User
            let userData = {
              id: user.uid,
              email: user.email,
            }
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            switch (errorMessage) {
              case 'EMAIL_EXISTS':
                alert('this email already exist');
                break;
              case 'INVALID_EMAIL':
                alert('this email is invalid please enter a valid one');
                break;
            }
          });
      }
    },

    logIn: function(form) {
      const emailSingIn = form.email_sing_in.value;
      const passwordSingIn = form.password_sing_in.value;

      firebase.auth().signInWithEmailAndPassword(emailSingIn, passwordSingIn)
        .then(function() {
           let userSigIn = obtainUser();
           console.log(userSigIn);
          if (userSigIn.emailVerified) {
            window.location.hash = '#/editprofile';
          } else {
            singOut();
            alert('debes validar tu email')
          }
        })
        .catch(function(error) {
          //Handle Erros here.
          const errorCode = error.code;
          const errorMessages = error.messages;
        });
    },
    googleSigIn: function(){
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
      .then(function(result){
        console.log(result)
        console.log("success.goole Account")

        window.location.hash = '#/editprofile';
      })
      .catch(function(err){
        console.log(err);
        console.log("Intento fallido")
      })
    }
  });
})(window, document);
