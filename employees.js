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
    const answersObject = {};
    const name1 = req.body.name;
    const name = name1.substring(0, 1).toUpperCase() + name1.substring(1);
    const passkey = req.body.passkey;
    const confirmPasskey = req.body.confirmPasskey;
    const answer = req.body.answer

    var user = new models({
      username: name,
      password: passkey,
      answers: answer
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
          password: employee.password,
          answers: employee.answers
        });
      } else if (!employee) {
        models.create({
            username: name,
            password: passkey,
          }, function(err, employee) {
            if (err) {
              return next(err)
            }
          })
          .then(function(employee) {
            console.log(employee);
            req.flash("success", "Hello " + employee.username + " you have successfully registered your name!");
            res.render('login', {
              username: employee,
              password: passkey,
            })
          });
      };
    });
  }

  function employeesFeedbackStatus(req, res, next) {
    const answersObject = {};
    const name1 = req.body.name;
    const name = name1.substring(0, 1).toUpperCase() + name1.substring(1);
    const passkey = req.body.passkey;
    const confirmPasskey = req.body.confirmPasskey;
    const asnswer = req.body.answer

    var user = new models({
      username: name,
      password: passkey,
      answers: answer
    })


    if (!Array.isArray(asnswer)) {
      asnswer = [asnswer]
    }
    asnswer.forEach(function(singAnswer) {
      answersObject[singAnswer] = true
    });
    models.findOneAndUpdate({
      username: name,
      password: passkey,
      answers: answersObject
    }, function(err, reply) {
      if (err) {
        console.log(err);
      } else if (!reply) {
        models.giveLoginAccess.create({
            username: name,
            password: passkey,
            answers: answersObject
          }),

          req.flash("success", "Hello, " + user.username + " Your response has been saved.")
        res.render('answering', {
          username: name,
          password: passkey,
          answers: answersObject
        })
      };
    })
  }

  function countEmployees(employeesCounter) {
    if (employeesCounter === 6) {
      return 'Enough'
    } else if (employeesCounter > 26) {
      return 'Aything'
    } else {
      return 'Another thing'
    }
  };

  function adminAccess(req, res, next) {
    Yes = [];
    No = [];
    Null = [];
    models.find({}, function(err, reply) {
      if (err) {
        return next(err)
      } else {
        for (const x = 0; x < reply.length; x++) {
          const responsess = reply[x].answers;
          for (const oneAnswer in responsess) {
            if (oneAnswer === "Yes") {
              Yes.push(reply[x].username)
            } else if (oneAnswer === "No") {
              No.push(reply[x].username)
            } else if (oneAnswer === "Null") {
              Null.push(reply[x].username)
            }
          }
        }
      }
      res.render("admin", {
        posResponseNames: Yes,
        posResponseNamesCounter: Yes.length,

        negReponseNames: No,
        negReponseNamesCounter: No.length,

        nullResponseNames: Null,
        nullResponseNamesCounter: Null.length
      });
    });
  }

  return {
    loginFunc,
    giveLoginAccess,
    employeesFeedbackStatus,
    countEmployees,
    adminAccess
  }
}
