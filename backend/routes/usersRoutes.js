const express = require('express')
const router = express.Router()
const { getUsers } = require('../controllers/userController')

router.get('/manage-users', getUsers)
// router.get('/:id', getProduct)
// router.post('/add', addProduct)
// router.put('/update/:id', updateProduct)
// router.get('/delete/:id', deleteProduct)

// // router.delete('/delete/:id', deleteProduct)

// // router.route('/').get(getProducts).post(addProduct)
// // router.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct)

module.exports = router
