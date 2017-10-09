const express = require('express');
const session = require('express-session');
const router = express.Router();
const model = require('../models');
const checkRole = require('../helpers/checkRole.js');

router.use(function(req, res, next){
  if(checkRole('teachers', req.session.role)){
    next()
  }else{
    res.redirect('/');
  }
})

router.get('/', function(req, res) {
  var message = "";
  if(req.query.message){
    message+= req.query.message
  }
  model.Teacher.findAll({order: ['first_name']}).then((rows) => {
    var arr_prom = [];
    rows.forEach((row) => {
      arr_prom.push(row.getSubject());
    })
    Promise.all(arr_prom).then((result) => {
      rows.forEach((row, index) => {
        row['subject'] = result[index];
      })
      res.render('teacher', {
        dataRows: rows, message:message, pageTitle:'Teachers List', role:req.session.role
      })
    })
  })
  // res.render('teacher', {dataRows:rows});
})

router.get('/edit/:id', function(req, res) {
  Promise.all([
    model.Teacher.findById(req.param('id')),
    model.Subject.findAll()
  ]).then((result) => {
    res.render('teacher_edit', {
      dataRows: result[0],
      subjectRows: result[1],
      pageTitle:'Edit Teacher '+result[0].fullname(), role:req.session.role
    })
  })
})

router.post('/edit/:id', function(req, res) {
  var data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    id: req.param('id'),
    SubjectId: req.body.SubjectId
  }
  model.Teacher.update(data, {
    where: {
      id: req.param('id')
    }
  }).then((data) => {
    res.redirect('/teachers?message=success')
  }).catch((err) => {
    res.redirect('/teachers?message=' + err)
  })
})

router.get('/add', function(req, res) {
  model.Subject.findAll().then((rows) => {
    res.render('teacher_add', {
      subjectRows: rows,
      pageTitle:'Add new Teacher', role:req.session.role
    });
  })
})

router.post('/add', function(req, res) {
  model.Teacher.create(req.body).then((data) => {
    res.redirect('/teachers?message=success')
  }).catch((err) => {
    res.redirect('/teachers?message=' + err)
  })
})

router.get('/delete/:id', function(req, res) {
  model.Teacher.destroy({
    where: {
      id: req.param('id')
    }
  }).then((data)=>{
    res.redirect('/teachers?message=success')
  }).catch((err)=>{
    res.redirect('/teachers?message='+err)
  })
})

module.exports = router;
