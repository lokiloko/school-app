const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', function(req,res ) {
  Model.Student.findAll()
  .then(dataStudent => {
    res.render('students/students', {dataStudent: dataStudent})
  })
  .catch(err => {
    res.send(err)
  })
})

router.get('/add', function(req,res) {
  res.render('students/add', {dataError: null})
})

router.post('/add', function(req,res) {
  Model.Student.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  })
  // .save()
  .then(() => {
    res.redirect('/students')
  })
  .catch(err => {
    // res.send(err.message)
      if (err.message == 'Validation error: Validation isEmail on email failed'){
        Model.Student.findAll()
        .then(dataStudent=> {
          res.render('teachers/add', {dataStudent: dataStudent, dataError: 'Email Tidak Valid'})
        })
      }
    })
  })

router.get('/delete/:id', function(req,res) {
  Model.Student.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/students')
  })
  .catch(err => {
    res.send(err)
  })
})

router.get('/edit/:id', function(req,res) {
  Model.Student.findById(req.params.id)
  .then(dataStudent => {
    // res.send(dataTeacher)
    res.render('students/edit', { dataStudent: dataStudent, dataError: null })
  })
  .catch(err => {
    res.send(err)
  })
})

router.post('/edit/:id', function(req,res) {
  Model.Student.update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
  },{
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/students')
  })
  .catch(err => {
    // res.send(err)
    if (err.message == 'Validation error: Validation isEmail on email failed'){
      Model.Student.findAll()
      .then(dataStudent=> {
        res.render('teachers/add', {dataStudent: dataStudent, dataError: 'Email Tidak Valid'})
      })
    }
  })
})

module.exports = router
