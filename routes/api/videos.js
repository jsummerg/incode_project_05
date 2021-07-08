const express = require('express')
const router = express.Router()
const db = require('../../database')
const axios = require('axios')
const { redirectToLogin } = require('../../middlewear')

router.get('/:movie_id', (req, res) => {
    let movieId = req.params.movie_id  
    axios.get(`/movie/${movieId}/videos${process.env.TMDB_API_KEY}`)
    .then(response => {
        res.send(response.data)
    })
    .catch((err) => {
        res.send(err.message)
    })
})

module.exports = router