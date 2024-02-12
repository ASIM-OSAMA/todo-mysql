const express = require('express')
const router = express.Router()
const { addAdmin } = require('../controllers/adminController')

router.get('/', (req, res) => res.render('./admin/welcome'))
router.get('/register', (req, res) => res.render('./admin/register'))
router.get('/login', (req, res) => res.render('./admin/login'))
router.get('/panel', (req, res) => res.render('./admin/dashboard'))

// Register form handling
router.route('/register').post(addAdmin)

// router.post('/register', (req, res) => {
//   //   console.log(req.body)
//   res.send(req.body)
// })

// Login form handling
router.post('/login', (req, res) => {
  console.log(req.body)
  res.send(req.body)
})

module.exports = router
