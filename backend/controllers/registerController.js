// CHANGE THIS FILE NAME TO registerController.js

const asyncHandler = require('express-async-handler')
const pool = require('../config/db')
const bcrypt = require('bcryptjs')
const { errorHandler } = require('../middleware/errorMiddleware')

// Register form handling

const register = asyncHandler(async (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err

    const {
      firstname,
      lastname,
      username,
      email,
      password,
      bio,
      user_picture
    } = req.body

    // Hashing password
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) throw err
        // console.log(hash)
        hashed_password = hash

        // Store hashed_password in DB.

        connection.query(
          'INSERT INTO `users` SET `user_firstname` = ? , `user_lastname` =? , user_username=?, user_email=?, user_password=?, user_bio=?, user_picture=?',
          [
            firstname,
            lastname,
            username,
            email,
            hashed_password,
            bio,
            user_picture
          ],
          (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
              res.status(302).redirect('dashboard')
              console.log(`${firstname} has been added.`)
            } else {
              console.log(err)
            }

            // console.log('ERROR_4')
          }
        )
      })
    })
  })
})

// // Login form handling

module.exports = {
  register
}
