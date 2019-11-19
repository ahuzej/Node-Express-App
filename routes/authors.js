const express = require('express')
const router = express.Router()
const Author = require('../models/author')

//Get all authors
router.get('/', async (req, res) => {
    try {
        const authors = await Author.find({})
        res.render('authors/index', {authors: authors})
    } catch (e) {
        res.redirect('/')
    }
})

//Add new author
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() })
})

//Create author route
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save()
        res.redirect('authors')
        
    } catch (e) {
        res.render('authors/new', {
            author: author,
            errorMessage: 'An error has occured during insert operation.'
        })
    }
})

module.exports = router