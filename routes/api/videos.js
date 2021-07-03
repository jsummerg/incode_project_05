const express = require('express')
const router = express.Router()
const db = require('../../database')
const axios = require('axios')
// const res = await axios.get(`/movie/${movieId}/videos${process.env.TMDB_API_KEY}`, { params: { movieId: req.params.id } });
const { redirectToLogin } = require('../../middlewear')

router.get('/', (req, res) => {
    const movieId = req.params.id
    console.log(req.params.Id);
    // should be changed after to ${movieId} in the place of "550" in the below line. This is for testing at home page.
    axios.get(`/movie/${movieId}/videos${process.env.TMDB_API_KEY}`, { params: { movieId: req.params.id } })
    .then(response => {
        console.log(response)
        res.send(response.data)
    })
    .catch((err) => {
        res.send(err.message)
    })
})

module.exports = router