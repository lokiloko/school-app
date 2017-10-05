const express = require('express');
const router = express.Router();
const model = require('../models');

router.get('/', function(req, res){
  model.Teacher.findAll().then((rows)=>{
    res.render('teacher', {dataRows:rows});
  })
})

module.exports = router;
