/* global firebase : true*/
const editButton = document.getElementById('edit_button');
const userNameField = document.getElementById('user-name');
let isEditable = false;
let nameUser;

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
      nameUser = document.getElementById('user-name');
      nameUser.innerHTML= user.displayName;
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


 /*agregar datos en BD*/

 //var db = firebase.firestore();
let btnpublicar = document.getElementById('btn-publicar');

function publicar(){
  let userName = document.getElementById('user-name').value;
  let postuser = document.getElementById('post-user').value;
  db.collection("bdpost").add({ // agregar colleccion bdpost, con sus respectivos campos
    user: userName,
    post: postuser,
    //updatepost: "update",      
    //deletepost: "delete"
  })
  .then(function(docRef) { //then, indica que se agrego correctamente
    console.log("Document written with ID: ", docRef.id); 
    userName = document.getElementById('user-name').value='';
    postuser = document.getElementById('post-user').value='';
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
  });
 }
 btnpublicar.addEventListener('click', publicar)
 
