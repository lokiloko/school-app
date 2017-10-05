const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', function(req,res ) {
  Model.Subject.findAll()
  .then(dataSubject => {
    // res.send('ANYING ERROR')
    res.render('subjects/subjects', {dataSubject: dataSubject})
  })
  .catch(err => {
    res.send(err)
  })
})

router.get('/add', function(req,res) {
  res.render('subjects/add', {dataError: null})
})

router.post('/add', function(req,res) {
  Model.Subject.create({
    subject_name: req.body.subject_name
  })
  // .save()
  .then(() => {
    res.redirect('/subjects')
  })
  .catch(err => {
    res.send(err)
    })
  })

router.get('/delete/:id', function(req,res) {
  Model.Subject.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/subjects')
  })
  .catch(err => {
    res.send(err)
  })
})

router.get('/edit/:id', function(req,res) {
  Model.Subject.findById(req.params.id)
  .then(dataSubject => {
    // res.send(dataTeacher)
    res.render('subjects/edit', { dataSubject: dataSubject })
  })
  .catch(err => {
    res.send(err)
  })
})

router.post('/edit/:id', function(req,res) {
  Model.Subject.update({
    subject_name: req.body.subject_name
  },{
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/subjects')
  })
  .catch(err => {
    res.send(err)
  })
})

module.exports = router
