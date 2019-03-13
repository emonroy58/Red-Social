function observer() {
   const userNameField = library.get('user-name');
   firebase.auth().onAuthStateChanged(function(user) {
     if (user) {
       console.log('hay usuario')

       var displayName = user.displayName;
       if(displayName == null){
         displayName = user.email;
       }

       var photoURL = '../img/profile.jpg';
       if(user.photoURL != null){
          photoURL = user.photoURL;
       }

      //userNameField.value = displayName;
      const photoDefault = library.get('cliente-photo')
      photoDefault.setAttribute("src",photoURL);
     }
   });
 }

if (location.href.includes('editprofile')) {
  observer();
}


(function (window, document) {
  library.controller('editprofile', {
     signOut: function () {
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
  });
})(window, document)
