const express = require('express')
const pool = require('./backend/config/db')
// const exphbs = require('express-handlebars').engine
// const bodyParser = require('body-parser')
// const mongoose = require('mongoose')
const todo_route = require('./backend/routes/todoRoute')
const users_route = require('./backend/routes/usersRoute')
const { errorHandler } = require('./backend/middleware/errorMiddleware')

// const todoData = require('./data.js')
const app = express()
// app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.port || 5000

// // Send the contents of the .env file to the process.env object
// require('dotenv').config()

// // configure Handlebars view engine
// app.engine(
//   'handlebars',
//   exphbs({
//     defaultLayout: 'main'
//     // helpers: {
//     //   section: function (name, options) {
//     //     if (!this._sections) this._sections = {}
//     //     this._sections[name] = options.fn(this)
//     //     return null
//     //   }
//     // }
//   })
// )
// app.set('view engine', 'handlebars')

// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
// // app.use(bodyParser.urlencoded({ extended: true }))

app.use(users_route)
// app.use('/todos', router)

// app.get('/todos', (req, res) => res.render('index', { todoData }))
// app.get('/todos', (req, res) => res.json('OK'))

app.use(errorHandler)
// Make sure to define error-handling middleware in the last, after other app.use().

// Listen on environment port or 5000
app.listen(port, () => {
  console.log(`App is running on port ${port}, press Ctrl + C to Terminate.`)
})

// // Parsing middleware
// // Parse application/x-www-form-urlencoded
// // app.use(bodyParser.urlencoded({ extended: false })); // Remove
// app.use(express.urlencoded({ extended: true })) // New
// // Parse application/json
// // app.use(bodyParser.json()); // Remove
// app.use(express.json()) // New

// app.get('/panel/login', (req, res) => res.json('Login page.'))
// app.get('/panel/signup', (req, res) => res.json('Sign-up page.'))
// app.use(router)
