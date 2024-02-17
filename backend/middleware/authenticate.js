module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      // Get user FIRSTNAME
      res.locals.user = req.user
      return next()
    }
    req.flash('error_msg', 'Please log in to view that resource')
    res.redirect('/admin/login')
  },
  forwardAuthenticated: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next()
    }
    res.redirect('/admin/login') //Redirect to welcome page
  }
}
