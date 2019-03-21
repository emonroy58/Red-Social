window.redSocial = {
    signOut : () => {
            
        firebase.auth().signOut()
        .then(function() {
          // Sign-out successful.
          console.log('saliendo...');
          window.location.hash='#/';
        }).catch(function(error) {
          // An error happened.
          console.log(error);
        });
      },

      obtainUser : () => {
        
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
      },

      checkEmail: () => {
        console.log('mail ennviado')
        var user = firebase.auth().currentUser;
        user.sendEmailVerification()
        alert('Tu registro se encuentra en proceso, favor de validar mail');
        window.location.hash='#/';
        console.log(user)
          .then(function() {
            
            // Email sent.
            console.log('Enviando email');
          }).catch(function(error) {
            // An error happened.
            console.log(error);
          });
      },

      checkPasswords: (pass, confirmPass)=> {
        //check if pass is longer than 5 characters
        if (pass.length < 6) {
          alert('the password is not lenght enough');
          return false;
        }
      
        let passwordMatch = pass == confirmPass;
      
        if (!passwordMatch) {
          alert('the passwords are not the same');
        }
        return passwordMatch;
      },
    

}