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
    // change refresh button from none to block
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
    let episodeDiv = create('div')
    episodeDiv.id = 'episode-div'
    episodeDiv.innerText = `${season.name}:`
    subcategoryContainer.append(episodeDiv)
    fetch(`${allSeasonsURL}${season.id}/serials`)
    .then(r => r.json())
    .then(season => season.forEach(episode => {
        let episodeName = create('h2')
        episodeName.innerText = `${episode.serial}. ${episode.title}`
        episodeDiv.append(episodeName)
    }))
}

function getAllDoctors() {
    fetch(allDoctorsURL)
    .then(r => r.json())
    .then(doctors => doctors.forEach(doctor => renderAllDoctors(doctor)))
}

function getOneDoctor(doctor) {
    subcategoryContainer.innerText = ''
    let actorDiv = create('div')
    let episodesDiv = create('Div')
    let spacer = create('div')
    actorDiv.id = 'actor-name'
    actorDiv.innerText = 'Actor:'
    episodesDiv.id = 'episodes'
    episodesDiv.innerText = 'Episodes the actor was in:'
    spacer.className = 'spacer'
    subcategoryContainer.append(actorDiv, spacer, episodesDiv)
    fetch(`https://api.catalogopolis.xyz/v1/doctors/${doctor.id}/actors`)
    .then(r => r.json())
    .then(actor => actor.forEach(actor => {
        let actorName = create('h2')
        actorName.innerText = actor.name
        actorDiv.append(actorName)
    }))
    fetch(`https://api.catalogopolis.xyz/v1/doctors/${doctor.id}/serials`)
    .then(r => r.json())
    .then(doctorEpisodes => doctorEpisodes.forEach(doctorEpisode => {
        let episodeName = create('h2')
        episodeName.innerText = doctorEpisode.title
        episodesDiv.append(episodeName)
    }))
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
    
}

function renderAllDoctors(doctor) {
    let doctorName = create('h1')
    doctorName.innerText = doctor.incarnation
    doctorName.style.fontSize = '20px'
    doctorName.addEventListener('click', () => getOneDoctor(doctor))
    categoryContainer.append(doctorName)
}