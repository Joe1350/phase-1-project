    // URL's
const allSeasonsURL = 'https://api.catalogopolis.xyz/v1/seasons/'
const allDoctorsURL = 'https://api.catalogopolis.xyz/v1/doctors/'
const allDirectorsURL = 'https://api.catalogopolis.xyz/v1/directors/'
const allWritersURL = 'https://api.catalogopolis.xyz/v1/writers/'

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
const refresh = select('#refresh')

    // event listeners
seasonsButton.addEventListener('click', () => {
    clearPage()
    getAllSeasons()
})

doctorsButton.addEventListener('click', () => {
    clearPage()
    getAllDoctors()
})

directorButton.addEventListener('click', () => {
    clearPage()
    getAllDirectors()
})

writersButton.addEventListener('click', () => {
    clearPage()
    getAllWriters()
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

function getAllWriters() {
    fetch(allWritersURL)
    .then(r => r.json())
    .then(writers => writers.forEach(writer => renderAllWriters(writer)))
}

    // render  all functions
function renderAllSeasons(season) {
    let seasonName = create('p')
    seasonName.innerText = season.name
    seasonName.addEventListener('click', () => getAndRenderOneSeason(season))
    firstContainer.append(seasonName)
}

function renderAllDoctors(doctor) {
    let doctorName = create('p')
    doctorName.innerText = doctor.incarnation
    doctorName.addEventListener('click', () => getAndRenderOneDoctor(doctor))
    firstContainer.append(doctorName)
}

function renderAllDirectors(director) {
    let directorName = create('p')
    directorName.innerText = director.name
    directorName.addEventListener('click', () => getAndRenderOneDirector(director))
    firstContainer.append(directorName)
}

function renderAllWriters(writer) {
    let writerName = create('p')
    writerName.innerText = writer.name
    writerName.addEventListener('click', () => getAndRenderOneWriter(writer))
    firstContainer.append(writerName)
}

    // get and render one functions
function getAndRenderOneSeason(season) {
    secondContainer.innerText = `${season.name}:`
    fetch(`${allSeasonsURL}${season.id}/serials`)
    .then(r => r.json())
    .then(season => season.forEach(episode => {
        if(episode.serial) {
            renderOneEpisode(`${episode.serial}. ${episode.title}`)
        } else {
            renderOneEpisode(episode.title)
        }
    }))
}

function getAndRenderOneDoctor(doctor) {
    secondContainer.innerText = ''
    firstContainer.style.position = 'fixed'
    secondContainer.style.position = 'absolute'
    let actorDiv = create('div')
    let episodesDiv = create('Div')
    let spacer = create('div')
    actorDiv.id = 'actor-name'
    actorDiv.innerText = `Actor for the ${doctor.incarnation}:`
    episodesDiv.id = 'episodes'
    episodesDiv.innerText = 'Episodes the actor was in:'
    spacer.className = 'spacer'
    secondContainer.append(actorDiv, spacer, episodesDiv)
    fetch(`${allDoctorsURL}${doctor.id}/actors`)
    .then(r => r.json())
    .then(actor => actor.forEach(actor => {
        let actorName = create('p')
        actorName.innerText = actor.name
        actorDiv.append(actorName)
    }))
    fetch(`${allDoctorsURL}${doctor.id}/serials`)
    .then(r => r.json())
    .then(doctorEpisodes => doctorEpisodes.forEach(doctorEpisode => {
        let episodeName = create('p')
        episodeName.innerText = doctorEpisode.title
        episodesDiv.append(episodeName)
    }))
}

function getAndRenderOneDirector(director) {
    secondContainer.innerText = `${director.name} directed the following episodes:`
    fetch(`${allDirectorsURL}${director.id}/serials`)
    .then(r => r.json())
    .then(episodes => episodes.forEach(episode => renderOneEpisode(`${episode.title}`)))
}

function getAndRenderOneWriter(writer) {
    secondContainer.innerText = `${writer.name} wrote the following episodes:`
    fetch(`${allWritersURL}${writer.id}/serials`)
    .then(r => r.json())
    .then(episodes => episodes.forEach(episode => renderOneEpisode(`${episode.title}`)))
}

    // callback functions
function clearPage() {
    firstContainer.innerText = ''
    secondContainer.innerText = ''
    extraContainer.innerText = ''
    writersButton.innerText = ''
    refresh.style.display = 'block'
}

function renderOneEpisode(path) {
    let episodeName = create('p')
    episodeName.innerText = path
    secondContainer.append(episodeName)
}