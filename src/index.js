document.addEventListener('DOMContentLoaded', () => {
    // URL's
const allSeasonsURL = 'https://api.catalogopolis.xyz/v1/seasons/'
const allDoctorsURL = 'https://api.catalogopolis.xyz/v1/doctors/'
const allDirectorsURL = 'https://api.catalogopolis.xyz/v1/directors/'
const allWritersURL = 'https://api.catalogopolis.xyz/v1/writers/'
const allEpisodesURL = 'https://api.catalogopolis.xyz/v1/episodes'

    // helpers
const create = el => document.createElement(el)
const select = el => document.querySelector(el)

    // grab stuff
const firstContainer = select('#first-container')
const secondContainer = select('#second-container')
const extraContainer = select('#third-container')
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

function fetchAllEpisodes(episodeName) {
    fetch(allEpisodesURL)
    .then(r => r.json())
    .then(episodes => findEpisode(episodes, episodeName))
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
    extraContainer.innerText = ''
    fetch(`${allSeasonsURL}${season.id}/serials`)
    .then(r => r.json())
    .then(season => season.forEach(episode => {
        if(episode.serial) {
            let episodeName = create('p')
            let likeButton = create('button')
            episodeName.innerText = `${episode.serial}. ${episode.title}  `
            likeButton.innerText = 'Like'
            likeButton.className = ''
            episodeName.addEventListener('click', () => {
                fetchAllEpisodes(episodeName)
                fetch(allEpisodesURL)
                .then(r => r.json())
                .then(episodes => {
                        // make episodeName the actual name of the episode
                    let nameMinusNumber = episodeName.innerText.split(' ').slice(1)
                    let nameMinusLike = []
                    for (let word of nameMinusNumber) {
                        if (word === 'Like'){
                            // do nothing
                        } else {
                            nameMinusLike.push(word)
                        }
                    }
                    let name = nameMinusLike.join(' ')
                        // find episode
                    for (let episode of episodes) {
                        if(episode.title == name) {
                            renderEpisodeDetails(episode)
                            break;
                        } else {
                            renderNoEpisodeDetails(name)
                        }
                    }
                })
            })
            likeButton.addEventListener('click', (e) => likeButtonClickEvent(e))
            episodeName.append(likeButton)
            secondContainer.append(episodeName)
        } else {
            renderOneEpisode(episode.title)
        }
    }))
}

function getAndRenderOneDoctor(doctor) {
    secondContainer.innerText = ''
    extraContainer.innerText = ''
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
        let likeButton = create('button')
        episodeName.innerText = `${doctorEpisode.title} `
        likeButton.innerText = 'Like'
        likeButton.className = ''
        episodeName.addEventListener('click', () => fetchAllEpisodes(episodeName))
        likeButton.addEventListener('click', (e) => likeButtonClickEvent(e))
        episodeName.append(likeButton)
        episodesDiv.append(episodeName)
    }))
}

function getAndRenderOneDirector(director) {
    extraContainer.innerText = ''
    secondContainer.innerText = `${director.name} directed the following episodes:`
    fetch(`${allDirectorsURL}${director.id}/serials`)
    .then(r => r.json())
    .then(episodes => episodes.forEach(episode => renderOneEpisode(`${episode.title}`)))
}

function getAndRenderOneWriter(writer) {
    extraContainer.innerText = ''
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
    let likeButton = create('button')
    episodeName.innerText = `${path}  `
    likeButton.innerText = 'Like'
    likeButton.className = ''
    episodeName.addEventListener('click', () => fetchAllEpisodes(episodeName))
    likeButton.addEventListener('click', (e) => likeButtonClickEvent(e))
    episodeName.append(likeButton)
    secondContainer.append(episodeName)
}

function likeButtonClickEvent(e) {
    if(e.target.className === '') {
        e.target.style.backgroundColor = 'red'
        e.target.style.color = 'white'
        e.target.className = 'liked'
    } else if (e.target.className === 'liked') {
        e.target.style.backgroundColor = 'white'
        e.target.style.color = 'black'
        e.target.className = ''
    }
}

function findEpisode(episodes, episodeName) {
        // make episodeName be the actuall name
    let nameAsArray = episodeName.innerText.split(' ')
    let nameMinusLike = []
    for (let word of nameAsArray) {
        if (word === 'Like'){
            // do nothing
        } else {
            nameMinusLike.push(word)
        }
    }
    let name = nameMinusLike.join(' ')
        // find episode
    for (let episode of episodes) {
        if(episode.title == name) {
            renderEpisodeDetails(episode)
            break;
        } else {
            renderNoEpisodeDetails(name)
        }
    }
}

function renderEpisodeDetails(episode) {
    extraContainer.innerText = ''
    let title = create('p')
    let airDate = create('p')
    let runtime = create('p')
    let viewers = create('p')
    let rating = create('p')
    title.innerText = episode.title
    airDate.innerText = `Aired: ${episode.originalAirDate.slice(5)}-${episode.originalAirDate.slice(0, 4)}`
    runtime.innerText = `Runtime: ${episode.runtime}`
    viewers.innerText = `Viewers: ${episode.ukViewersMM} million `
    rating.innerText = `Rating: ${episode.appreciationIndex} / 100`
    extraContainer.append(title, airDate, runtime, viewers, rating)
}

function renderNoEpisodeDetails(name) {
    extraContainer.innerText = `${name} is not in the Database`
}

})
