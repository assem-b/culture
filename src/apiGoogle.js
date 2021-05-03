const axios = require('axios')

const title = 'elon musk'
const url = `https://www.googleapis.com/books/v1/volumes?q=`


const data = async () => {
    let variable =  await axios.get(url + title)
                                .then((response) => response.data) 
                                .catch((error) => error)
    console.log(variable.items[1])       
}

data()



