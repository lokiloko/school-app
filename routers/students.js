const express = require('express');
const router = express.Router();
const model = require('../models');

router.get('/', function(req, res){
  model.Student.findAll({order:['first_name']}).then((data)=>{
    var message = "";
    if(req.query.message){
      message+= req.query.message
    }
    res.render('student', {dataRows:data, message:message, pageTitle:'Student List'});
  })
})

router.get('/add', function(req, res){
  res.render('student_add',{pageTitle:'Add New Student'});
})

router.post('/add', function(req, res){
  model.Student.create(req.body).then((data)=>{
    res.redirect('/students?message=success')
  }).catch((err)=>{
    res.redirect('/students?message='+err)
  })
})

router.get('/edit/:id', function(req, res){
  model.Student.findById(req.param('id')).then((data)=>{
    res.render('student_edit', {dataRows:data, pageTitle:'Edit Student '+data.fullname()});
  }).catch((err)=>{
    console.log(err);
  })
})

router.post('/edit/:id', function(req, res){
  model.Student.update({first_name:req.body.first_name, last_name:req.body.last_name, email:req.body.email, id:req.param('id')}, {where:{id:req.param('id')}}).then((data)=>{
    res.redirect('/students?message=success')
  }).catch((err)=>{
    console.log(err);
    res.redirect('/students?message='+err)
  })
})

router.get('/delete/:id', function(req, res){
  model.Student.destroy({where:{id:req.param('id')}}).then((data)=>{
    res.redirect('/students?message=success')
  }).catch((err)=>{
    res.redirect('/students?message='+err)
  })
})

router.get('/:id/addsubject', function(req, res){
  model.Student.findById(req.param('id')).then((rows)=>{
    model.Subject.findAll().then((data)=>{
      res.render('student_subject', {subjectRows:data, dataRows:rows, pageTitle:'Add Subject '+rows.fullname()});
    })
  })
})

router.post('/:id/addsubject', function(req, res){
  var data = {
    score: 0,
    StudentId: req.param('id'),
    SubjectId: req.body.SubjectId
  }
  model.Subject_Student.create(data).then(()=>{
    res.redirect('/students?message=success')
  }).catch((err)=>{
    res.redirect('/students?message='+err)
  })
})

module.exports = router;
