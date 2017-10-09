const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

const home = require('./routers/home.js');
const login = require('./routers/login.js');
const logout = require('./routers/logout.js');
const teachers = require('./routers/teachers.js');
const users = require('./routers/users.js');
const subjects = require('./routers/subjects.js');
const students = require('./routers/students.js');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.set('view engine','ejs');

app.use(session({
  secret: 'school app',
  resave: false,
  saveUninitialized: true
}))

app.use('/login', login);
app.use('/logout', logout);
app.use('/', home);
app.use('/users', users);
app.use('/teachers', teachers);
app.use('/subjects', subjects);
app.use('/students', students);

app.listen(process.env.PORT || '3000')
