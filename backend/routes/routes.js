const express = require('express')
const router = express.Router()
const passport = require('passport')
const todoRoutes = require('./todoRoutes')
const usersRoutes = require('./usersRoutes')
const adminRoutes = require('./adminRoutes')
const { ensureAuthenticated } = require('../middleware/authenticate')

const app = express()

// Make sure all following routes will be passed through ensureAuthenticated
const routes = [
  // Todo index page
  app.get('/', (req, res) => res.render('index')),
  app.get('/admin/login', (req, res) => res.render('./admin/login')),

  app.post('/admin/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/admin',
      // successMessage,
      failureRedirect: '/admin/login',
      badRequestMessage: 'Missing Credentials.', //missing credentials,
      failureFlash: true
    })(req, res, next)
  }),

  app.all('*', ensureAuthenticated),
  app.use('/admin', adminRoutes),
  app.use('/admin/users', usersRoutes)
  // app.use('/todos', todoRoutes)
]

module.exports = { routes }
