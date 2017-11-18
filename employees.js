module.exports = function(models) {

  function index(req, res, next) {
    models.find({}, function(err, employees) {
      if (err) {
        return next(err)
      } else {
        res.render('home', {})
      }
    })
  }

  function loginFunc(req, res, next) {
    models.find({}, function(err, employees) {
      if (err) {
        return next(err)
      } else {
        res.render('login', {})
      }
    })
  }

  function giveLoginAccess(req, res, next) {
    var name = req.body.name;
    var passkey = req.body.passkey;
    var confirmPasskey = req.body.confirmPasskey;

    var user = new models({
      username: name,
      password: passkey
    })

    if (passkey != confirmPasskey) {
      req.flash('error', 'Please enter the same password');
      res.redirect('/login');
    } else {
      user.save(function(err, allUsers) {
        if (err) {
          if (err.code === 11000) {
            req.flash('error', 'This user already existed!');
            res.redirect('/answering');
          }
      } else {
        console.log(allUsers);
        req.flash('success', 'Please select one of the answers below!');
        res.redirect('/answering')
       }
     })
    }

  }

  return {
    index,
    loginFunc,
    giveLoginAccess
  }
};
