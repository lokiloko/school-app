const express = require('express');
const router = express.Router();
const model = require('../models');

router.get('/', function(req, res){
  model.Subject.findAll().then((rows)=>{
    res.render('subject', {dataRows:rows});
  })
})
module.exports = router;
