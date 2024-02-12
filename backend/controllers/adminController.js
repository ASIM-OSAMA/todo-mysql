const asyncHandler = require('express-async-handler')
const pool = require('../config/db')
const { errorHandler } = require('../middleware/errorMiddleware')

// router.get('/', (req, res) => res.render('./admin/welcome'))
// router.get('/register', (req, res) => res.render('./admin/register'))
// router.get('/login', (req, res) => res.render('./admin/login'))
// router.get('/panel', (req, res) => res.render('./admin/dashboard'))

// Register form handling
const addAdmin = asyncHandler(async (req, res) => {
  const {
    firstname,
    lastname,
    username,
    email,
    password,
    password2,
    bio,
    profile_picture
  } = req.body

  let errors = []

  // Missing fields
  if (!firstname || !lastname || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' })
  }

  // Password confirmation
  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' })
  }

  // Check password length
  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' })
  }

  // if an error exist, send the error and keep entered form fields
  if (errors.length > 0) {
    res.render('./admin/register', {
      errors,
      firstname,
      lastname,
      username,
      email,
      password,
      password2,
      bio,
      profile_picture
    })
  } else {
    // Validation passed

    res.send('Validation passed')
    console.log('Validation passed 👍')

    // Check if email is already registered
    const userExist = asyncHandler(async (req, res) => {
      await pool.getConnection((err, connection) => {
        if (err) throw err
        connection.query(
          'SELECT * FROM users WHERE user_email = ?',
          [email],
          (err, rows) => {
            // connection.release() // return the connection to pool
            //         // if (!err) {
            //         //   console.log('PASS')
            //         //   console.log(req.params.email)
            //         // } else {
            //         //   // User Email Exist
            //         //   errors.push({ msg: 'Email already exist, you want to login?' })
            //         //   console.log(req.params.email)
            //         //   res.status(200).render('./admin/register', {
            //         //     errors,
            //         //     firstname,
            //         //     lastname,
            //         //     username,
            //         //     email,
            //         //     password,
            //         //     password2,
            //         //     bio,
            //         //     profile_picture,
            //         //     user_exist
            //         //   })
            //         // }
            res.send('Connection Passed')
            console.log('Connection Passed 👍')
          }
        )
      })
    })
  }
})

// // Login form handling

module.exports = {
  addAdmin
}
