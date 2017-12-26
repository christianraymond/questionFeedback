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

app.get('/register', employeesroute.registeringUser);
app.post('/register', employeesroute.giveLoginAccess);

app.get('/login', employeesroute.loginUser);
app.post('/login', employeesroute.giveLoginAccess);

app.get('/answering/:username', employeesroute.renderFeedback);
app.post('/answering/:username', employeesroute.employeesFeedbackStatus);

app.get('/admin', employeesroute.adminAccess);

app.use(express.static("public"));
app.listen(process.env.PORT || 5000);
