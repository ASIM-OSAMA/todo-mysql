// Logout  handling
const logoutCtrl = (req, res) => {
  req.logout(err => {
    if (err) {
      return next(err)
    }
    req.flash('success_msg', 'Successfully Logged-Out')
    res.redirect('/login') //Redirect to login page
  })
}

module.exports = { logoutCtrl }
