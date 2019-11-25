//ukoliko je server u dev modu
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const expressApp = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')


expressApp.set('view engine', 'ejs')
expressApp.set('views', __dirname + '/views')
expressApp.set('layout', 'layouts/layout')
expressApp.use(expressLayouts)
expressApp.use(express.static('public'))
expressApp.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})

const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to Mongoose'))

const indexRouter = require('./routes/index')
expressApp.use('/', indexRouter)

const authorRouter = require('./routes/authors')
expressApp.use('/authors', authorRouter)

const bookRouter = require('./routes/books')
expressApp.use('/books', bookRouter)


expressApp.listen(process.env.PORT || 3000)