'use strict';
const fullName = require('../helpers/fullName.js');
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    SubjectId: DataTypes.INTEGER
  });
  Teacher.associate = function(models){
    models.Teacher.belongsTo(models.Subject);
  }
  Teacher.prototype.fullname = function () {
    return fullName(this.first_name, this.last_name);
  }
  return Teacher;
};
