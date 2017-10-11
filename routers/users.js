const express = require('express');
const session = require('express-session');
const router = express.Router();
const model = require('../models');
const checkRole = require('../helpers/checkRole.js');

router.use(function(req, res, next) {
  if (checkRole('users', req.session.role)) {
    next()
  } else {
    res.redirect('/');
  }
})

router.get('/', function(req, res) {
  var message = "";
  if (req.query.message) {
    message += req.query.message
  }
  model.User.findAll().then((data)=>{
    res.render('user', {dataRows:data, pageTitle:'User', message:message, role:req.session.role})
  })
})

router.get('/add', function(req, res){
  var message = "";
  if (req.query.message) {
    message += req.query.message
  }
  res.render('user_add', {pageTitle:'Add User',message:message, role:req.session.role})
})

router.post('/add', function(req, res){
  if(req.body.password != req.body.re_password){
    res.redirect('/users/add?message=error password missmatch')
  }
  var salt = '4tJxVBPW';
  model.User.create({
    username:req.body.username,
    password:req.body.password,
    role:req.body.role,
    salt:salt,
    i:1
  }).then(()=>{
    res.redirect('/users?message=success');
  }).catch((err)=>{
    res.redirect('/users?message='+err);
  })
})

module.exports = router;
