const express = require('express')
const hbs = require('hbs')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000

app.set('views', '/home/ad/node/book/src/views')
app.set('view engine', 'hbs')
hbs.registerPartials('/home/ad/node/book/src/views/partials')

pathStatic = path.join(__dirname, 'static')
app.use(express.static(pathStatic))

app.get('', (req, res) => {
    res.render('base', { whichPartial: () => 'form' })
})


app.listen(port, () => console.log(`Server is up on ${port}`))
