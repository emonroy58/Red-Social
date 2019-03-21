let isEditable = false;
// let userArray = ['2n53GrXHIggQrrWg58CPiD4qevj1', '4Ib7Fvuz8nP6QJv52r2Ug7PWj6n2', 'BcyOOhKuEheqtkT1kv5yL23reQB3',
//   'J7EdAQIxqYYwFCzyM1w2j8vFQy62', 'uqETPkSt6FeSsP25Nzq2oaQcKu52', 'xa6usO9Ge3YqBmfe7YrT1G0f7kp2'
// ];

function deletePost(userId, docId) {
  db.collection("posts").doc(userId).collection('private_post').doc(docId).delete()
    .then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
}

function printData() {
  var tabla = document.getElementById('tabla');
  const user = firebase.auth().currentUser;
  db.collection('posts').doc(user.uid).collection('private_post').orderBy('time', 'desc').limit(10).onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id}=>${doc.data()}`);
      let messages = `
      <tr>
        <td>
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${doc.data().userName}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${doc.data().time}</h6>
              <textarea id="message${doc.id}" class="form-control" readOnly>${doc.data().message}</textarea><br>
              <button id="edit-button${doc.id}" class="btn btn-primary" type="submit"onclick="updatePost('${user.uid}','${doc.id}','${doc.data().message}')"><i id="icon${doc.id}" class="far fa-edit"></i></button>
              <button class="btn btn-primary" type="submit" onclick="deletePost('${user.uid}','${doc.id}')"><i class="far fa-trash-alt"></i></button>
            </div>
          </div>
        </td>
      </tr>
      `;
      tabla.insertAdjacentHTML("beforeend", messages);
    })
  })
}

function like(id) {
  if (document.getElementById(`like${id}`).classList.contains('like')) {
    //remove a like
    document.getElementById(`like${id}`).classList.remove("like");

  } else {
    //add a like
    document.getElementById(`like${id}`).classList.add("like");
  }
}

function printWall() {
  var tabla = library.get('tabla');
  tabla.innerHTML = '';
  db.collection('posts').get().then(function(querySnapshot) {
    querySnapshot.forEach(function(docMain) {
      console.log(docMain.id, " => ", docMain.data());
      db.collection('posts').doc(docMain.data().userId).collection('private_post').orderBy('time', 'desc').limit(10).onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id}=>${doc.data()}`);
          let messages = `
            <tr>
              <td>
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">${doc.data().userName}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${doc.data().time}</h6>
                    <textarea id="message${doc.id}" class="form-control" readOnly>${doc.data().message}</textarea><br>
                    <button id="like${doc.id}" class="btn btn-primary ${gotUserLike(doc.data().likes, docMain.data().userId)}" type="submit" onclick="like('${doc.id}')"><i class="fab fa-gratipay"></i></button>
                  </div>
                </div>
              </td>
            </tr>
            `;
          tabla.insertAdjacentHTML("beforeend", messages);
        })
      })
    });
  });
}

function gotUserLike(likes, userId) {
  if (likes.includes(userId)) {
    return 'like';
  }
  return '';
}

function updatePost(userId, docId, message) {
  const button = library.get('edit-button' + docId);
  const editIcon = library.get('icon' + docId);
  const txtMessage = library.get('message' + docId);
  editIcon.classList.toggle('fa-edit');
  editIcon.classList.toggle('fa-save');
  txtMessage.readOnly = false;

  button.onclick = function() {
    var postRef = db.collection("posts").doc(userId).collection('private_post').doc(docId);
    let d = new Date(); //obtener fecha
    let fechaHoy = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();
    return postRef.update({
        message: txtMessage.value,
        time: fechaHoy
      })
      .then(function() {
        console.log("Document successfully updated!");
        editIcon.classList.toggle('fa-save');
        editIcon.classList.toggle('fa-edit');
        txtMessage.readOnly = true;
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }
}


(function(window, document) {
  library.controller('editprofile', {
    observer: function() {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log('hay usuario')
          //printData();
          printWall();
          var displayName = user.displayName;
          if (displayName == null) {
            displayName = user.email;
          }

          var photoURL = 'img/profile.jpg';
          if (user.photoURL != null) {
            photoURL = user.photoURL;
          }

          const photoDefault = library.get('cliente-photo');
          const userNameField = library.get('user-name');
          photoDefault.setAttribute("src", photoURL);
          userNameField.value = displayName;
        } else {
          window.location.hash = '#/';
        }
      });
    },
    editUser: function() {
      const userNameField = library.get('user-name');
      const editButton = library.get('edit_button');
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
    },
    addPost: function() {
      let d = new Date(); //obtener fecha
      let fechaHoy = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();
      const postField = document.getElementById('post-field');
      const user = firebase.auth().currentUser;
      if (postField.value != null) {
        db.collection("posts").doc(user.uid).set({
            userId: user.uid
          })
          .then(function() {
            console.log("Document successfully written!");
          })
          .catch(function(error) {
            console.error("Error writing document: ", error);
          });
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
            postField.value = '';
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });
      }
    },
    signOut: function() {
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
