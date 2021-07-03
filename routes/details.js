const express = require('express')
const router = express.Router()
const db = require('../database')

router.get('/:id', (req, res) => {
    const movieId = Number(req.params.id)
        console.log(req.params.id)
        console.log(movieId)
        
    db.any('SELECT * FROM users;')
    .then((usersData) => {
        db.any('SELECT * FROM ratings;')
        .then((ratingData) => {
            res.render('pages/details', {
                ratings: ratingData,
                users: usersData,
                movieId: movieId,
                req: req,
                title: "Movie Details"
            })
        })
        .catch((err) => {
            res.send(err.message)
        })
    })
    .catch((err) => {
        res.send(err.message)
    })
})

router.get('/', (req, res) => {
    const movieId = Number(req.params.id)
        console.log(req.params.id)
        console.log(movieId)
        
    db.any('SELECT * FROM users;')
    .then((usersData) => {
        db.any('SELECT * FROM ratings;')
        .then((ratingData) => {
            res.render('pages/details', {
                ratings: ratingData,
                users: usersData,
                movieId: movieId,
                req: req,
                title: "Movie Details"
            })
        })
        .catch((err) => {
            res.send(err.message)
        })
    })
    .catch((err) => {
        res.send(err.message)
    })
})
module.exports = router