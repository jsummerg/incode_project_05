const express = require('express')
const router = express.Router()
const { redirectToLogin } = require('../middlewear')

router.get('/', (req, res) => {
    req.session.destroy(function(err) {
        if (err) {
            console.log(err)
            res.send(err.message)
        }
        else {
            res.clearCookie('login_cookie')
            res.redirect('/')
        }
    })
})

module.exports = router