// Controllers are the thing that directly responds to each HTTP Request
// that comes into your application, as such each web request will
// result in (if routed) a new instance of a Controller (Class).
const asyncHandler = require("express-async-handler");
const pool = require("../config/db");
// const { errorHandler } = require('../middleware/errorMiddleware')

// All the features logic will go here with separate controller files.

// get all tasks
const getTasks = asyncHandler(async (req, res) => {
  await pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      "SELECT * from todo WHERE owner_id=?",
      req.user.id,
      (err, allTasks) => {
        connection.release(); // return the connection to pool
        const tasksCount = allTasks.length;
        if (allTasks.length === 0) {
          req.flash("info_msg", "You Don't Have Tasks Yet!.");

          res.status(200).render("./todo/view-tasks", {
            title: "Manage Tasks",
            allTasks,
            tasksCount,
          });
        } else if (!err) {
          res.status(200).render("./todo/view-tasks", {
            title: "Manage Tasks",
            allTasks,
            tasksCount,
          });
        } else {
          console.log(err);
          req.flash("error_msg", `Task Not Found!.`);
          res.status(400);
        }

        // console.log('OK_1 👍')
      }
    );
  });
});

// Get todo
const getTask = asyncHandler(async (req, res) => {
  await pool.getConnection((err, connection) => {
    if (err) throw err;

    const ownerId = user.id;
    const taskId = req.params.id;

    connection.query(
      "SELECT * FROM todo WHERE owner_id=? AND task_id = ?",
      [ownerId, taskId],
      (err, allTasks) => {
        connection.release(); // return the connection to pool

        if (allTasks.length === 0) {
          req.flash("error_msg", `Task Not Found!.`);
          res.status(400).render("./error/404");
        } else if (!err) {
          res.status(200);
          res.render("./todo/view-tasks", {
            title: "Manage Tasks",
            allTasks,
          });
        } else {
          console.log("err");
          req.flash("error_msg", `Task Not Found!.`);
          res.status(400).render("./error/404");
        }

        // console.log('OK_2 👍')
      }
    );
  });
});

// // Search Bar: Admin account
// const searchAdmin = asyncHandler(async (req, res) => {
//   await pool.getConnection((err, connection) => {
//     if (err) throw err

//     // const ownerId = user.id
//     // const taskId = req.params.id
//     const toFind = req.body.search

//     connection.query(
//       'SELECT * FROM todo OR users WHERE task_id = ?',
//       [toFind],
//       (err, allTasks) => {
//         connection.release() // return the connection to pool
//         if (!err) {
//           res.status(200)
//           res.render('./todo/view-tasks', {
//             title: 'Manage Tasks',
//             allTasks
//           })
//           //   console.log(allTasks)
//           //   res.send({ allTasks: allTasks })
//           return allTasks
//         } else {
//           console.log('err')
//         }

//         // console.log('OK_2 👍')
//       }
//     )
//   })
// })

// // Search bar: Tasks

// const searchTask = asyncHandler(async (req, res) => {
//   await pool.getConnection((err, connection) => {
//     if (err) throw err

//     // const ownerId = user.id
//     // const taskId = req.params.id

//     connection.query(
//       'SELECT * FROM todo WHERE task_id = ?',
//       [req.params.id],
//       (err, allTasks) => {
//         connection.release() // return the connection to pool
//         if (!err) {
//           res.status(200)
//           res.render('./todo/view-tasks', {
//             title: 'Manage Tasks',
//             allTasks
//           })
//           //   console.log(allTasks)
//           //   res.send({ allTasks: allTasks })
//           return allTasks
//         } else {
//           console.log('err')
//         }

//         // console.log('OK_2 👍')
//       }
//     )
//   })
// })

// // Search bar End

// Add Todo
const addTask = asyncHandler(async (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;

    const id = user.id;
    const { taskTitle, taskSubtitle, taskTodo, done } = req.body;

    connection.query(
      "INSERT INTO todo SET owner_id=?,task_title=?, task_subtitle=?, task_todo=?, done=?",
      [id, taskTitle, taskSubtitle, taskTodo, done],
      (err, rows) => {
        connection.release(); // return the connection to pool
        if (!err) {
          //   console.log(`${req.body.taskTitle} has been added.`)
          req.flash("success_msg", `New Task Added.`);
          res.status(201).redirect("/todo/tasks");
        } else {
          console.log(err);
          req.flash("error_msg", `Failed to Add Task!`);
          res.status(400).redirect("/todo/tasks");
        }

        // console.log('ERROR_4')
      }
    );
  });
});

// ----------------------------------------------------------------------------------------------------- //

// Edit todo
const editTask = asyncHandler(async (req, res) => {
  await pool.getConnection((err, connection) => {
    if (err) throw err;

    const ownerId = user.id;
    const taskId = req.params.id;
    // const { taskTitle, taskSubtitle, taskTodo, done } = req.body

    connection.query(
      "SELECT * FROM todo WHERE owner_id=? AND task_id = ?",
      [ownerId, taskId],
      (err, allTasks) => {
        connection.release(); // return the connection to pool
        if (!err) {
          res.status(200);
          res.render("./todo/update-task", {
            title: "Edit Task",
            allTasks,
          });
          //   console.log(allTasks)
        } else {
          console.log(err);
          req.flash("error_msg", `Task Not Found!`);
          res.status(400).redirect("/todo/tasks");
        }

        // console.log('OK_2 👍')
      }
    );
  });
});

// Update todo
const updateTask = asyncHandler(async (req, res) => {
  await pool.getConnection((err, connection) => {
    if (err) throw err;

    const ownerId = user.id;
    const taskId = req.params.id;
    const { taskTitle, taskSubtitle, taskTodo, done } = req.body;
    connection.query(
      "UPDATE todo SET task_title=?, task_subtitle=?, task_todo=?, done=? WHERE owner_id=? AND task_id = ?",
      [taskTitle, taskSubtitle, taskTodo, done, ownerId, taskId],
      (err, rows) => {
        connection.release(); // return the connection to pool

        if (!err) {
          //   console.log(`${taskTitle} has been Updated.`)
          req.flash("success_msg", `Task Successfully Updated.`);
          res.status(200).redirect("/todo/tasks");
        } else {
          console.log(err);
          req.flash("error_msg", `Failed to Update Task!`);
          res.status(400);
        }
      }
    );
  });
});
// console.log(req.body)

// ----------------------------------------------------------------------------------- //

// Delete a Task
const deleteTask = asyncHandler(async (req, res) => {
  await pool.getConnection((err, connection) => {
    if (err) throw err;

    const ownerId = user.id;
    const taskId = req.params.id;

    connection.query(
      "DELETE FROM todo WHERE owner_id=? AND task_id = ?",
      [ownerId, taskId],
      (err, rows) => {
        connection.release(); // return the connection to pool
        if (!err) {
          // console.log(`${req.params.id} has been Deleted.`)
          req.flash("success_msg", `Task has been Deleted.`);
          res.status(200).redirect("/todo/tasks");
        } else {
          console.log(err);
          req.flash("error_msg", `Task Not Found!.`);
          res.status(400);
        }

        // console.log('ERROR_3')
      }
    );
  });
});

module.exports = {
  getTasks,
  getTask,
  // searchAdmin,
  // searchTask,
  addTask,
  editTask,
  updateTask,
  deleteTask,
};

// // const addProduct = asyncHandler(async (req, res) => {
// //   if (!req.body.text) {
// //     res.status(400);
// //     throw new Error('Please add text field');
// //   }
// //   const todo = await Todo.create({
// //     text: req.body.text,
// //   });
// //   res.status(200).json(todo);
// // })
