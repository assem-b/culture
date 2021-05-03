const express = require('express')
const hbs = require('hbs')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000
console.log(__dirname)

app.set('views', 'src/views')
app.set('view engine', 'hbs')
hbs.registerPartials('src/views/partials')

pathStatic = path.join(__dirname, 'static')
app.use(express.static(pathStatic))

app.get('', (req, res) => {
    res.render('base', { whichPartial: () => 'form' })
})


app.listen(port, () => console.log(`Server is up on ${port}`))
