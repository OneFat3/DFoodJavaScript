const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}

//lesson1

const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const passInput = document.querySelector('#password');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');

let login = localStorage.getItem('Login');

function toggleModalAuth() {
  modalAuth.classList.toggle('is-open');
}

function autorized() {
  console.log('Авторизован')

  function logOut() {
    login = null;
    localStorage.removeItem('Login');
    userName.style.display = '';
    buttonOut.style.display = '';
    buttonAuth.style.display = '';
    buttonOut.removeEventListener('click', logOut);
    checkAuth();
  }

  userName.textContent = login;

  userName.style.display = 'block';
  buttonOut.style.display = 'inline';
  buttonAuth.style.display = 'none'

  buttonOut.addEventListener('click', logOut)
}

function notAutorized() {
  console.log('Не авторизован')

  function logIn(event) {
    event.preventDefault();
    login = loginInput.value;
    if (login === '') {
      alert('Введите логин');
    } else {
      localStorage.setItem('Login', login);
      toggleModalAuth();
      buttonAuth.removeEventListener('click', toggleModalAuth);
      closeAuth.removeEventListener('click', toggleModalAuth);
      logInForm.removeEventListener('submit', logIn);
      logInForm.reset();
      checkAuth();
    }
  }

  buttonAuth.addEventListener('click', toggleModalAuth);
  closeAuth.addEventListener('click', toggleModalAuth);
  logInForm.addEventListener('submit', logIn)
}

function checkAuth() {
  if (login) {
    autorized();
  } else {
    notAutorized();
  }
}

checkAuth();