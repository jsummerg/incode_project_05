const express = require('express')
const router = express.Router()
const popularMoviesRouter = require('./api/popularMovies.js')
const videosRouter = require('./api/videos.js')

router.use('/popular-movies' , popularMoviesRouter)
router.use('/videos' , videosRouter)

module.exports = router