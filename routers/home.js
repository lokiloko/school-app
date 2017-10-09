const express = require('express');
const router = express.Router();
const session = require('express-session');

router.use(function(req, res, next){
  console.log(req.session);
  if(req.session && req.session.username) {
    next()
  }else {
    res.redirect('/login');
  }
})

router.get('/', function(req, res){
  var message = "";
  if(req.query.message){
    message+= req.query.message
  }
  res.render('home', {pageTitle:'Home', role:req.session.role, message:message});
})
module.exports = router;
