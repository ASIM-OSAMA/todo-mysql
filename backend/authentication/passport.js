// const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const pool = require('../config/db')
const bcrypt = require('bcryptjs')

module.exports = passport => {
  passport.use(
    new LocalStrategy(
      {
        // define the parameter in req.body that passport can use as
        // username and password or whatever you want to use
        usernameField: 'email',
        passwordField: 'password'
      },
      (email, password, cb) => {
        pool.getConnection((err, connection) => {
          if (err) throw err
          // console.log(email, password)

          connection.query(
            `SELECT * FROM users WHERE user_email = ?`,
            email,
            (err, row) => {
              if (err) {
                return cb(err)
              }
              if (!row.length) {
                // If no email in db
                return cb(null, false, { message: 'Incorrect Email.' })
              }

              // Match password
              bcrypt.compare(password, row[0].user_password, (err, isMatch) => {
                if (err) throw err
                // console.log(row.length)

                if (isMatch) {
                  return cb(null, row)
                } else {
                  // If no password in db
                  return cb(null, false, { message: 'Password incorrect.' })
                }
              })
            }
          )
        })
      }
    )
  )
  passport.serializeUser((row, cb) => {
    process.nextTick(() => {
      cb(null, { id: row.id, username: row.firstname })
    })
  })

  passport.deserializeUser((row, cb) => {
    process.nextTick(() => {
      return cb(null, row)
    })
  })
}
