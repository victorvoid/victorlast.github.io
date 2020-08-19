function GitHub({ repositories, username }) {
  const GITHUB_API = 'https://api.github.com';
  const Repository = ({ name, description, stargazers_count: stars, forks, language, html_url: url }) => `
    <a href="${url}" target="_blank">
        <h3>${name}</h3>
        <p> ${description}</p>
        <p class="project-info">
            <span class="project-info--item">
                <svg class="icon icon-star-gh"><use xlink:href="#icon-star-gh"></use></svg>
                ${stars}
            </span>
            <span class="project-info--item">
                <svg class="icon icon-fork-gh"><use xlink:href="#icon-fork-gh"></use></svg>
                ${forks}
            </span>
            <span class="project-info--item">
                <span class="language-icon"></span>
                ${language}
            </span>
        </p>
    </a>
  `

  const appendItem = (query) => child => {
    const list = document.querySelector(query)
    const item = document.createElement('li')
    item.innerHTML = child;
    list.appendChild(item)
  }

  const services = {
    repo: {
      get: (name) =>
        fetch(`${GITHUB_API}/repos/${username}/${name}`)
          .then(repos => repos.json())
          .catch(() => console.error('fetching Repository in GitHub is not working'))
    }
  }

  const addRepositories = () => {
    repositories.forEach(repository => {
      services.repo.get(repository)
        .then(Repository)
        .then(appendItem('.open-source > ul'))
    })
  }

  return {
    addRepositories
  }
}

const githubTools = GitHub({
  username: 'victorvoid',
  repositories: [
    'dinoql',
    'space-jekyll-template',
    'placeload.js',
    'vim-frontend',
  ]
})

githubTools.addRepositories()
