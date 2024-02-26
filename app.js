// const logger = require('morgan')
const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
// const hbsConfig = require('./backend/config/hbs')
const { routes } = require('./backend/routes/routes')
const flash = require('connect-flash')
const { globalVariables } = require('./backend/middleware/globalVariables')
const session = require('express-session')
const SQLiteStore = require('connect-sqlite3')(session)
const passport = require('passport')
require('./backend/auth/passport')(passport)
const { errorHandler } = require('./backend/middleware/errorMiddleware')

const app = express()

const port = process.env.PORT || 3000

// Configure Handlebars view engine

// const staticPath = path.join(__dirname, '/frontend/public')
const staticPath = __dirname + '/frontend/public'

// console.log(__dirname + '/frontend/public')

const hbsCreate = exphbs.create({
  defaultLayout: 'main',
  // layoutsDir: layoutPath,
  // partialsDir: partialsPath,
  extname: '.hbs'

  // helpers: {
  // section: function (name, options) {
  // if (!this._sections) this._sections = {}
  // this._sections[name] = options.fn(this)
  // return null
  // }
  // }
})

// Configure Handlebars view engine

app.engine('hbs', hbsCreate.engine)
app.set('view engine', 'hbs')
app.use(express.static(staticPath))

// -----------------------------------------------------------------

// Express body parser
app.use(express.urlencoded({ extended: true }))

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    store: new SQLiteStore({ db: 'sessions.db', dir: './backend/config' })
  })
)
app.use(passport.initialize())
app.use(passport.session())

// Get Authenticated User Data Middleware
// app.use(getUserData)

// Connect flash
app.use(flash())

// Global variables middleware
app.use(globalVariables)

// Use Routes
app.use(routes)

// Make sure to define error-handling middleware in the last, after other app.use().
app.use(errorHandler)

// Listen on environment port or 5000
app.listen(port, () => {
  console.log(`App is running on port ${port}, press Ctrl + C to Terminate.`)
})
