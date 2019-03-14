const loginButton = $.get('button-login');
const signupButton = $.get('button-signup');
const backButton = $.get('button-back');
const signOutButton = $.get('signOut-button');

const showAuthenticationBottons = ()=>{
  signupButton.style.display = 'block';
  loginButton.style.display = 'block';
  backButton.style.display = 'none';
  signOutButton.style.display = 'none';
}

const showBackButton = () => {
  loginButton.style.display = 'none';
  signupButton.style.display = 'none';
  backButton.style.display = 'block';
  signOutButton.style.display = 'none';
}

const showPerfil = () => {
  loginButton.style.display = 'none';
  signupButton.style.display = 'none';
  backButton.style.display = 'none';
  signOutButton.style.display = 'block';
}
