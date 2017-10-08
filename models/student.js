'use strict';
const fullName = require('../helpers/fullName.js');
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'email format is incorrect'
        }, isUnique: function(value, next){
          Student.find({
            where: {email:value, id:{[sequelize.Op.not]:this.id}}
          }).then(function (data){
            if(data){
              return next('Email Already Used')
            }
            return next();
          }).catch(function(err){
            console.log(err);
          })
        }
      }
    }
  })
  Student.associate = function(models) {
    models.Student.belongsToMany(models.Subject, {through: 'Subject_Student'});
    models.Student.hasMany(models.Subject_Student)
  }
  Student.prototype.fullname = function () {
    return fullName(this.first_name, this.last_name);
  }
  return Student;
};
