const express = require("express");
const logger = require("./src/logger/logger.js");
const exphbs = require("express-handlebars");
const { routes } = require("./src/routes/routes.js");
const flash = require("connect-flash");
const { globalVariables } = require("./src/middleware/globalVariables.js");
const session = require("express-session");
// const SQLiteStore = require("connect-sqlite3")(session);
const passport = require("passport");
require("./src/auth/passport.js")(passport);
const cors = require("cors");
const helmet = require("helmet");
const { errorHandler } = require("./src/middleware/errorMiddleware.js");

// const path = require("path");
// const hbsConfig = require('./backend/config/hbs')

const app = express();

const port = process.env.SERVER_PORT || 3000;

app.use(helmet());
app.use(cors());

// Configure Handlebars view engine

// const staticPath = path.join(__dirname, '/frontend/public')
const staticPath = __dirname + "/frontend/public";

// console.log(__dirname + '/frontend/public')

const hbsCreate = exphbs.create({
  defaultLayout: "main",
  // layoutsDir: layoutPath,
  // partialsDir: partialsPath,
  extname: ".hbs",

  helpers: {
    // section: function (name, options) {
    // if (!this._sections) this._sections = {}
    // this._sections[name] = options.fn(this)
    // return null
    // }

    ifAdmin: (role, options) => {
      if (role === "admin") {
        return options.fn(this);
      } else {
        // Handlebars provides the block for the else fragment as options.inverse (hbs docs)
        return options.inverse(this);
      }
    },
  },
});

// Configure Handlebars view engine

app.engine("hbs", hbsCreate.engine);
app.set("view engine", "hbs");
app.use(express.static(staticPath));

// -----------------------------------------------------------------

// Parse incoming request bodies in a middleware before your handlers, available under req.body property
// Express body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: "ziz ez mai seshon sekrit",
    resave: true,
    saveUninitialized: true,
    // store: new SQLiteStore({ db: "sessions.db", dir: "./backend/config" }),
  })
);
// app.use(passport.initialize());
// app.use(passport.session());

// Get Authenticated User Data Middleware
// app.use(getUserData)

// Connect flash
app.use(flash());

// Global variables middleware
app.use(globalVariables);

// Use Routes
app.use(routes);

// Make sure to define error-handling middleware in the last, after other app.use().
app.use(errorHandler);

// Listen on environment port or 5000
app.listen(port, () => {
  logger.info(`App is running on port ${port}.`, { service: "Application" });
});
