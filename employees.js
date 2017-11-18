module.exports = function(models) {

  function index(req, res, next) {
    models.find({}, function(err, employees) {
      if (err) {
        return next(err)
      } else {
        res.render('home', {
          // user: employees,
        })
      }
    })
  }

  return {
    index,
  }
};
