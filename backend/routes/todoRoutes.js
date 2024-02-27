const express = require('express')
const router = express.Router()

router
  .route('/tasks')
  .get((req, res) =>
    res.render('./todo/view-tasks', {
      id: req.user.id,
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      picture: req.user.picture
    })
  )
  .post((req, res) => {
    res.send('Add Task')
  })

router
  .route('/tasks/:id')
  .get((req, res) => {
    res.send('Get Task by id')
  })
  .put((req, res) => {
    res.send('View all tasks or Search and Update Task')
  })
  .delete((req, res) => {
    res.send('View all tasks or Search and delete Task')
  })
// router.route('/tasks').get((req, res) => res.render('./todo/view-tasks')).post().put().delete()

module.exports = router
// C:\xampp\htdocs\web-projects\02_0-todo-mysql\root\views\todo\view-tasks.hbs
