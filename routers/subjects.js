const express = require('express');
const session = require('express-session');
const router = express.Router();
const model = require('../models');
const checkRole = require('../helpers/checkRole.js');

router.use(function(req, res, next){
  if(checkRole('subjects', req.session.role)){
    next()
  }else{
    res.redirect('/');
  }
})

router.get('/', function(req, res) {
  var message = "";
  if (req.query.message) {
    message += req.query.message
  }
  model.Subject.findAll().then((rows) => {
    var arr_prom = [];
    rows.forEach((row)=>{
      arr_prom.push(row.getTeachers());
    })
    Promise.all(arr_prom).then((result)=>{
      rows.forEach((subject, index)=>{
        subject['teacher'] = result[index];
      })
      res.render('subject', {dataRows:rows, message:message, pageTitle:'Subjects List', role:req.session.role})
    })
  })
})

router.get('/:id/enrolledstudents', function(req, res){
  // model.Subject.findById(req.param('id')).then((subject)=>{
  //   subject.getSubject_Students({attributes: ['id','SubjectId','StudentId','score']}).then((subject_students)=>{
  //     var arr_prom = []
  //     subject_students.forEach((subject_student)=>{
  //       arr_prom.push(subject_student.getStudent());
  //     })
  //     Promise.all(arr_prom).then((students)=>{
  //       students.forEach((student, index)=>{
  //         subject_students[index]['Student'] = student;
  //       })
  //       res.render('enroll', {dataRows:subject, studentsRows:subject_students})
  //     })
  //   })
  // })
  model.Subject.findById(req.param('id')).then((subject)=>{
    var message = "";
    if (req.query.message) {
      message += req.query.message
    }
    subject.getSubject_Students({attributes:['id','SubjectId', 'StudentId','score'], include:[{model: model.Student}], order:[[model.Student, 'first_name']]}).then((subject_students)=>{
      res.render('enroll', {dataRows:subject, studentsRows:subject_students, pageTitle:'Enrolled Students in '+subject.subject_name, message:message, role:req.session.role})
    })
  })
})

router.get('/:id/givescore', function(req, res){
  model.Subject_Student.find({where: {id:req.param('id')}}, {attributes:['id', 'SubjectId', 'StudentId', 'score']}).then((subject_student)=>{
    console.log('aa');
    Promise.all([
      subject_student.getSubject(),
      subject_student.getStudent()
    ]).then((result)=>{
      res.render('give_score', {subjectRows: result[0], studentRows: result[1], id:req.param('id'), pageTitle:'Give Score to '+result[1].fullname()+' at '+result[0].subject_name, role:req.session.role})
    })
  })
})

router.post('/:id/givescore', function(req, res){
  model.Subject_Student.update({score:req.body.score}, {where:{id:req.param('id')}}).then(()=>{
    res.redirect('/subjects/'+req.body.SubjectId+'/enrolledstudents?message=success');
  }).catch((err)=>{
    res.redirect('/subjects/'+req.body.SubjectId+'/enrolledstudents?message='+err);
  })
})

router.get('/add', function(req, res){
  res.render('subject_add',{pageTitle:'Add New Subject'});
})

router.post('/add', function(req, res){
  model.Subject.create(req.body).then((data)=>{
    res.redirect('/subjects?message=success')
  }).catch((err)=>{
    res.redirect('/subjects?message='+err)
  })
})

router.get('/edit/:id', function(req, res){
  model.Subject.findById(req.param('id')).then((data)=>{
    res.render('subject_edit', {dataRows:data, pageTitle:'Edit Subject '+data.subject_name, role:req.session.role});
  }).catch((err)=>{
    console.log(err);
  })
})

router.post('/edit/:id', function(req, res){
  model.Subject.update({subject_name:req.body.subject_name}, {where:{id:req.param('id')}}).then((data)=>{
    res.redirect('/subjects?message=success')
  }).catch((err)=>{
    console.log(err);
    res.redirect('/subjects?message='+err)
  })
})

router.get('/delete/:id', function(req, res){
  model.Subject.destroy({where:{id:req.param('id')}}).then((data)=>{
    res.redirect('/subjects?message=success')
  }).catch((err)=>{
    res.redirect('/subjects?message='+err)
  })
})

module.exports = router;
