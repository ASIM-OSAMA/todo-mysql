const flash = require('connect-flash')

// Global variables
const globalVariables = (req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  //   res.locals.error = req.flash('error')
  next()
}

module.exports = { globalVariables }
