'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  })
  Subject.associate = function(models) {
    models.Subject.hasMany(models.Teacher);
    models.Subject.belongsToMany(models.Student, {through: 'Subject_Student'});
    models.Subject.hasMany(models.Subject_Student)
  }
  return Subject;
};
