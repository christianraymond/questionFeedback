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
    const name1 = req.body.name;
    const name = name1.substring(0, 1).toUpperCase() + name1.substring(1);
    const passkey = req.body.passkey;
    const confirmPasskey = req.body.confirmPasskey;
    var answersObject = {};
    var allAnswers = req.body.answer;


    var user = new models({
      username: name,
      password: passkey,
      answers: allAnswers
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
        return res.send();
      } else if (employee) {
        console.log(employee);
        req.flash('success', 'Hello, Welcome back ' + employee.username + '!')
        res.render('answering', { 
          username: employee.username,
          password: passkey,
          answers: employee.answer
        })
      } else if (!employee) {
        models.create({
            username: name,
            password: passkey,
          }, function(err, employee) {
            if (err) {
              return next(err)
            }
          })
          .then(function(err, employee) {
            if (err) {
              return res.send();
            } else {
              req.flash("success", "Hello " + employee.username + " you have successfully registered your name!");
              res.render('login', {
                username: employee,
                password: passkey,
              })
            }
          });
      };
    });
  }

  function employeesFeedbackStatus(req, res, next) {
    var answersObject = {};
    const name1 = req.params.username;
    const name = name1.substring(0, 1).toUpperCase() + name1.substring(1);
    const passkey = req.body.passkey;
    const confirmPasskey = req.body.confirmPasskey;
    var allAnswers = req.body.answer

    var user = new models({
      username: name,
      password: passkey,
      answers: allAnswers
    });

    if (!Array.isArray(allAnswers)) {
      allAnswers = [allAnswers]
    }
    allAnswers.forEach(function(singAnswer) {
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
        res.redirect('/answering/' + username.name)
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
