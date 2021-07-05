const express = require('express')
const router = express.Router()
const popularMoviesRouter = require('./api/popularMovies.js')
const videosRouter = require('./api/videos.js')

//body parser for post requests
const app = express()
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))

router.use('/popular-movies' , popularMoviesRouter)
router.use('/videos', videosRouter)

module.exports = router