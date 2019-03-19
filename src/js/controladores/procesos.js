
(function(window, document){
 let isEditable = false;    
 let d = new Date(); //obtener fecha
 let fechaHoy =  d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
    libreria.controlador('procesos',{
    
        registro: function(formulario){
            const email= formulario.email.value;
            const password = formulario.password.value;
            const confirmPassword = formulario.confirmPassword.value;
            const checkpass = window.redSocial.checkPasswords(password,confirmPassword);         
                if(checkpass){
                firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(function(result){
                  console.log('linea 48')
                  console.log(result)            
                //  location.href='#/red-social';
                    result = window.redSocial.checkEmail();
            
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
            
            
            
                    //Move to the next page
            
                  })
                  .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    switch(errorMessage){
                      case 'EMAIL_EXISTS':
                        alert('this email already exist');
                        break;
                      case 'INVALID_EMAIL':
                        alert('this email is invalid please enter a valid one');
                        break;
                    }
                  }
                );
              }
       
            
            },          

         
        ingresar: function(form){
            const emailSingIn = form.emailSingIn.value;
            const passwordSingIn = form.passwordSingIn.value;

            firebase.auth().signInWithEmailAndPassword(emailSingIn, passwordSingIn)
            .then(function(){
               // alert('validadcion');
                let userSigIn = window.redSocial.obtainUser();
                if(userSigIn.emailVerified){
                   location.href='#/red-social';
                }
                else {
                    window.redSocial.singOut();
                  alert('Favor de ir a u correo y validar el email que registraste')
                }
              })
              .catch(function(error) {
                //Handle Erros here.
                const errorCode = error.code;
                const errorMessages = error.messages;
              });

        },

        observer: function () {
            firebase.auth().onAuthStateChanged(function(user) {
              if (user) {
                console.log('hay usuario')
                libreria.getCtrl().printData(); //llama funcion imprimir post
                var displayName = user.displayName;
                if(displayName == null){
                  displayName = user.email;
                }
     
                var photoURL = 'img/profile.jpg';
                if(user.photoURL != null){
                   photoURL = user.photoURL;
                }
     
               const photoDefault = libreria.get('cliente-photo');
               const userNameField = libreria.get('user-name');
               photoDefault.setAttribute("src",photoURL);
               userNameField.value = displayName;
             }else{
               location.href = '#/';
             }
            });
          },


        editUser: function(){
        const userNameField = libreria.get('user-name');  
        isEditable = !isEditable;
        if(isEditable){
            userNameField.readOnly  = false;
            const editButton = libreria.get('edit_button');
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
            const editButton = libreria.get('edit_button');
            editButton.innerHTML = 'Edit';
          }
        },


        googleSigIn: function(){
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
            .then(function(result){
              console.log(result)
              console.log("success.goole Account")      
              location.href='#/red-social';
            })
            .catch(function(err){
              console.log(err);
              console.log("Intento fallido")
            })
          },
        
        addPost: function() {
            
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
                  postField.value = '';
                })
                .catch(function(error) {
                  console.error("Error adding document: ", error);
                });
            }
           },

        printData :   function ()  {
            var tabla = document.getElementById('tabla');
            const user = firebase.auth().currentUser;
            db.collection('posts').doc(user.uid).collection('private_post').orderBy('time','desc').limit(10).onSnapshot((querySnapshot) => {
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
                        <button class="btn btn-primary" type="submit"onclick="libreria.getCtrl().updatePost('${user.uid}','${doc.id}','${doc.data().message}')"><i class="far fa-edit"></i></button>
                        <button class="btn btn-primary" type="submit" onclick="libreria.getCtrl().deletePost('${user.uid}','${doc.id}')"><i class="far fa-trash-alt"></i></button>
                      </div>
                    </div>
                  </td>
                </tr>
                `
              })
            })
          },
          
         updatePost: function(userId,docId,message){
            document.getElementById('post-field').value = message;
            const button = document.getElementById('add-btn');
          
            button.innerHTML = 'Editar';
          
            button.onclick = function(){
              var postRef = db.collection("posts").doc(userId).collection('private_post').doc(docId);
              const postField = document.getElementById('post-field');
              let d = new Date(); //obtener fecha
              let fechaHoy =  d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
              return postRef.update({
                message: postField.value,
                time: fechaHoy
              })
              .then(function() {
                console.log("Document successfully updated!");
                button.innerHTML = 'Publicar';
                postField.value = " ";
              })
              .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
              });
            }
          
          },

        
        deletePost: function(userId,docId) {
            db.collection("posts").doc(userId).collection('private_post').doc(docId).delete()
            .then(function() {
            console.log("Document successfully deleted!");
            }).catch(function(error) {
            console.error("Error removing document: ", error);
            });
         }  


    });

})(window, document);