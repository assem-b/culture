const title = document.querySelector('#title')
const suggestion = document.querySelector('.suggestion')
const body = document.querySelector('body')
const html = document.querySelector('html')

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
    divChild.addEventListener('click', (e) => {
        let title = document.querySelector('#title')
        title.value = divChild.childNodes[0].innerHTML
        removeResults(suggestion)
    })

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

const fetchApi = async () => {
    let response = {}

    if (title.value.length > 2) {
        const urlGoogleApi = `https://www.googleapis.com/books/v1/volumes?q=${title.value}&printType=books&langRestrict=fr&maxResults=5`
        response = await fetch(urlGoogleApi)
            .then(response => response.json())
            .catch((error) => error)
        console.log(response)
    }

    removeResults(suggestion)
    displayResults(response.items, suggestion)
}

// affiche les r??sultats de Google Books Api ?? mesure que l'utilisateur tape le titre
title.addEventListener('input', async (e) => fetchApi())

title.addEventListener('click', async (e) => fetchApi())

//Click sur body enl??ve les r??sultats
html.addEventListener('click', (e) => removeResults(suggestion))


// keyup / keypress
// async function 
// create node for data list delayed
// bug autocomplete off sur Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1474137
// pertinence des titres

// demain
// not all options are displayed

// abandonner la datalist
// utilisation de divs

// probl??me des doublons
// crit??re: titre et auteur sont identiques
// /!\ formatage des informations
// comment ??viter la duplication de removeResult ?
// la vitesse ne donne pas le temps ?? la fonction de s'ex??cuter
// function create suggestion
// Formater les r??sultats

// quand tout est effac?? avec ctrl + A et return les r??sultats ne sont pas effac??s
// => probl??me de lenteur || Probl??me r??gl??

// keyup => input pour copier coller

//Am??liorer la recherche => pas la priorit??