const express = require('express');
const router = express.Router();
const model = require('../models');

router.get('/', function(req, res){
  model.Student.findAll().then((data)=>{
    var message = "";
    if(req.query.message){
      message+= req.query.message
    }
    res.render('student', {dataRows:data, message:message});
  })
})

router.get('/add', function(req, res){
  res.render('student_add');
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
    res.render('student_edit', {dataRows:data});
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

module.exports = router;
