(function(window, document){
  $.getId('view').router()
    .route('/', 'views/home.html', null, null)
    .route('/login', 'views/login.html', 'enter', function(){
      library.getId('login-form').noSubmit();
    })
    .route('/signup', 'views/signup.html', 'enter', function(){
      library.getId('signup-form').noSubmit();
    })
    .route('/editprofile', 'views/editprofile.html', 'editprofile', null)

})(window, document);
