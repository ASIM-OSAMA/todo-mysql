const express = require('express')
const passport = require('passport')

const app = express()

module.exports = app.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    badRequestMessage: 'Missing Credentials.', //missing credentials,
    failureFlash: true
  })(req, res, next)
})
