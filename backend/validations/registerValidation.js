const asyncHandler = require('express-async-handler')
const pool = require('../config/db')
const { check, validationResult } = require('express-validator')

const validateUser = [
  check('firstname')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Firstname can not be empty!')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Minimum 3 characters required!')
    .bail(),

  check('lastname')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Lastname can not be empty!')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Minimum 3 characters required!')
    .bail(),

  check('password')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Password can not be empty!')
    .bail()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .bail()
    .isStrongPassword({
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1
    })
    .withMessage(
      'Password must contain 1 lowercase and uppercase character and a symbol'
    )
    .bail(),

  check('password2')
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        if (req.body.password != value) {
          reject(Error('Passwords do not match'))
        }
        resolve(true)
      })
    })
    .bail(),

  // Check if email is already registered
  check('email')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Invalid email address!')
    .bail()
    .isEmail()
    .withMessage('Not a valid e-mail address')
    .bail()
    .custom(value => {
      return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
          if (err) throw err
          connection.query(
            `SELECT * FROM users WHERE user_email = ?`,
            value,
            (err, emailExist) => {
              if (err) {
                reject(Error('Server Error'))
              }

              if (emailExist.length > 0) {
                reject(Error('E-mail already in use'))
              }
              resolve(true)
            }
          )
        })
      })
    })

    .bail(),
  (req, res, next) => {
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

    const errors = validationResult(req)

    // if an error exist, send the error and keep entered form fields

    if (!errors.isEmpty())
      return res.status(422).render('./admin/register', {
        errors: errors.array(),
        firstname,
        lastname,
        username,
        email,
        password,
        password2,
        bio,
        profile_picture
      })

    // if no error exist, proceed (check the route)
    next()
  }
]

module.exports = validateUser
