const title = document.querySelector('#title')
const suggestion = document.querySelector('.suggestion')


// affiche les résultats de Google Books Api à mesure que l'utilisateur tape le titre
title.addEventListener('keyup', async (e) => {
    //supprime les résultats de la recherche précendente
    while (suggestion.firstChild) {
        suggestion.removeChild(suggestion.firstChild)
    }
    if (title.value.length > 2) {
        const urlGoogleApi = `https://www.googleapis.com/books/v1/volumes?q=${title.value}&langRestrict=fr&maxResults=10`
        const res = await fetch(urlGoogleApi)
            .then(response => response.json())
            .catch((error) => error)

        while (suggestion.firstChild) {
            suggestion.removeChild(suggestion.firstChild)
        }

        console.log(res.items[0])

        res.items.forEach((item) => {        
            var optionNode = document.createElement('div')
            optionNode.innerHTML = item.volumeInfo.title + ' (' + item.volumeInfo.authors[0] +')'
            suggestion.appendChild(optionNode)
        })
        
    }
})

// keyup / keypress
// async function 
// create node for data list delayed
// bug autocomplete off sur Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1474137
// pertinence des titres

// demain
// not all options are displayed

// abandonner la datalist
// utilisation de divs