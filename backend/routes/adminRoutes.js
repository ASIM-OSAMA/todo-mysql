const express = require('express')
const router = express.Router()
const { register } = require('../controllers/registerController')
const validateUser = require('../validations/registerValidation')

router.get('/', (req, res) => res.render('./admin/welcome'))
router.get('/register', (req, res) => res.render('./admin/register'))
router.get('/login', (req, res) => res.render('./admin/login'))
router.get('/dashboard', (req, res) => res.render('./admin/dashboard'))
router.get('/manage-admins', (req, res) => res.render('./admin/manage-admins'))

// Register form handling
router.route('/register').post(validateUser, register)

// Login form handling
router.post('/login', (req, res) => {
  console.log(req.body)
  res.send(req.body)
})

module.exports = router
