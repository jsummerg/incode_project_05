const express = require('express')
const router = express.Router()
const db = require('../../database')
const axios = require('axios')
const { redirectToLogin } = require('../../middlewear')

router.get('/:movie_id', (req, res) => {
    let movieId = req.params.movie_id    
    // should be changed after to ${movieId} in the place of "550" in the below line. This is for testing at home page.
    axios.get(`/movie/${movieId}${process.env.TMDB_API_KEY}`, { params: { movieId: req.params.id } }) 
    .then(response => {
    res.send(response.data)
    console.log(response.data)
    })
    .catch((err) => {
        res.send(err.message)
    })
})

module.exports = router