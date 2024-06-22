// service functions are responsible for interacting with the database.

const db = require("../config/db");
const asyncHandler = require("express-async-handler");

module.exports = {
  // Retrieves tasks by owner ID
  getTasksByOwnerId: asyncHandler(async (ownerId) => {
    try {
      return await db.pool.query("SELECT * FROM todo WHERE owner_id = $1", [
        ownerId,
      ]);
    } catch (error) {
      console.error(error);
    }
  }),

  // Retrieves a task by owner ID and task ID
  getTaskByOwnerIdAndTaskId: asyncHandler(async (ownerId, taskId) => {
    try {
      return await db.pool.query(
        "SELECT * FROM todo WHERE owner_id = $1 AND task_id = $2",
        [ownerId, taskId]
      );
    } catch (error) {
      console.error(error);
    }
  }),

  // Adds a task for a specific owner
  addTaskByOwnerId: asyncHandler(
    async (ownerId, taskTitle, taskSubtitle, taskTodo, done) => {
      try {
        return await db.pool.query(
          "INSERT INTO todo (owner_id, task_title, task_subtitle, task_todo, done) VALUES ($1, $2, $3, $4, $5) RETURNING *",
          [ownerId, taskTitle, taskSubtitle, taskTodo, done]
        );
      } catch (error) {
        console.error(error);
      }
    }
  ),

  // Updates a task by owner ID and task ID
  updateTaskByOwnerIdAndTaskId: asyncHandler(
    async (ownerId, taskId, taskTitle, taskSubtitle, taskTodo, done) => {
      try {
        const taskExist = await module.exports.getTaskByOwnerIdAndTaskId(
          ownerId,
          taskId
        );

        const taskExistLength = taskExist.rows.length;

        if (taskExistLength === 0) {
          return;
        }

        return await db.pool.query(
          "UPDATE todo SET task_title=$3, task_subtitle=$4, task_todo=$5, done=$6 WHERE owner_id=$1 AND task_id = $2 RETURNING *",
          [ownerId, taskId, taskTitle, taskSubtitle, taskTodo, done]
        );
      } catch (error) {
        console.error(error);
      }
    }
  ),

  // Deletes a task by owner ID and task ID
  deleteTaskByOwnerIdAndTaskId: asyncHandler(async (ownerId, taskId) => {
    try {
      const taskExist = await module.exports.getTaskByOwnerIdAndTaskId(
        ownerId,
        taskId
      );

      const taskExistLength = taskExist.rows.length;

      if (taskExistLength === 0) {
        return;
      }

      return await db.pool.query(
        "DELETE FROM todo WHERE owner_id=$1 AND task_id = $2",
        [ownerId, taskId]
      );
    } catch (error) {
      console.error(error);
    }
  }),
};
