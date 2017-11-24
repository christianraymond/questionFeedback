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
    models.findOne({username: name} , function(err, employee) {
      // console.log(employee);
      if (typeof employee._id === 'undefined') {
        console.log(employee._id);
        employee._id = null;
      }
      else if(employee) {
        // employee = this.$wrapCallback(employee);
        console.log(employee + " success");
        req.flash('success', 'Welcome')
        res.redirect('/answering/' + employee.username)
      } else if (true) {
        return this.findOne
        _id: id,
          employee
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
    const name = req.params.username;
    // const toUpperCase = req.params.name.substring(0, 1).toUpperCase()
    const newName = name.substring(0,1).toUpperCase() + name.substring(1);

    // const name = req.params.name.replace(capitalize, toUpperCase);
    var answer = req.body.answer;

    var user = new models({
      username: newName,
      password: passkey
    })


    if (!Array.isArray(answer)) {
      answer = [answer]
    }
    answer.forEach(function(singAnswer) {
      answersObject[singAnswer] = true
    });
    models.findOneAndUpdate({
      username: newName
    }, {
      answers: answersObject
    }, function(err, reply) {
      if (err) {
        console.log(err);
      } else if (!reply) {
        models.employeesFeedbackStatus.create({
          username: newName,
          answers: answersObject
        });
      }
    });
    req.flash('success', "Hello, " + user.username + " Your response has been saved.")
    res.render('answering',{
      username: newName,
      answers: answersObject
    });
  }

  return {
    index,
    loginFunc,
    giveLoginAccess,
    employeesFeedbackStatus
  }
}
