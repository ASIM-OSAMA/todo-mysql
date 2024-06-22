module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      // Get user FIRSTNAME
      // res.locals.user = req.user
      res.locals.user = {
        id: req.user.id,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        picture: req.user.picture,
        role: req.user.role
      }
      user = res.locals.user

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
