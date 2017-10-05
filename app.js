const express = require('express')
const app = express();
app.set('view engine', 'ejs');
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
let index = require('./routes/index.js')
let teachers = require('./routes/teachers.js')
let subjects = require('./routes/subjects.js')
let students = require('./routes/students.js')
app.use('/',index)
app.use('/teachers',teachers)
app.use('/subjects',subjects)
app.use('/students',students)
app.listen(3000, function() {
console.log('express app now listeng 3000');
});
