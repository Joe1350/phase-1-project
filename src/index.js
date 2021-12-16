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
// might rename
const likesAndCommentsContainer = select('#likes-comments-container')
//might rename
const seasonsButton = select('#seasons-button')
const doctorsButton = select('#doctors-button')
const companionButton = select('#companions-button')
let directorButton = select('#director-button')