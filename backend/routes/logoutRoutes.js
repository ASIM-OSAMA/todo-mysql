const express = require('express')
const router = express.Router()
const { logoutCtrl } = require('../controllers/logoutcontroller')

router.get('/logout', logoutCtrl)

module.exports = router
