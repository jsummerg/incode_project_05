const express = require('express')
const router = express.Router()
const popularMoviesRouter = require('./api/popularMovies.js')
const videosRouter = require('./api/videos.js')
const movieInfoRouter = require('./api/movieInfo.js')
const CastRouter = require('./api/castApi.js')
const RatingRouter = require('./api/ratingApi.js')

//body parser for post requests
const app = express()
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))

router.use('/popular-movies' , popularMoviesRouter)
router.use('/movie-ratings' , RatingRouter)
router.use('/videos', videosRouter)
router.use('/movieInfo', movieInfoRouter)
router.use('/castApi', CastRouter)


module.exports = router