(function(window, document){
  $.getId('view').router()
    .route('/', 'views/home.html', null, function(){
      showAuthenticationBottons();
    })
    .route('/login', 'views/login.html', 'enter', function(){
      library.getId('login-form').noSubmit();
      showBackButton();
    })
    .route('/signup', 'views/signup.html', 'enter', function(){
      library.getId('signup-form').noSubmit();
      showBackButton();
    })
    .route('/editprofile', 'views/editprofile.html', 'enter', function(){
      library.getController().observer();
      showPerfil();
    })

})(window, document);
