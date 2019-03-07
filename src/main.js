const btnOut = document.getElementById('btnOut');


var mainApp = {};

(function(){
  var firebase = app_fireBase;
  var uid = null;
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        uid=user.uid;
        document.getElementById('user-name').innerHTML= user.displayName;
        document.getElementById('cliente-photo').setAttribute("src",user.photoURL);
      }else{
          uid=null;
          window.location.replace("login.html");
      }
    });
    btnOut.addEventListener ('click', function logOut(){
     firebase.auth().signOut();
 });
//mainApp.logOut = logOut;

})() 




