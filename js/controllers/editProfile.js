let isEditable = false;

(function (window, document) {
  library.controller('editprofile', {
    observer: function () {

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

          const photoDefault = library.get('cliente-photo');
          const userNameField = library.get('user-name');
          photoDefault.setAttribute("src",photoURL);
          userNameField.value = displayName;
         }
       });
     },
    editUser: function () {
      const userNameField = library.get('user-name');
      const editButton = library.get('edit_button');
       isEditable =! isEditable;
       if(isEditable){
         userNameField.readOnly  = false;
         editButton.innerHTML = 'Save';
       }
       else{
         firebase.auth().currentUser.updateProfile({
           displayName: userNameField.value
         })
         .then(() => {

         })
         .catch(()=>{
           alert('something went wrong');
         })
         userNameField.readOnly  = true;
         editButton.innerHTML = 'Edit';
       }
     },
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
