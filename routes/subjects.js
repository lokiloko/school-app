const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', (req,res) => {
  Model.Subject.findAll()
  .then(subjects=>{
    res.render('subjects',{dataSubjects:subjects})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/add',(req,res)=>{
  Model.Subject.findAll()
  .then(subjects=>{
    res.render('add_subjects',{dataSubjects:subjects})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/add', (req,res)=>{
  Model.Subject.create({
    subject_name: req.body.subject_name,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(subjects=>{
    res.redirect('/subjects')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/delete/:id',(req,res)=>{
  Model.Subject.destroy({
    where:{
      id:req.params.id
    }
  })
  .then(()=>{
    res.redirect('/subjects')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/edit/:id',(req,res)=>{
  Model.Subject.findById(req.params.id)
  .then(data=>{
    res.render('edit_subjects', {dataSubjects:data})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/edit/:id',(req,res)=>{
  Model.Subject.update({
    subject_name: req.body.subject_name,
  },
  {
    where: {  
      id:req.params.id
    }
  })
  .then(data=>{
    res.redirect('/subjects')
  })
  .catch(err=>{
    res.send(err)
  })
})


module.exports = router;
