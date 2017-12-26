module.exports = function(models) {

  function registeringUser(req, res, next) {
    models.find({}, function(err, employees) {
      if (err) {
        return next(err)
      } else {
        username: employees
      }
      res.render('register')
    })
  }

  function loginUser(req, res, next) {
    models.find({}, function(err, employees) {
      if (err) {
        return next(err)
      } else {
        username: employees
      }
      res.render('login')
    })
  }

  function giveLoginAccess(req, res, next) {
    const name1 = req.body.name;
    const name = name1.substring(0, 1).toUpperCase() + name1.substring(1);
    const passkey = req.body.passkey;
    const confirmPasskey = req.body.confirmPasskey;

    if (passkey != confirmPasskey) {
      req.flash('error', 'Please enter the same password');
      res.redirect('/register');
      return;
    } else if (name == 'Admin' && passkey == 'admin') {
      res.redirect('/admin')
      return;
    }
    //Create a Login POSTroute to find and create employeesNames
    models.findOne({
      username: name,
      password: passkey,
    }, function(err, employee) {
      if (err) {
        res.send(err)
      } else if (employee) {
        console.log(employee);
        req.flash('success', 'Hello, Welcome back ' + employee.username + '!')
        res.redirect('/answering/' + employee.username);
        return;

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
            req.flash("success", "Hello " + employee.username + " you have successfully registered your name!");
            res.redirect('/login')
          });
      };
    });
  }

  function renderFeedback(req, res, next) {
    const employeesName = req.params.username;
    res.render('answering', {
      username: employeesName
    });
  }

  function employeesFeedbackStatus(req, res, next) {
    const employeesName = req.params.username;
    var answersObject = {};
    var AllAnswers = req.body.answer;

    if (!Array.isArray(AllAnswers)) {
      AllAnswers = [AllAnswers]
    }
    AllAnswers.forEach(function(aResponse) {
      answersObject[aResponse] = true
    });
    //Allow user to return and edit the response if they need to
    models.findOneAndUpdate({
      username: employeesName
    }, {
      answersModel: answersObject
    }, function(err, reply) {
      if (err) {
        console.log(err);
      } else if (!reply) {
        models.create({
          username: employeesName,
          answersModel: answersObject
        });
      }
    });
    req.flash('success', "Your response has successfully been saved.")
    res.render('answering');
  }

  function colorResponses(countEmployees) {
    if (countEmployees === 1) {
      return 'bg-success'
    } else if (countEmployees > 0) {
      return 'bg-warning'
    } else {
      return 'big-danger'
    }
  }

  function adminAccess(req, res, next) {
    Yes = [];
    No = [];
    Null = [];
    models.find({}, function(err, reply) {
      if (err) {
        return next(err)
      } else {
        for (var i = 0; i < reply.length; i++) {
          var feedback = reply[i].answersModel;
          for (var response in feedback) {
            if (response == 'Yes') {
              Yes.push(reply[i].username);
            } else if (response == 'No') {
              No.push(reply[i].username);
            } else if (response == 'Null') {
              Null.push(reply[i].username)
            }
          }
        }
      }
      res.render("admin", {
        posResponseNames: Yes,
        yesCounter: Yes.length,
        yesStyle: colorResponses(Yes.length),

        negReponseNames: No,
        noCounter: No.length,
        noStyle: colorResponses(No.length),

        nullResponseNames: Null,
        nullCounter: Null.length,
        nullStyle: colorResponses(Null.length),
      });
    });
  }

  return {
    registeringUser,
    loginUser,
    giveLoginAccess,
    renderFeedback,
    employeesFeedbackStatus,
    colorResponses,
    adminAccess
  }
}
