    // URL's
const allSeasonsURL = 'https://api.catalogopolis.xyz/v1/seasons/'
const allDoctorsURL = 'https://api.catalogopolis.xyz/v1/doctors'
const allCompanionsURL = 'https://api.catalogopolis.xyz/v1/companions'
const allDirectorsURL = 'https://api.catalogopolis.xyz/v1/directors'

    // helpers
const create = el => document.createElement(el)
const select = el => document.querySelector(el)

    // grab stuff
const categoryContainer = select('#category-container')
const subcategoryContainer = select('#subcategory-container')
const episodeDetails = select('#episode-detail-container')
// might rename the container
const likesAndCommentsContainer = select('#likes-comments-container')
//might rename the container
const seasonsButton = select('#seasons-button')
const doctorsButton = select('#doctors-button')
const companionButton = select('#companions-button')
const directorButton = select('#director-button')

    // event listeners
seasonsButton.addEventListener('click', () => {
    categoryContainer.innerText = ''
    subcategoryContainer.innerText = ''
    episodeDetails.innerText = ''
    likesAndCommentsContainer.innerText = ''
    // change refresh button from none to block
    getAllSeasons()
})

doctorsButton.addEventListener('click', () => {
    categoryContainer.innerText = ''
    subcategoryContainer.innerText = ''
    episodeDetails.innerText = ''
    directorButton.innerText = ''
    getAllDoctors()
})

    // fetches
function getAllSeasons() {
    fetch(allSeasonsURL)
    .then(r => r.json())
    .then(seasons => seasons.forEach(season => renderAllSeasons(season)))
}

function getOneSeason(season) {
    subcategoryContainer.innerText = ''
    fetch(`${allSeasonsURL}${season.id}/serials`)
    .then(r => r.json())
    .then(season => season.forEach(episode => renderAllEpisodesForSeason(episode)))
}

    // render function
function renderAllSeasons(season) {
    let seasonName = create('h1')
    seasonName.innerText = season.name
    seasonName.style.fontSize = '20px'
    seasonName.addEventListener('click', () => getOneSeason(season))
    categoryContainer.append(seasonName)
}

function renderAllEpisodesForSeason(episode) {
    let episodeName = create('h2')
    episodeName.innerText = episode.title
    episodeName.addEventListener('click', () => getOneEpisode(episode))
    subcategoryContainer.append(episodeName)
}