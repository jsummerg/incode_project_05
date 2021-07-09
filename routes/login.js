const express = require('express')
const db = require('../database')
const router = express.Router()
const bcrypt = require('bcrypt')
const session = require('express-session')
const { redirectToHome } = require('../middlewear')

// Login page
router.get('/', redirectToHome, (req, res) => {
    res.render('pages/login', {
        message: req.query.message,
        referer: req.headers.referer,
        req: req,
        title: 'Login',
    })
})

router.post('/', (req, res) => {
    // has the user entered both email and password?
    if (req.body.email === '' || req.body.password === '') {
        res.redirect('/login?message=Please%20insert%20email%20and%20password.')
    }

    // Does user exist
    db.oneOrNone('SELECT * FROM users WHERE email = $1;', [req.body.email.toLowerCase()])
    .then((existingUser) => {
        if (!existingUser) {
            return res.redirect("/login?message=User%20does%20not%20exist.")
        }
        // If so, does password match user?
        if (existingUser) {
            const hash = existingUser.password
            bcrypt.compare(req.body.password, hash, function(err, result) {
                if (result) {
                    // if successful, create session and redirect
                    req.session.user_id = existingUser.user_id
                    res.redirect(req.body.referer)
                } 
                else {
                    return res.redirect('/login?message=Incorrect%20login%20details.')
                }
            })
        }
    })
    .catch((err) => {
        res.send(err.message)
    })
})

module.exports = router