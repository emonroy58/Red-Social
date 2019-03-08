/* global firebase : true*/
const editButton = document.getElementById('edit_button');
const userNameField = document.getElementById('user-name');
let isEditable = false;

var config = {
   apiKey: "AIzaSyD_a1alIox_XB6_IESao3Cv6G09mqacKoY",
   authDomain: "redsocial-501ac.firebaseapp.com",
   databaseURL: "https://redsocial-501ac.firebaseio.com",
   projectId: "redsocial-501ac",
   storageBucket: "redsocial-501ac.appspot.com",
   messagingSenderId: "246552558120"
 };

 firebase.initializeApp(config);

 function observer() {
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

       userNameField.value = displayName;
       document.getElementById('cliente-photo').setAttribute("src",photoURL);
     }
   });
 }
 observer();

editButton.addEventListener('click', function () {
  isEditable = !isEditable;
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
});

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

 const signOutButton = document.getElementById('signOut-button');
 signOutButton.addEventListener('click', singOut)
