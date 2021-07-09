const express = require('express')
const router = express.Router()
const db = require('../../database')
const axios = require('axios')
const { redirectToLogin } = require('../../middlewear')

router.get('/', (req, res) => {
    axios.get(`/discover/movie${process.env.TMDB_API_KEY}`)
    .then(response => {
        res.send(response.data)
    })
    .catch((err) => {
        res.send(err.message)
    })
})

router.get('/:genres', (req, res) => { 
    axios.get(`/discover/movie${process.env.TMDB_API_KEY}`, { params: { with_genres: req.params.genres } })
    .then(response => {
        //console.log(response.data)
        res.send(response.data)
    })
    .catch((err) => {
        res.send(err.message)
    })
})

module.exports = router