'use strict';
const fullName = require('../helpers/fullName.js');
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'email format is incorrect'
        },
        isUnique: function(value, next) {
          Teacher.find({
            where: {
              email: value,
              id: {
                [sequelize.Op.not]: this.id
              }
            }
          }).then(function(data) {
            if (data) {
              return next('Email Already Used')
            }
            return next();
          }).catch(function(err) {
            console.log(err);
          })
        }
      }
    },
    SubjectId: DataTypes.INTEGER
  });
  Teacher.associate = function(models) {
    models.Teacher.belongsTo(models.Subject);
  }
  Teacher.prototype.fullname = function() {
    return fullName(this.first_name, this.last_name);
  }
  return Teacher;
};
