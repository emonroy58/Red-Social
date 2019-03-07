var app_fireBase= {};
(function(){
   

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBeFIq9ksUbm69E6PUlNwU4EDJfNCEI6Bg",
    authDomain: "usersocial-7cdd3.firebaseapp.com",
    databaseURL: "https://usersocial-7cdd3.firebaseio.com",
    projectId: "usersocial-7cdd3",
    storageBucket: "usersocial-7cdd3.appspot.com",
    messagingSenderId: "654921770394"
  };
  firebase.initializeApp(config);
  app_fireBase = firebase;
})()
