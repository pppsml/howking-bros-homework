const getMockUsersBtn = document.querySelector('#js-load-users');

const getUserForm = document.forms['get-user-form'];
const resultsContainer = document.querySelector('.js-results');

getUserForm.addEventListener('submit', function (e) {
	e.preventDefault();
	const formData = new FormData(getUserForm);
	const inputName = formData.get('name').trim().toLowerCase();

	fetch(`https://api.github.com/users/${inputName}`)
		.then((res) => res.json())
		.then((data) => {
			resultsContainer.innerHTML = `
        <div class="response-container">
          <img src="${data.avatar_url}">
          <p> Имя: <span>${data.name}</span><p>
          <p> О себе: <span>${data.bio}</span><p>
          <p> Кол-во репозиториев: <span>${data.public_repos}</span><p>
        </div>
      `;
		});
});

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
