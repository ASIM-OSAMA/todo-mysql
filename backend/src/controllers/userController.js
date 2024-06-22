// Controllers are the thing that directly responds to each HTTP Request
// that comes into your application, as such each web request will
// result in (if routed) a new instance of a Controller (Class).
const asyncHandler = require("express-async-handler");
const pool = require("../config/db");
// const { errorHandler } = require('../middleware/errorMiddleware')

// All the features logic will go here with separate controller files.
const getUsers = asyncHandler(async (req, res) => {
  await pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("SELECT * from users", (err, allUsers) => {
      connection.release(); // return the connection to pool

      if (!err) {
        const usersCount = allUsers.length;
        res.status(200).render("./admin/manage-users", {
          title: "Manage Users",
          allUsers,
          usersCount,
        });
        // res.status(200).json({ allUsers })
        // console.log('Get all users OK_1 👍')
      } else {
        console.log(err);
      }

      // console.log('OK_1 👍')
    });
  });
});

// // Get soft_drink
// const getProduct = asyncHandler(async (req, res) => {
//   await pool.getConnection((err, connection) => {
//     if (err) throw err

//     connection.query(
//       'SELECT * FROM soft_drinks WHERE id = ?',
//       [req.params.id],
//       (err, rows) => {
//         connection.release() // return the connection to pool
//         if (!err) {
//           res.status(200).render('home', { rows })
//           console.log(rows)
//         } else {
//           console.log('err')
//         }

//         // console.log('OK_2 👍')
//       }
//     )
//   })
// })

// // Add soft_drink
// const addProduct = asyncHandler(async (req, res) => {
//   pool.getConnection((err, connection) => {
//     if (err) throw err

//     const params = req.body

//     connection.query('INSERT INTO soft_drinks SET ?', params, (err, rows) => {
//       connection.release() // return the connection to pool
//       if (!err) {
//         res.send(`${req.body.name} has been added.`)
//         console.log(`${req.body.name} has been added.`)
//       } else {
//         console.log(err)
//       }

//       // console.log('ERROR_4')
//     })
//   })
// })

// // Update soft drink
// const updateProduct = asyncHandler(async (req, res) => {
//   await pool.getConnection((err, connection) => {
//     if (err) throw err
//     const id = req.params.id
//     const { name, tagline, description, image_name } = req.body
//     connection.query(
//       'UPDATE soft_drinks SET name = ?, tagline = ?, description = ?, image_name = ? WHERE id = ?',
//       [name, tagline, description, image_name, id],
//       (err, rows) => {
//         connection.release() // return the connection to pool

//         if (!err) {
//           res.status(200).redirect('/')
//           console.log(`${name} has been Updated.`)
//         } else {
//           console.log(err)
//         }
//       }
//     )
//     // console.log(req.body)
//   })
// })

// // Delete a soft_drink
// const deleteProduct = asyncHandler(async (req, res) => {
//   await pool.getConnection((err, connection) => {
//     if (err) throw err

//     connection.query(
//       'DELETE FROM soft_drinks WHERE id = ?',
//       [req.params.id],
//       (err, rows) => {
//         connection.release() // return the connection to pool
//         if (!err) {
//           res.status(200).redirect('/')
//           console.log(`${req.params.id} has been Deleted.`)
//         } else {
//           console.log(err)
//         }

//         // console.log('ERROR_3')
//       }
//     )
//   })
// })

module.exports = {
  getUsers,
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
