const express = require('express')
// const router = express.Router()
// const passport = require('passport')

const { register } = require('../controllers/registerController')
const validateUser = require('../validations/registerValidation')

const todoRoutes = require('./todoRoutes')
const usersRoutes = require('./usersRoutes')
const adminRoutes = require('./adminRoutes')
const loginRoute = require('./loginRoute')
const logoutRoute = require('./logoutRoute')
const { ensureAuthenticated } = require('../middleware/authenticate')
const { authz } = require('../middleware/authorization')

const app = express()

// Make sure all following routes will be passed through ensureAuthenticated

const routes = [
  // Todo index page
  app.get('/', (req, res) => {
    if (req.user) {
      // console.log(req.session)
      // console.log(req.cookie)
      // console.log(req.user)
      // console.log(res.locals.user)

      res.render('index', {
        title: 'Home Page',
        // user: res.locals.user,
        id: req.user.id,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        picture: req.user.picture,
        role: req.user.role
      })
    } else {
      res.render('index')
    }
  }),

  app.get('/login', (req, res) =>
    res.render('./admin/login', {
      title: 'Login'
    })
  ),

  // Register routes and form handling
  app.get('/register', (req, res) =>
    res.render('./admin/register', {
      title: 'Register'
    })
  ),
  app.post('/register', validateUser, register),

  app.use(loginRoute),

  app.use(logoutRoute),

  app.all('*', ensureAuthenticated),
  app.use('/admin', authz, adminRoutes),
  app.use('/admin/users', authz, usersRoutes),
  app.use('/todo', todoRoutes)
]

module.exports = { routes }
