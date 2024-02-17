// const express = require('express')
const asyncHandler = require('express-async-handler')
const async = require('async')
const pool = require('../config/db')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
// const { getUserData } = require('../middleware/getUserData')

// cb == done

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

  // const getUserData = id_obj => {
  //   const id = id_obj.id

  //   pool.query(`SELECT * FROM users WHERE user_id = ?`, id, (err, row) => {
  //     if (err) {
  //       return err
  //     }
  //     // // Add if no id was found.
  //     // if (row.length == 0) {
  //     //   // return reject('ID to Deserialize Not Found!')
  //     //   return ( 'ID to Deserialize Not Found!')
  //     // }

  //     // if id found
  //     else {
  //       console.log(`passport.js console.log 2: ${row[0].user_firstname}`)
  //       return cb(null, getUserData(id))
  //     }
  //   })
  // }

  // To maintain a login session:

  // Serialize: takes infos about the user (user_id) only and store it in the (cookie).
  passport.serializeUser((user, cb) => {
    process.nextTick(() => {
      return cb(null, { id: user[0].user_id })
    })
  })

  // when the browser makes a req (i.e home page), the cookie comes back with the (user_id)
  // deserialize use the (cookie) to retrieve infos about user with that (id).

  passport.deserializeUser((id, cb) => {
    process.nextTick(() => {
      pool.query(`SELECT * FROM users WHERE user_id = ?`, id.id, (err, row) => {
        if (err) {
          return err
        }
        // // Add if no id was found.
        // if (row.length == 0) {
        //   // return reject('ID to Deserialize Not Found!')
        //   return ( 'ID to Deserialize Not Found!')
        // }

        // if id found
        else {
          // console.log(`passport.js console.log 2: ${row[0].user_firstname}`)
          return cb(null, {
            row: row[0]
          })
          // Access the row data from .hbs by --> {{user.row.user_id}}
        }
      })
    })
  })
}
// passport.deserializeUser((id, done) => done(null, getUserByUUID(id)))

// Note: (Source: Passport Docs, https://www.passportjs.org/concepts/authentication/downloads/html/)
// To balance this tradeoff, it is recommended that any user information needed on every request
//  to the application be stored in the session. For example, if the application displays a user
//  element containing the user's name, email address, and photo on every page, that information
// should be stored in the session to eliminate what would otherwise be frequent database queries.
// Specific routes, such as a checkout page, that need additional information such as a shipping address,
//  can query the database for that data.
