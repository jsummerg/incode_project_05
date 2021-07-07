const express = require('express')
const router = express.Router()
const db = require('../database')

router.get('/:id', (req, res) => {
    db.any('SELECT * FROM users;')
    .then((usersData) => {
        db.any('SELECT * FROM ratings WHERE movie_id = $1;', [req.params.id])
        .then((ratingData) => {
            res.render('pages/details', {
                ratings: ratingData,
                message: req.query.message,
                users: usersData,
                movieId: req.params.id,
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

router.post('/rate/:id', (req, res) => {
    db.none('INSERT INTO ratings(user_id, movie_id, rating) VALUES ($1, $2, $3);', [req.session.user_id, req.params.id, req.body.rating])
    .then(() => {
        res.redirect(`/movies/${req.params.id}?message=Thank%20You%20for%20rating!`)
    })
    .catch(err => {
      res.send(err)
    })
})

module.exports = router