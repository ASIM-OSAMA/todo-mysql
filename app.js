const express = require('express')
const pool = require('./backend/config/db')
const exphbs = require('express-handlebars').engine
// const bodyParser = require('body-parser')
// const mongoose = require('mongoose')
const todo_route = require('./backend/routes/todoRoute')
const users_route = require('./backend/routes/usersRoute')
const { errorHandler } = require('./backend/middleware/errorMiddleware')

const app = express()

const port = process.env.port || 5000

// configure Handlebars view engine
app.engine(
  'hbs',
  exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
    // helpers: {
    //   section: function (name, options) {
    //     if (!this._sections) this._sections = {}
    //     this._sections[name] = options.fn(this)
    //     return null
    //   }
    // }
  })
)
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/frontend/public'))
// console.log(__dirname + '/frontend/public')

app.use('/users', users_route)
// app.use('/todos', router)

app.use(errorHandler)
// Make sure to define error-handling middleware in the last, after other app.use().

// Listen on environment port or 5000
app.listen(port, () => {
  console.log(`App is running on port ${port}, press Ctrl + C to Terminate.`)
})
