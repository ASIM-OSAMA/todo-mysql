const express = require('express')
const router = express.Router()
const passport = require('passport')
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
      res.render('index', {
        id: req.user.id,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        picture: req.user.picture
      })
    } else {
      res.render('index')
    }
  }),
  app.get('/login', (req, res) => res.render('./admin/login')),

  app.use(loginRoute),

  app.use(logoutRoute),

  app.all('*', ensureAuthenticated, authz),
  app.use('/admin', authz, adminRoutes),
  app.use('/admin/users', authz, usersRoutes)
  // app.use('/todos', todoRoutes)
]

module.exports = { routes }
