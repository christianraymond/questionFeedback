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
    const capitalize = req.body.name.substring(0, 1);
    const toUpperCase = req.body.name.substring(0, 1).toUpperCase()
    const name = req.body.name.replace(capitalize, toUpperCase);
    // var name = req.body.name
    var passkey = req.body.passkey;
    var confirmPasskey = req.body.confirmPasskey;

    var user = new models({
      username: name,
      password: passkey
    })

    if (passkey != confirmPasskey) {
      req.flash('error', 'Please enter the same password');
      res.render('login');
    } else {
      user.save(function(err, allUsers) {
        if (err) {
          if (err.code === 11000) {
            req.flash('success', 'Welcome back ' + name + '!');
            res.render('answering')
          }
        }
        // if (name == 'Admin' && passkey == 'admin') {
        //   redirect('/admin')
        else {
          console.log(allUsers);
          req.flash('success', 'Hello, ' + name + ' Please select one of the answers below!');
          res.render('answering')
        }
      })
    }
  }

  function employeesFeedbackStatus(req, res, next) {
    const capitalize = req.params.username.substring(0, 1);
    const toUpperCase = req.params.username.substring(0, 1).toUpperCase()
    const name = req.params.username.replace(capitalize, toUpperCase);
    var answerResponse = req.body.answer;

    models.findOne({
      username: name
    }, function(err, user) {
      if (err) {
        console.log(err);
      } else {
        console.log("*********");
        console.log(user);
        user.answers = answerResponse;
        user.save({}, function(err, updatedUser) {
          if (err) {
            console.log(err);
          } else {
            console.log(updatedUser);
            console.log("********");
            req.flash('success', 'Your responsive will be saved');
            res.redirect('/answering/' + updatedUser.username)
          }
        })
      }
    })

  };

  return {
    index,
    loginFunc,
    giveLoginAccess,
    employeesFeedbackStatus
  }
}
