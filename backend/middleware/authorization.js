const authz = (req, res, next) => {
  role = req.user.role

  if (role === 'admin') {
    // // if user is admin
    user = res.locals.user

    return next()
  } else {
    // // if user is not admin
    console.log(req.user)

    res.status(404).render('./error/404')
    // next('route')
  }
  //   next()
}

module.exports = { authz }
