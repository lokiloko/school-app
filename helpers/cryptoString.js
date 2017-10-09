const crypto = require('crypto');

function cryptoString() {
  var alphaNumeric = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var salt = "";
  for(let i = 8;i>0;i--){
    salt+= alphaNumeric[Math.floor(Math.random() * alphaNumeric.length)];
  }
  return salt;
}

module.exports = cryptoString;
