const express = require('express')
const router = express.Router()
const { register } = require('../controllers/registerController')
const validateUser = require('../validations/registerValidation')
const passport = require('passport')

// Dashboard, Welcome, Manage-Admin routes handling
// router.get('/', (req, res) => res.render('./admin/welcome'))
router.get('/', (req, res) => res.render('./admin/dashboard', {}))

router.get('/manage-admins', (req, res) => res.render('./admin/manage-admins'))

// Register routes and form handling
router.get('/register', (req, res) => res.render('./admin/register'))
router.route('/register').post(validateUser, register)

// // Logout routes handling
// router.get('/logout', (req, res) => {
//   req.logout(err => {
//     if (err) {
//       return next(err)
//     }
//     req.flash('success_msg', 'Successfully Logged-Out')
//     res.redirect('/admin/login') //Redirect to login page
//   })
// })

module.exports = router
