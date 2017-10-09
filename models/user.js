'use strict';
const cryptoString = require('../helpers/cryptoString.js');
const crypto = require('crypto');
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    salt: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args:true,
          msg:'Salt must have value'
        },
        isUnique: function cek(value, next) {
          User.find({
            where: {salt:value}
          }).then(function(data){
            if(data){
              value = cryptoString();
              cek(value, next);
            }
            return next();
          }).catch(function(err){
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
    if(hash == this.password){
      return true;
    }
    else{
      return false;
    }
  }
  User.beforeCreate((user)=>{
    var hash = crypto.createHmac('sha256', user.salt).update(user.password).digest('hex');
    user.password = hash;
  })
  return User;
};
