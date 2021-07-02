const express = require('express')
const router = express.Router()
const popularMoviesRouter = require('./api/popularMovies.js')

router.use('/popular-movies' , popularMoviesRouter)

module.exports = router