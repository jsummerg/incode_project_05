const express = require('express')
const router = express.Router()
const db = require('../database')

router.get('/:id', (req, res) => {
    db.any('SELECT * FROM users;')
    .then((usersData) => {
        db.any('SELECT * FROM ratings WHERE movie_id = $1 AND user_id = $2;', [req.params.id, req.session.user_id])
        .then((userRatingData) => {
            db.any('SELECT * FROM ratings WHERE movie_id = $1;', [req.params.id])
            .then((ratingData) => {
                res.render('pages/details', {
                    message: req.query.message,
                    ratings: ratingData,
                    users: usersData,
                    userRating: userRatingData,
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
    .catch((err) => {
        res.send(err.message)
    })
})

router.post('/rate/:id', (req, res) => {
    db.oneOrNone('SELECT * FROM ratings WHERE user_id = $1 AND movie_id = $2;', [req.session.user_id, req.params.id])
    .then((ratingData) => {
        console.log(ratingData)
        if (ratingData) {
            db.none('UPDATE ratings SET rating = $1 WHERE user_id = $2;', [req.body.rating, req.session.user_id])
            .then(() => {
                res.redirect(`/movies/${req.params.id}?message=Rating%20changed!`)
            })
            .catch(err => {
                res.send(err)
            }) 
        } 
        else {
            db.none('INSERT INTO ratings(user_id, movie_id, rating) VALUES ($1, $2, $3);', [req.session.user_id, req.params.id, req.body.rating])
            .then(() => {
                res.redirect(`/movies/${req.params.id}?message=Thank%20You%20for%20rating!`)
            })
            .catch(err => {
                res.send(err)
            }) 
        }
    })
    .catch(err => {
        res.send(err)
    }) 
})

module.exports = router