const flash = require('connect-flash')

// Global variables
const globalVariables = (req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.info = req.flash('info')
  res.locals.info_msg = req.flash('info_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  // res.locals.user = {
  //   id: req.user.id,
  //   firstname: req.user.firstname,
  //   lastname: req.user.lastname,
  //   picture: req.user.picture,
  //   role: req.user.role
  // }
  next()
}

module.exports = { globalVariables }
