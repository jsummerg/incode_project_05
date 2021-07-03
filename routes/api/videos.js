const express = require('express')
const router = express.Router()
const db = require('../../database')
const axios = require('axios')
const { redirectToLogin } = require('../../middlewear')

router.get('/', (req, res) => {
    // should be changed after to ${movieId} in the place of "550" in the below line. This is for testing at home page.
    axios.get(`/movie/550/videos${process.env.TMDB_API_KEY}`)
    .then(response => {
        console.log(response)
        res.send(response.data)
    })
    .catch((err) => {
        res.send(err.message)
    })
})

module.exports = router