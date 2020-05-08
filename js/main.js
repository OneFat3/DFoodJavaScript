'use strict';

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const passInput = document.querySelector('#password');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');
const restaurantTitle = document.querySelector('.restaurant-title');
const rating = document.querySelector('.rating');
const minprice = document.querySelector('.price');
const category = document.querySelector('.category');

let login = localStorage.getItem('Login');

const getData = async function (url) {

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}!`);
  }

  return await response.json();

}


const toggleModalAuth = function () {
  modalAuth.classList.toggle('is-open');
};

const toggleModal = function () {
  modal.classList.toggle("is-open");
};

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
    login = loginInput.value.trim();
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


//day 2

function createCardRestaurants({
  name,
  time_of_delivery: timeOfDelivery,
  stars,
  price,
  kitchen,
  image,
  products
}) {

  const card = document.createElement('a');
  card.className = 'card card-restaurant';
  card.products = products;
  card.info = [name, price, stars, kitchen];
  card.insertAdjacentHTML("beforeend", `
			  <img src="${image}" alt="image" class="card-image"/>
				<div class="card-text">
					<div class="card-heading">
						<h3 class="card-title">${name}</h3>
						<span class="card-tag tag">${timeOfDelivery} мин</span>
					</div>
				  <div class="card-info">
					  <div class="rating">${stars}</div>
					  <div class="price">От ${price} ₽</div>
					  <div class="category">${kitchen}</div>
				  </div>
			  </div>
  `);
  console.log(card);
  cardsRestaurants.insertAdjacentElement("beforeend", card);
}

// function createHeadingRestaurant() {
//   const heading = `<div class="section-heading">
// 					<h2 class="section-title restaurant-title">${name}</h2>
// 					<div class="card-info">
// 						<div class="rating">${stars}</div>
// 						<div class="price">От ${price} ₽</div>
// 						<div class="category">${kitchen}</div>
// 					</div>`;
//   menu.insertAdjacentHTML('beforeend', heading)
// }


function createCardGood({
  name,
  description,
  price,
  image,
}) {
  const card = document.createElement('div')
  card.className = 'card';
  card.insertAdjacentHTML('beforeend', `
              <img src="${image}" alt="${name}" class="card-image"/>
              <div class="card-text">
                <div class="card-heading">
                  <h3 class="card-title card-title-reg">${name}</h3>
                </div>
                <div class="card-info">
                  <div class="ingredients">${description}
                  </div>
                </div>
                <div class="card-buttons">
                  <button class="button button-primary button-add-cart">
                    <span class="button-card-text">В корзину</span>
                    <span class="button-cart-svg"></span>
                  </button>
                  <strong class="card-price-bold">${price} ₽</strong>
                </div>
              </div>
  `);

  cardsMenu.insertAdjacentElement("beforeend", card);

}
// Open menu restourant
function openGoods(event) {
  const target = event.target;
  if (login) {
    const restaurant = target.closest('.card-restaurant');
    if (restaurant) {

      const [name, price, stars, kitchen] = restaurant.info;

      cardsMenu.textContent = '';
      containerPromo.classList.add('hide');
      restaurants.classList.add('hide');
      menu.classList.remove('hide');

      restaurantTitle.textContent = name;
      rating.textContent = stars;
      minprice.textContent = `От  ${price} ₽`;
      category.textContent = kitchen;

      getData(`./db/${restaurant.products}`).then(function (data) {
        data.forEach(createCardGood)
      });
    }
  } else {
    toggleModalAuth();
  }
}

function init() {
  getData('./db/partners.json').then(function (data) {
    data.forEach(createCardRestaurants)
  });

  cartButton.addEventListener("click", toggleModal);

  close.addEventListener("click", toggleModal);

  cardsRestaurants.addEventListener('click', openGoods);

  logo.addEventListener('click', function () {
    containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
  });

  checkAuth();

  new Swiper('.swiper-container', {
    loop: true,
    sliderPerView: 1,
    //autoplay: true
  });
}

init();