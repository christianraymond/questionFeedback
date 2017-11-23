module.exports = function(models) {

  function index(req, res, next) {
    models.find({}, function(err, employees) {
      if (err) {
        return next(err)
      } else {
        console.log('Hello world!');
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
    // const capitalize = req.body.name.substring(0, 1);
    // const toUpperCase = req.body.name.substring(0, 1).toUpperCase()
    // const name = req.body.name.replace(capitalize, toUpperCase);
    const name = req.body.name;
    var passkey = req.body.passkey;
    var confirmPasskey = req.body.confirmPasskey;
    var answer = req.body.answer

    var user = new models({
      username: name,
      password: passkey
    })

    if (passkey != confirmPasskey) {
      req.flash('error', 'Please enter the same password');
      res.render('login');
    }

    Model.findById = function findById(id, projection, options, callback) {
      if (typeof id === 'undefined') {
        id = null;
      }

      if (callback) {
        callback = this.$wrapCallback(callback);
      }

      return this.findOne({_id: id}, projection, options, callback);
    };

    models.findById({
      username: name
    }, function(err, employee) {
      if (err) {
        return next(err)
      } else if (employee) {
        req.flash('success', 'Hello, welcome back ' + user.username + "!")
        res.render('answering', {
          username: employee.user,
          answers: employee.answer
        });
      } else {
        models.create({
          username: name
        }, function(err, employee) {
          if (err) {
            return next(err)
          } else {
            req.flash('success', 'You have successfully added your name');
            res.render('answering', {
              username: name
            });
          }
        });
      };
    });
  }

  function employeesFeedbackStatus(req, res, next) {
      var answersObject = {};
      const capitalize = req.params.name.substring(0, 1);
      const toUpperCase = req.params.name.substring(0, 1).toUpperCase()
      const name = req.params.name.replace(capitalize, toUpperCase);
      var answer = req.body.answer;

      var user = new models({
        username: name,
        password: passkey
      })


      if (!Array.isArray(answer)) {
        answer = [answer]
      }
      answer.forEach(function(singAnswer) {
        answersObject[singAnswer] = true
      });
      models.findOneAndUpdate({
        username: name
      }, {
        answers: answersObject
      }, function(err, reply) {
        if (err) {
          console.log(err);
        } else if (!reply) {
          models.employeesFeedbackStatus.create({
            username: name,
            answers: answersObject
          });
        }
      });
      req.flash('success', "Hello, " + user.username + " Your response has been saved.")
      res.redirect('/answering/' + user);
    }

  return {
    index,
    loginFunc,
    giveLoginAccess,
    employeesFeedbackStatus
  }
}
