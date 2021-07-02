const express = require('express')
const router = express.Router()
const db = require('../database')

router.get('/', (req, res) => {
    db.any('SELECT * FROM users;')
    .then((usersData) => {
        db.any('SELECT * FROM ratings;')
        .then((ratingData) => {
            res.render('pages/home', {
                ratings: ratingData,
                users: usersData,
                req: req,
                title: "homepage"
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