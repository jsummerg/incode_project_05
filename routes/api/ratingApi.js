const express = require('express')
const router = express.Router()
const db = require('../../database')
const axios = require('axios')
const { redirectToLogin } = require('../../middlewear')

router.get('/', (req, res) => {
    db.any('SELECT * FROM ratings;')
    .then((ratingData) => {
        res.send(ratingData)
    })
    .catch((err) => {
        res.send(err.message)
    })
})

router.get('/:id', (req, res) => {
    db.any('SELECT * FROM ratings WHERE movie_id = $1;', req.params.id)
    .then((ratingData) => {
        res.send(ratingData)
    })
    .catch((err) => {
        res.send(err.message)
    })
})

module.exports = router