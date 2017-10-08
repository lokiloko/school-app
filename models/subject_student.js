'use strict';
const scoreLetter = require('../helpers/scoreLetter');
module.exports = (sequelize, DataTypes) => {
  var Subject_Student = sequelize.define('Subject_Student', {
    SubjectId: DataTypes.INTEGER,
    StudentId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  })
  Subject_Student.associate = function(models) {
    models.Subject_Student.belongsTo(models.Student);
    models.Subject_Student.belongsTo(models.Subject);
  }
  Subject_Student.prototype.scoreLetter = function() {
    return scoreLetter(this.score);
  }
  return Subject_Student;
};
