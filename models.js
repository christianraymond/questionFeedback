const mongoose = require('mongoose');
const mongoURL = process.env.MONGO_DB_URL || 'mongodb://localhost/employeesFeedback';

mongoose.connect(mongoURL, {
  useMongoClient: true
}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Database ready to use used...!');
  }
})

const EmployeesSchema = mongoose.Schema;
const employeesModel = new EmployeesSchema({
  username: {
    type: String,
    unique: true,
    sparse: true
  },

  password: String,
  answers: {}

});
//Avoiding duplicates in employee's Schema
employeesModel.index({
  username: 1
}, {
  unique: true
});

const EmployeesName = mongoose.model('EmployeesName', employeesModel);
module.exports = EmployeesName;
