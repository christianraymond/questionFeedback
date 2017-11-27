module.exports = function(models) {

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
    const answersObject = {}
    const name1 = req.body.name;
    const name = name1.substring(0, 1).toUpperCase() + name1.substring(1);
    const passkey = req.body.passkey;
    const confirmPasskey = req.body.confirmPasskey;
    const asnswer = req.body.answer


    var user = new models({
      username: name,
      password: passkey,
      answers: {}
    })

    if (passkey != confirmPasskey) {
      req.flash('error', 'Please enter the same password');
      res.redirect('/login');
    }

    models.findOne({
      username: name,
      password: passkey
    }, function(err, employee) {
      if (err) {
        return next(err)
      } else if (employee) {
        req.flash('success', 'Hello, Welcome back ' + employee.username + '!')
        res.render('answering', {
          username: employee.username,
          password: passkey.password,
        });
      } else if (!employee) {
        models.create({
            username: name,
            password: passkey
          }, function(err, employee) {
            if (err) {
              return next(err)
            }
          })
          .then(function(employee) {
            console.log(employee);
            req.flash("success", "Hello " + employee.username +" you have successfully registered your name!");
            res.render('login', {
              username: employee,
              password: passkey
            })
          });
      };
    });
  }

  function employeesFeedbackStatus(req, res, next) {
    const answersObject = {}
    const name1 = req.body.name;
    const name = name1.substring(0, 1).toUpperCase() + name1.substring(1);
    const passkey = req.body.passkey;
    const confirmPasskey = req.body.confirmPasskey;
    const asnswer = req.body.answer

    var user = new models({
      username: name,
      password: passkey,
      answers: answersObject
    })


    if (!Array.isArray(answer)) {
      answer = [answer]
    }
    answer.forEach(function(singAnswer) {
      answersObject[singAnswer] = true
    });
    models.findOneAndUpdate({
      username: name
    },
      {
        password: passkey
      },
    {
      answers: answersObject
    }, function(err, reply) {
      if (err) {
        console.log(err);
      } else if (!reply) {
        models.create({
          username: name,
        },
         {
          answers: answersObject
        }, function(err, response) {
          if (err) {
            return next(err)
          } else if (response) {
            req.flash("success", "Hello, " + user.username + " Your response has been saved.")
            res.render('answering', {
              username: name,
              answers: answersObject

            })
          }
        });
      }
    });
  }

  return {
    loginFunc,
    giveLoginAccess,
    employeesFeedbackStatus
  }
}
