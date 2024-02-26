const authz = (req, res, next) => {
  role = req.user.user_role

  if (role === 'admin') {
    // // if user is admin
    // console.log(`Test: yes`)
    return next()
  } else {
    // // if user is not admin
    // console.log('Not Admin')

    res.status(404).render('./error/404')
    // next('route')
  }
  //   next()
}

module.exports = { authz }
