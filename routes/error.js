const express = require('express')
const router = express.Router()

// 404 error
router.get('/', (req, res) => {
    res.status(404).render('pages/error', {
        title: 'Error',
        req: req,
        message: req.query.message
    })
})


module.exports = router