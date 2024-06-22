// Controllers are the thing that directly responds to each HTTP Request
// that comes into your application, as such each web request will
// result in (if routed) a new instance of a Controller (Class).
const asyncHandler = require("express-async-handler");
const todoService = require("../services/todo.service");

// All the features logic will go here with separate controller files.

const ownerId = 2;

// get all tasks
module.exports = {
  getTasks: asyncHandler(async (req, res) => {
    try {
      const result = await todoService.getTasksByOwnerId(ownerId);
      const tasks = result.rows;
      const tasksCount = tasks.length;

      if (tasksCount === 0) {
        res.status(200).json({ message: "You Don't Have Tasks Yet!." });
      } else {
        res.status(200).json({ tasksCount, tasks });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  }),

  // Get todo
  getTask: asyncHandler(async (req, res) => {
    // const ownerId = 2;
    const taskId = req.params.id;

    try {
      const result = await todoService.getTaskByOwnerIdAndTaskId(
        ownerId,
        taskId
      );
      const task = result.rows;
      const tasksCount = task.length;

      if (tasksCount === 0) {
        res.status(404).json("Task Not Found!.");
      } else {
        res.status(200).json(task);
      }
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  }),

  // Add Todo
  addTask: asyncHandler(async (req, res) => {
    // const id = user.id;
    const { taskTitle, taskSubtitle, taskTodo, done } = req.body;

    try {
      const newTask = await todoService.addTaskByOwnerId(
        ownerId,
        taskTitle,
        taskSubtitle,
        taskTodo,
        done
      );
      const newTaskRows = newTask.rows;
      res
        .status(201)
        .json({ message: "New Task Added.", newTask: newTaskRows });
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  }),

  // Update todo
  updateTask: asyncHandler(async (req, res) => {
    try {
      // const ownerId = user.id;
      const taskId = req.params.id;
      const { taskTitle, taskSubtitle, taskTodo, done } = req.body;

      const updatedTaskResult = await todoService.updateTaskByOwnerIdAndTaskId(
        ownerId,
        taskId,
        taskTitle,
        taskSubtitle,
        taskTodo,
        done
      );

      if (!updatedTaskResult) {
        return res.status(404).json({ message: "Task Does Not Exist." });
      }

      const updatedTask = updatedTaskResult.rows;

      res
        .status(200)
        .json({ message: "Task Successfully Updated.", updatedTask });
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  }),

  // Delete a Task
  deleteTask: asyncHandler(async (req, res) => {
    // const ownerId = user.id;
    const taskId = req.params.id;

    try {
      const deletedTaskResult = await todoService.deleteTaskByOwnerIdAndTaskId(
        ownerId,
        taskId
      );

      if (!deletedTaskResult) {
        return res.status(404).json({ message: "Task Does Not Exist." });
      }

      res.status(200).json({ message: "Task has been Deleted." });
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  }),
};
