'use strict';
const cryptoString = require('../helpers/cryptoString.js');
const crypto = require('crypto');
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      validate: {
        isUnique: function(value, next) {
          User.find({
            where: {
              username: value,
              id: {
                [sequelize.Op.not]: this.id
              }
            }
          }).then(data => {
            if (data) {
              return next('Username already used');
            }
            return next();
          }).catch((err) => {
            console.log(err);
          })
        }
      }
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    salt: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Salt must have value'
        },
        isUnique: function cek(value, next) {
          User.find({
            where: {
              salt: value
            }
          }).then(data => {
            if (data) {
              value = cryptoString();
              cek(value, next);
            }
            this.salt = value;
            return next();
          }).catch(function(err) {
            console.log(err);
          })
        }
      }
    }
  })
  User.generateSalt = function() {
    var salt = cryptoString();
    return salt;
  }
  User.prototype.checkHashPassword = function(password) {
    var hash = crypto.createHmac('sha256', this.salt).update(password).digest('hex');
    if (hash == this.password) {
      return true;
    } else {
      return false;
    }
  }
  User.beforeCreate((user) => {
    var hash = crypto.createHmac('sha256', user.salt).update(user.password).digest('hex');
    user.password = hash;
  })
  return User;
};
