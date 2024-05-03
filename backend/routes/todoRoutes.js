const express = require('express')
const router = express.Router()
const {
  getTasks,
  getTask,
  addTask,
  editTask,
  updateTask,
  deleteTask
} = require('../controllers/todoController')

router.route('/tasks').get(getTasks).post(addTask)

router.get('/tasks/:id', getTask, (req, res) => {
  res.render('./todo/view-tasks', {
    title: 'Manage Task',
    allTasks
  })
})
router.get('/tasks/update/:id', editTask)

router.post('/tasks/update/:id', updateTask)

router.get('/tasks/delete/:id', deleteTask)

module.exports = router
