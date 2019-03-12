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
     
      userNameField.value = displayName;
      nameUser = displayName;
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
let d = new Date(); //obtener fecha
let fecha =  d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();

 //var db = firebase.firestore();
let btnpublicar = document.getElementById('btn-publicar');

function publicar(){
  let userName = document.getElementById('user-name').value;
  let postuser = document.getElementById('post-user').value;
  document.getElementById('fecha').innerHTML = fecha;
  db.collection("bdpost").add({ // agregar colleccion bdpost, con sus respectivos campos
    user: userName,
    post: postuser,
    fechapost: fecha,
    //updatepost: "update",      
    //deletepost: "delete"
  })
  .then(function(docRef) { //then, indica que se agrego correctamente
    console.log("Document written with ID: ", docRef.id); 
    userName = document.getElementById('user-name').value='';
    postUser = document.getElementById('post-user').value='';
    fechaPost =  document.getElementById('fecha').value;
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
  });
 }
 btnpublicar.addEventListener('click', publicar)


 //leer datos(docuementos) de BD

 let dataCard = document.getElementById('card-data');
 db.collection("bdpost").get().then((querySnapshot) => {
  dataCard.innerHTML='';
  querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().user}`);
     dataCard +=`
      <div class="card-body">
      <h5 class="card-title">Publicacion de...${doc.data().user}</h5>
      <p class="card-text">${doc.data().postUser}</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
    <div class="card-footer text-muted">
      <h4><span id="fecha">${doc.data().fechaPost}</span></h4>
    </div>
      `
  });
});


