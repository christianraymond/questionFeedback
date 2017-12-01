// module.exports = function(models) {
//
//   function loginFunc(req, res, next) {
//     models.find({}, function(err, employees) {
//       if (err) {
//         return next(err)
//       } else {
//         res.render('login', {
//           person: employees
//         });
//       }
//     });
//   }
//
//   function giveLoginAccess(req, res, next) {
//     const answersObject = {};
//     const name1 = req.body.name;
//     const userName = name1.substring(0, 1).toUpperCase() + name1.substring(1);
//     const passkey = req.body.passkey;
//     const confirmPasskey = req.body.confirmPasskey;
//     const allAnswers = req.body.answer
//
//     var user = new models({
//       username: userName,
//       password: passkey,
//       answers: allAnswers
//     })
//
//     if (passkey != confirmPasskey) {
//       req.flash('error', 'Please enter the same password');
//       res.redirect('/login');
//     }
//
//     models.findOne({
//       username: userName,
//       password: passkey
//     }, function(err, employee) {
//       if (err) {
//         return next(err);
//       } else if (employee) {
//         req.flash('success', 'Hello, Welcome back ' + employee.username + '!')
//         res.redirect('/answering/' + employee);
//       } else if (!employee) {
//         models.create({
//           username: employee,
//           password: passkey
//         }, function(err, user) {
//           if (err) {
//             return next(err)
//           } else {
//             req.flash("success", "Hello " + employee.username + " you have successfully registered your name!");
//             res.render('login', {
//               username: employee,
//               password: passkey,
//             });
//           }
//         });
//       };
//     });
//   }
//
//   function employeesFeedbackStatus(req, res, next) {
//     var answersObject = {};
//
//     const capitalize = req.params.username.substring(0, 1);
//     const toUpperCase = req.params.username.substring(0, 1).toUpperCase()
//     const userName = req.params.username.replace(capitalize, toUpperCase);
//
//     const passkey = req.body.passkey;
//     const confirmPasskey = req.body.confirmPasskey;
//     var allAnswers = req.body.answer;
//     console.log(allAnswers);
//
//     var user = new models({
//       username: userName,
//       password: passkey,
//       answers: allAnswers
//     })
//
//     if (!Array.isArray(allAnswers)) {
//       allAnswers = [allAnswers]
//     }
//     allAnswers.forEach(function(singAnswer) {
//       answersObject[singAnswer] = true
//     });
//
//     models.findOneAndUpdate({
//       username: userName
//     }, {
//       password: passkey
//     }, {
//       answers: answersObject
//     }, function(err, reply) {
//       if (err) {
//         console.log(err);
//       } else if (!reply) {
//         models.giveLoginAccess.create({
//             username: userName,
//             password: passkey,
//             answers: answersObject
//           }),
//           req.flash("success", "Hello, " + userName.username + " Your response has been saved.");
//         res.redirect('/answering/' + userName.userName)
//       }
//     })
//   }
//
//   function countEmployees(employeesCounter) {
//     if (employeesCounter === 3) {
//       return 'bg-success'
//     } else if (employeesCounter > 3) {
//       return 'bg-warning'
//     } else {
//       return 'big-danger'
//     }
//   }
//
//   function adminAccess(req, res, next) {
//     Yes = [];
//     No = [];
//     Null = [];
//     models.find({}, function(err, reply) {
//       if (err) {
//         return next(err)
//       } else {
//         for (const x = 0; x < reply.length; x++) {
//           const responsess = reply[x].answers;
//           for (const oneAnswer in responsess) {
//             if (oneAnswer === "Yes") {
//               Yes.push(reply[x].username)
//             } else if (oneAnswer === "No") {
//               No.push(reply[x].username)
//             } else if (oneAnswer === "Null") {
//               Null.push(reply[x].username)
//             }
//           }
//         }
//       }
//     })
//     res.render("admin", {
//       posResponseNames: Yes,
//       posResponseNamesCounter: Yes.length,
//
//       negReponseNames: No,
//       negReponseNamesCounter: No.length,
//
//       nullResponseNames: Null,
//       nullResponseNamesCounter: Null.length
//     });
//   };
//
//
//   return {
//     loginFunc,
//     giveLoginAccess,
//     employeesFeedbackStatus,
//     countEmployees,
//     adminAccess
//   }
// }
