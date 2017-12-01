const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const handlebars = require('express-handlebars');
const flash = require('express-flash');
const session = require('express-session');


app.use(session({
  secret: 'keyboard cat',
  cookie: {
    maxAge: 6000 * 30
  },
  resave: true,
  saveUninitialized: true
}));

app.use(flash());

const mongoose = require('mongoose');
const Models = require('./models');
const EmployeesRoute = require('./employees.js');
const employeesroute = EmployeesRoute(Models);

app.engine('handlebars', handlebars({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}))

app.get('/', function(req, res) {
  res.render('home')
})
app.get('/about', function(req, res) {
  res.render('about');
})

app.get('/admin', function(req, res) {
  res.render('admin');
})

app.get('/login', employeesroute.loginFunc);
app.post('/login', employeesroute.giveLoginAccess);
app.get('/answering/:username', employeesroute.employeesFeedbackStatus);
app.post('/answering/:username', employeesroute.employeesFeedbackStatus);
app.get('/admin', employeesroute.adminAccess);

app.use(express.static("public"));
app.set('port', process.env.PORT || 3000);
const port = 3000;
app.listen(port, function() {
  console.log("App Listening at http://localhost:" + port);
});
