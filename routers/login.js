const express = require('express');
const router = express.Router();
const session = require('express-session');
const model = require('../models');

router.get('/', function(req, res) {
  var message = "";
  if(req.query.message){
    message+= req.query.message;
  }
  res.render('login', {
    pageTitle: 'Login Page',
    message:message
  });
})

router.post('/', function(req, res) {
  model.User.findOne({where: {username: req.body.username, password: req.body.password}}).then((data)=>{
    if(data){
      req.session.username = data.username;
      req.session.role = data.role;
      res.redirect('/?message=successlogin');
    }
    else{
      throw new Error('Username and Password combination not found');
    }
  }).catch((err)=>{
    res.redirect('/login?message='+err)
  })
})

module.exports = router;
