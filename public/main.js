// here we're defining a 'listRepos' function that accepts a username as an arg
// when called it'll load the github repos for a given username & store them in the 'repos' variable
const listRepos = async (username) => {
	// the fetch api is promise-based
	const repos = await fetch(
		`https://api.github.com/users/${username}/repos?type=owner&sort=updated`
	)
		// parsing the response as json
		.then((res) => res.json())
		.catch((err) => console(err));

	// once we have our repos we map them, convert them into strings, and then join them into one long string of list items
	const markup = repos
		.map(
			(repo) =>
				`<li>
            <a href="${repo.html_url}">${repo.name}</a>
            (⭐️ ${repo.stargazers_count})
            </li>`
		)
		.join('');

	// then we find our 'content' div & put our markup inside it
	const content = document.getElementById('content');

	content.innerHTML = `<li>${markup}</li>`;
};

listRepos('niamhmccoo');
