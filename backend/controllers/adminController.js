const asyncHandler = require('express-async-handler')
const pool = require('../config/db')
// const { check, validationResult } = require('express-validator')
const { errorHandler } = require('../middleware/errorMiddleware')

// router.get('/', (req, res) => res.render('./admin/welcome'))
// router.get('/register', (req, res) => res.render('./admin/register'))
// router.get('/login', (req, res) => res.render('./admin/login'))
// router.get('/panel', (req, res) => res.render('./admin/dashboard'))

// Register form handling

const addAdmin = asyncHandler(async (req, res) => {
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
    // const params = req.body

    connection.query(
      'INSERT INTO `users` SET `user_firstname` = ? , `user_lastname` =? , user_username=?, user_email=?, user_password=?, user_bio=?, user_picture=?',
      [firstname, lastname, username, email, password, bio, user_picture],
      (err, rows) => {
        connection.release() // return the connection to pool
        if (!err) {
          res.status(302).redirect('dashboard')
          // res.send(`${firstname} has been added.`)
          console.log(`${firstname} has been added.`)
        } else {
          console.log(err)
        }

        // console.log('ERROR_4')
      }
    )
  })
})

// // Login form handling

module.exports = {
  addAdmin
}
