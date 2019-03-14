/* global firebase : true*/
const editButton = document.getElementById('edit_button');
const userNameField = document.getElementById('user-name');
const postButton = document.getElementById('add-btn');

let isEditable = false;

// var config = {
//   apiKey: "AIzaSyD_a1alIox_XB6_IESao3Cv6G09mqacKoY",
//   authDomain: "redsocial-501ac.firebaseapp.com",
//   databaseURL: "https://redsocial-501ac.firebaseio.com",
//   projectId: "redsocial-501ac",
//   storageBucket: "redsocial-501ac.appspot.com",
//   messagingSenderId: "246552558120"
// };
// firebase.initializeApp(config);
//  var db = firebase.firestore();


function observer() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        printData();
      console.log('hay usuario')

      var displayName = user.displayName;
      if (displayName == null) {
        displayName = user.email;
      }

      var userId = user.uid;

      var photoURL = 'img/profile.jpg';
      if (user.photoURL != null) {
        photoURL = user.photoURL;

      }

      userNameField.value = displayName;
      document.getElementById('cliente-photo').setAttribute("src", photoURL);
    }
  });
}
observer();

//edit profile//
editButton.addEventListener('click', function() {
  isEditable = !isEditable;
  if (isEditable) {
    userNameField.readOnly = false;
    editButton.innerHTML = 'Save';
  } else {
    firebase.auth().currentUser.updateProfile({
        displayName: userNameField.value
      })
      .then(() => {

      })
      .catch(() => {
        alert('something went wrong');
      })
    userNameField.readOnly = true;
    editButton.innerHTML = 'Edit';
  }
});



/*firebase add coments*/
postButton.addEventListener('click', function() {
  addPost();

});


// Initialize Cloud Firestore through Firebase
function addPost() {
  let d = new Date(); //obtener fecha
let fechaHoy =  d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
  const postField = document.getElementById('post-field');
  const user = firebase.auth().currentUser;
  if (postField.value != null) {
    db.collection("posts").doc(user.uid).collection('private_post').add({
        userName: user.displayName,
        message: postField.value,
        time: fechaHoy,
        isPublic: false,
        likes: [],
        comments: []
      })

      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);

      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  }
}

// read posts
function printData()  {

  var tabla = document.getElementById('tabla');
  const user = firebase.auth().currentUser;
  db.collection('posts').doc(user.uid).collection('private_post').onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id}=>${doc.data()}`);
      tabla.innerHTML+=`
      <tr>
        <td>
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${doc.data().userName}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${doc.data().time}</h6>
              <p class="card-text">${doc.data().message}</p>
              <button class="btn btn-primary" type="submit" dataDelete='${doc.id}'><i class="far fa-edit"></i></button>
              <button class="btn btn-primary" type="submit"><i class="far fa-trash-alt"></i></button>
            </div>
          </div>
        </td>
      </tr>
      `
    })
  })
}




//sing out//
const singOut = () => {
  firebase.auth().signOut()
    .then(function() {
      // Sign-out successful.
      console.log('saliendo...');
      location.href = 'index.html';
    }).catch(function(error) {
      // An error happened.
      console.log(error);
    });
};

const signOutButton = document.getElementById('signOut-button');
signOutButton.addEventListener('click', singOut)
