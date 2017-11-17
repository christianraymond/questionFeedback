const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const handlebars = require('express-handlebars');

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.use(bodyParser.urlencoded({
  extended: false
}))
app.get('/home', function(req, res){
  res.render('home');
})


app.get('/about', function(req, res){
  res.render('about');
})

app.get('/login', function (req, res) {
    res.render('login');
});
app.get('/answering', function (req, res) {
    res.render('answering');
});


app.use(express.static("public"));
app.set('port', process.env.PORT || 3000);
const port = 3000;
app.listen(port, function() {
  console.log("App Listening at http://localhost:" + port);
});
