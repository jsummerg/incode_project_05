const express = require('express')
const router = express.Router()
const axios = require('axios')
const { redirectToLogin } = require('../../middlewear')
const popularMoviesRouter = require('./api/popularMovies.js')

router.use('/popular-movies' , popularMoviesRouter)

// res.render('pages/api', {
//     message: req.query.message,
//     req: req,
//     title: 'Login',
//     movieData: response.data
// })

module.exports = router