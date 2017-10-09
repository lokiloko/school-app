const express = require('express');
const router = express.Router();
const session = require('express-session');
const crypto = require('crypto');

router.get('/', function(req, res){
  var alphaNumeric = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var salt = "";
  for(let i = 8;i>0;i--){
    salt+= alphaNumeric[Math.floor(Math.random() * alphaNumeric.length)];
  }
  var hash = crypto.createHmac('sha256', salt).update('magenotwhy').digest('hex');
  console.log(hash)
  console.log(salt)
})

module.exports = router;
