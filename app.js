const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const home = require('./routers/home.js');
const teachers = require('./routers/teachers.js');
const subjects = require('./routers/subjects.js');
const students = require('./routers/students.js');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.set('view engine','ejs');

app.use('/', home);
app.use('/teachers', teachers);
app.use('/subjects', subjects);
app.use('/students', students);

app.listen(3000);
