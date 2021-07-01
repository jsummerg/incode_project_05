// redirect to login page if user is not logged in
const redirectToLogin = (req, res, next) => {
    if (!req.session.user_id) {
        res.clearCookie('login_cookie')
        res.redirect('/login')
    }
    else {
        next()
    }
}

// Redirect to home page if user is logged in
const redirectToHome = (req, res, next) => {
    if (req.session.user_id) {
        res.redirect('/')
    } else {
        next()
    }
}

module.exports = {redirectToLogin, redirectToHome}