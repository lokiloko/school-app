const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', function(req,res ) {
  Model.Teacher.findAll()
  .then(dataTeacher => {
    res.render('teachers/teachers', {dataTeacher: dataTeacher})
  })
  .catch(err => {
    res.send(err)
  })
})

router.get('/add', function(req,res) {
  res.render('teachers/add', {dataError: null})
})

router.post('/add', function(req,res) {
  Model.Teacher.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  })
  // .save()
  .then(() => {
    res.redirect('/teachers')
  })
  .catch(err => {
    // res.send(err.message)
      if (err.message == 'Validation error: Validation isEmail on email failed'){
        Model.Teacher.findAll()
        .then(dataTeacher=> {
          res.render('teachers/add', {dataTeacher: dataTeacher, dataError: 'Email Tidak Valid'})
        })
      }
    })
  })

router.get('/delete/:id', function(req,res) {
  Model.Teacher.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/teachers')
  })
  .catch(err => {
    res.send(err)
  })
})

router.get('/edit/:id', function(req,res) {
  Model.Teacher.findById(req.params.id)
  .then(dataTeacher => {
    // res.send(dataTeacher)
    res.render('teachers/edit', { dataTeacher: dataTeacher, dataError: null })
  })
  .catch(err => {
    res.send(err)
  })
})

router.post('/edit/:id', function(req,res) {
  Model.Teacher.update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
  },{
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/teachers')
  })
  .catch(err => {
    // res.send(err)
    if (err.message == 'Validation error: Validation isEmail on email failed'){
      Model.Teacher.findAll()
      .then(dataTeacher=> {
        res.render('teachers/add', {dataTeacher: dataTeacher, dataError: 'Email Tidak Valid'})
      })
    }
  })
})

module.exports = router
