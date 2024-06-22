const express = require("express");
const router = express.Router();
const {
  getTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
} = require("../controllers/todoController");

router.route("/tasks").get(getTasks).post(addTask);

router.get("/tasks/:id", getTask, (req, res) => {
  res.render("./todo/view-tasks", {
    title: "Manage Task",
    allTasks,
  });
});

router.put("/tasks/:id", updateTask);

router.delete("/tasks/:id", deleteTask);

module.exports = router;
