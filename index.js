const express = require('express')
const morgan = require('morgan')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const axios = require('axios')
const app = express()


//postgres setup
const PORT = process.env.PORT || 3000


//body parser for post requests
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))


// Morgan setup
app.set(morgan('dev'))


// View Engine 
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(expressLayouts)


// sets the public folder to be the start path of public view files
app.use(express.static('public'))


// session
app.use(session({
    cookie: {
        maxAge: 1000 * 60 * 60
    },
    name: 'login_cookie',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))

// Axios
axios.defaults.baseURL = 'https://api.themoviedb.org/3'

// Routes
const homeRouter = require('./routes/home')
const loginRouter = require('./routes/login')
const signupRouter = require('./routes/signup')
const logoutRouter = require('./routes/logout')
const apiRouter = require('./routes/api')
const errorRouter = require('./routes/error')
const detailsRouter = require('./routes/details')

app.use('/', homeRouter)
app.use('/login', loginRouter)
app.use('/logout', logoutRouter)
app.use('/signup', signupRouter)
app.use('/api', apiRouter)
app.use('/movies', detailsRouter)
app.use('*', errorRouter)

// PORT
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})


