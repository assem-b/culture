const title = document.querySelector('#title')
const suggestion = document.querySelector('.suggestion')
const body = document.querySelector('body')

const removeResults = (divParent) => {
    while (divParent.firstChild) {
        divParent.removeChild(divParent.firstChild)
    }
}

const divAuthor = (divParent, authors) => {
    divChild = document.createElement('div')
    divChild.classList.add('author')

    if (!authors) {
        divChild.innerHTML += '(auteur introuvable)'
    } 

    else if (authors.length === 1) {
        divChild.innerHTML += authors[0]
    }

    else if (authors.length > 1) {
        authors.forEach((author) => {
            if (authors.indexOf(author) !== authors.length - 1) {
                divChild.innerHTML += author + ' - '
                return
            }
            divChild.innerHTML += author
        })
    }

    else {
        console.log('ERROR')
    }

    divParent.appendChild(divChild)
}

const divSubtitle = (divParent, subtitle) => {
    divChild = document.createElement('div')
    divChild.classList.add('subtitle')

    if (subtitle) {
        divChild.innerHTML = subtitle
    }

    divParent.appendChild(divChild)
}

const divTitle = (divParent, title) => {
    divChild = document.createElement('div')
    divChild.classList.add('titre')
    divChild.innerHTML = title

    divParent.appendChild(divChild)
}

//Application d'une destructuration
const createResult = ({title, subtitle, authors}, divParent) => {
    let divChild = document.createElement('div')
    divChild.classList.add('livre')
    
    divTitle(divChild, title)
    divSubtitle(divChild, subtitle)
    divAuthor(divChild, authors)
    
    divParent.appendChild(divChild)
}

const displayResults = (items, divParent) => {
    if (title.value.length < 3) {
        return
    }
    if (items === undefined) {
        return //NE PAS OUBLIER
    }
    items.forEach((item) => createResult(item.volumeInfo, divParent))
}

// affiche les résultats de Google Books Api à mesure que l'utilisateur tape le titre
title.addEventListener('input', async (e) => {
    let response = {}
    
    if (title.value.length > 2) {
        const urlGoogleApi = `https://www.googleapis.com/books/v1/volumes?q=${title.value}&printType=books&langRestrict=fr&maxResults=10`
        response = await fetch(urlGoogleApi)
            .then(response => response.json())
            .catch((error) => error)
    }

    removeResults(suggestion)
    displayResults(response.items, suggestion)
})

//Click sur body enlève les résultats
body.addEventListener('click', (e) => removeResults(suggestion))

// keyup / keypress
// async function 
// create node for data list delayed
// bug autocomplete off sur Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1474137
// pertinence des titres

// demain
// not all options are displayed

// abandonner la datalist
// utilisation de divs

// problème des doublons
// critère: titre et auteur sont identiques
// /!\ formatage des informations
// comment éviter la duplication de removeResult ?
// la vitesse ne donne pas le temps à la fonction de s'exécuter
// function create suggestion
// Formater les résultats

// quand tout est effacé avec ctrl + A et return les résultats ne sont pas effacés
// => problème de lenteur || Problème réglé

// keyup => input pour copier coller

//Améliorer la recherche => pas la priorité