const getUserForm = document.forms['get-user-form'];
const resultsContainer = document.querySelector('.js-results');

getUserForm.addEventListener('submit', function (e) {
	e.preventDefault();
	const formData = new FormData(getUserForm);

	const inputName = formData.get('name').trim().toLowerCase();

	fetch(`https://api.github.com/users/${inputName}`)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);

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
