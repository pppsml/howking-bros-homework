const body = document.body;

//==============BURGER

const headerBurger = document.querySelector('.header__burger');
const burgerBtn = document.querySelector('#burgerBtn');
const burgerCloseBtn = document.querySelector('#burgerCloseBtn');
const burgerMenu = document.querySelector('#burgerBtn + .burger__menu');
const burgerLinks = burgerMenu.querySelectorAll('.nav__link');

const lockBody = () => {
	body.classList.add('locked');
};
const unlockBody = () => {
	body.classList.remove('locked');
};

const openBurger = () => {
	headerBurger.classList.add('active');
	lockBody();
};
const closeBurger = () => {
	headerBurger.classList.remove('active');
	unlockBody();
};

burgerBtn.onclick = openBurger;
burgerCloseBtn.onclick = closeBurger;

burgerLinks.forEach((link) => (link.onclick = closeBurger));

//==============FORM

const contactForm = document.forms['contact'];

contactForm.onsubmit = (e) => {
	e.preventDefault();
	let isValid = true;

	const formData = new FormData(contactForm);
	const values = formData.values();

	for (const value of values) {
		isValid = isValid && value;
	}

	if (!isValid) {
		alert('Заполните все поля');
		return;
	}

	// sendData
	for (let [name, value] of formData) {
		console.log(name, value);
	}

	alert('Спасибо, мы с Вами свяжемся.');
};
