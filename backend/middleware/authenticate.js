module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      // Get user FIRSTNAME
      // res.locals.user = req.user

      return next()
    }
    // req.flash('error_msg', 'Please log in to view that resource')
    // res.redirect('/login')
    res.status(404).render('./error/404')
  },
  forwardAuthenticated: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next()
    }
    res.redirect('/') //Redirect to welcome page
  }
}
