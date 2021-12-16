    // URL's
const allSeasonsURL = 'https://api.catalogopolis.xyz/v1/seasons/'
const allDoctorsURL = 'https://api.catalogopolis.xyz/v1/doctors'
const allDirectorsURL = 'https://api.catalogopolis.xyz/v1/directors'
const allWritersURL = 'https://api.catalogopolis.xyz/v1/writers'

    // helpers
const create = el => document.createElement(el)
const select = el => document.querySelector(el)

    // grab stuff
const firstContainer = select('#first-container')
const secondContainer = select('#second-container')
const extraContainer = select('#third-container')
const refreshContainer = select('#fourth-container')
const seasonsButton = select('#seasons-button')
const doctorsButton = select('#doctors-button')
const directorButton = select('#directors-button')
const writersButton = select('#writers-button')

    // event listeners
seasonsButton.addEventListener('click', () => {
    firstContainer.innerText = ''
    secondContainer.innerText = ''
    extraContainer.innerText = ''
    writersButton.innerText = ''
    // change refresh button from none to block
    getAllSeasons()
})

doctorsButton.addEventListener('click', () => {
    firstContainer.innerText = ''
    secondContainer.innerText = ''
    extraContainer.innerText = ''
    writersButton.innerText = ''
    // change refresh button from none to block
    getAllDoctors()
})

directorButton.addEventListener('click', () => {
    firstContainer.innerText = ''
    secondContainer.innerText = ''
    extraContainer.innerText = ''
    writersButton.innerText = ''
    // change refresh button from none to block
    getAllDirectors()
})

    // get all fetches
function getAllSeasons() {
    fetch(allSeasonsURL)
    .then(r => r.json())
    .then(seasons => seasons.forEach(season => renderAllSeasons(season)))
}

function getAllDoctors() {
    fetch(allDoctorsURL)
    .then(r => r.json())
    .then(doctors => doctors.forEach(doctor => renderAllDoctors(doctor)))
}

function getAllDirectors() {
    fetch(allDirectorsURL)
    .then(r => r.json())
    .then(directors => directors.forEach(director => renderAllDirectors(director)))
}

    // render  all functions
function renderAllSeasons(season) {
    let seasonName = create('h1')
    seasonName.innerText = season.name
    seasonName.style.fontSize = '20px'
    seasonName.addEventListener('click', () => getAndRenderOneSeason(season))
    firstContainer.append(seasonName)
}

function renderAllDoctors(doctor) {
    let doctorName = create('h1')
    doctorName.innerText = doctor.incarnation
    doctorName.style.fontSize = '20px'
    doctorName.addEventListener('click', () => getAndRenderOneDoctor(doctor))
    firstContainer.append(doctorName)
}

function renderAllDirectors(director) {
    let directorName = create('p')
    directorName.innerText = director.name
    directorName.addEventListener('click', () => console.log(director))
    firstContainer.append(directorName)
}

    // get one w/ render one functions
function getAndRenderOneSeason(season) {
    secondContainer.innerText = ''
    let episodeDiv = create('div')
    episodeDiv.id = 'episode-div'
    episodeDiv.innerText = `${season.name}:`
    secondContainer.append(episodeDiv)
    fetch(`${allSeasonsURL}${season.id}/serials`)
    .then(r => r.json())
    .then(season => season.forEach(episode => {
        let episodeName = create('h2')
        episodeName.innerText = `${episode.serial}. ${episode.title}`
        episodeDiv.append(episodeName)
    }))
}

function getAndRenderOneDoctor(doctor) {
    secondContainer.innerText = ''
    let actorDiv = create('div')
    let episodesDiv = create('Div')
    let spacer = create('div')
    actorDiv.id = 'actor-name'
    actorDiv.innerText = `Actor for the ${doctor.incarnation}:`
    episodesDiv.id = 'episodes'
    episodesDiv.innerText = 'Episodes the actor was in:'
    spacer.className = 'spacer'
    secondContainer.append(actorDiv, spacer, episodesDiv)
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