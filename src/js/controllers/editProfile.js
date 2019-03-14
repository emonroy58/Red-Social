let isEditable = false;

function deletePost(userId,docId) {
  db.collection("posts").doc(userId).collection('private_post').doc(docId).delete()
  .then(function() {
    console.log("Document successfully deleted!");
  }).catch(function(error) {
    console.error("Error removing document: ", error);
  });
}

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
              <button class="btn btn-primary" type="submit"onclick="updatePost('${user.uid}','${doc.id}','${doc.data().message}')"><i class="far fa-edit"></i></button>
              <button class="btn btn-primary" type="submit" onclick="deletePost('${user.uid}','${doc.id}')"><i class="far fa-trash-alt"></i></button>
            </div>
          </div>
        </td>
      </tr>
      `
    })
  })
}

(function (window, document) {
  library.controller('editprofile', {
    observer: function () {

       firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
           console.log('hay usuario')
           printData();
           var displayName = user.displayName;
           if(displayName == null){
             displayName = user.email;
           }

           var photoURL = 'img/profile.jpg';
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
     addPost: function() {
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


function updatePost (userId,docId,message){
  document.getElementById('post-field').value = message;
  const button = document.getElementById('add-btn');

  button.innerHTML = 'Editar';

  button.onclick = function(){
    var postRef = db.collection("posts").doc(userId).collection('private_post').doc(docId);
    const postField = document.getElementById('post-field').value;
    let d = new Date(); //obtener fecha
    let fechaHoy =  d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
    return postRef.update({
      message: postField,
      time: fechaHoy
    })
    .then(function() {
      console.log("Document successfully updated!");
    })
    .catch(function(error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });
  }

}
