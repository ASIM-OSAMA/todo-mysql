// import express

const express = require('express')
// const exphbs = require('express-handlebars').engine
// const bodyParser = require('body-parser')
// const mongoose = require('mongoose')
// const router = require('./backend/routes/routes')
// const todoData = require('./data.js')
app = express()
// app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.port || 5000

// // Send the contents of the .env file to the process.env object
// require('dotenv').config()

// // mongoose
// //   .connect(process.env.MONGO_URI)
// //   .then(() => console.log('Connected!'))
// //   .catch(err => console.log(err))

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

// app.use('/todos', router)

// app.get('/todos', (req, res) => res.render('index', { todoData }))
app.get('/todos', (req, res) => res.json('OK'))

app.listen(port, () => {
  console.log(`App is running on port ${port}, press Ctrl+C to Terminate.`)
})
