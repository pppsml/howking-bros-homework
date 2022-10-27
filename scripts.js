//      1.1
const getUserForm = document.forms['get-user-form'];
const resultsContainer = document.getElementById('get-users-results');

getUserForm.addEventListener('submit', function (e) {
	e.preventDefault();
	const formData = new FormData(getUserForm);
	const inputName = formData.get('name').trim().toLowerCase();

	fetch(`https://api.github.com/users/${inputName}`)
		.then((res) => res.json())
		.then((data) => {
			if (data.message === 'Not Found') {
				throw new Error(`Пользователь с именем "${inputName}" не найден`);
			}

			resultsContainer.innerHTML = `
			<div class="response-container">
			<img src="${data.avatar_url}">
			<p> Имя: <span>${data.name}</span><p>
			<p> О себе: <span>${data.bio}</span><p>
			<p> Кол-во репозиториев: <span>${data.public_repos}</span><p>
        </div>
      `;
		})
		.catch((err) => {
			console.log(err);
			resultsContainer.innerHTML = `
			<div class="response-container">
			<p>${err}</p>
			</div>
		`;
		});
});

//      1.2
const getMockUsersBtn = document.getElementById('js-load-users');

const getMockUsers = async (e) => {
	e.preventDefault();

	const createTemplate = (data) => `
	<div class="response-container">
			<p> id: <span>${data.id}</span><p>
			<p> Имя: <span>${data.name}</span><p>
			<p> Username: <span>${data.username}</span><p>
			<p> email: <span>${data.email}</span><p>
		</div>
	`;

	let totalInnerHTML = ``;

	const response = await axios.get('https://jsonplaceholder.typicode.com/users');

	response.data.forEach((user) => {
		const { id, name, username, email } = user;
		totalInnerHTML += createTemplate({ id, name, username, email });
	});

	resultsContainer.innerHTML = totalInnerHTML;
};

getMockUsersBtn.addEventListener('click', getMockUsers);

//      2.1

const validatedInput = document.getElementById('input-number');
const validatedInputResult = document.getElementById('input-number-result');

const validateInput = (e) => {
	console.log('change');
	try {
		const value = validatedInput.value.trim();
		const formattedValue = Number(value);

		if (!value) {
			throw new Error('Поле не должно быть пустым');
		}

		if (Number.isNaN(formattedValue)) {
			throw new Error('Введите число');
		}

		if (formattedValue < 5 || formattedValue > 10) {
			throw new Error('Число должно быть от 5 до 10 (включительно)');
		}

		validatedInputResult.classList.remove('error');
		validatedInputResult.textContent = 'Всё введено верно';
	} catch (error) {
		console.log(error);
		validatedInputResult.classList.add('error');
		validatedInputResult.textContent = error;
	}
};

validatedInput.addEventListener('input', validateInput);

//      2.2

const lotteryStartBtn = document.getElementById('lottery-start');

function playLottery() {
	console.log('Вы начали игру');
	let promise = new Promise(function (resolve, reject) {
		setTimeout(function () {
			Math.random(0) > 0.5 ? resolve() : reject('Вы промахнулись');
		}, 1000);
	});
	return promise;
}

const startLottery = async () => {
	try {
		await playLottery();
		console.log('Вы выиграли');
		console.log('Вам заплатили 0 денег');
	} catch (error) {
		console.log('Вы проиграли');
	} finally {
		console.log('Игра закончена');
	}
};

lotteryStartBtn.addEventListener('click', startLottery);
