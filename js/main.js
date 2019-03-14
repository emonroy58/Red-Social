const ubicationPage = ()=> {
  const loginButton = $.get('button-login');
  const signupButton = $.get('button-signup');
  const backButton = $.get('button-back')
  // btnEmail.addEventListener('click',library.getController().showForm());
  if(location.href.includes('login') || location.href.includes('signup')){
    loginButton.style.display = 'none';
    signup.style.display = 'none';
    backButton.style.display = 'blok';
    //logInButton.addEventListener('click',library.getController().logIn(library.get('login-form')));
  }else if (location.href.includes('editprofile')) {
    loginButton.style.display = 'none';
    signupButton.style.display = 'none';
    backButton.style.display = 'none';
  }else {
    loginButton.style.display = 'block';
    signupButton.style.display = 'block';
    backButton.style.display = 'none';
  }
}

ubicationPage();
