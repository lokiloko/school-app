function scoreLetter(score) {
  if(score > 0) {
    if(score >= 85) {
      return 'A';
    }
    if(score >= 70) {
      return 'B';
    }
    if(score >= 55) {
      return 'C';
    }
    else {
      return 'E';
    }
  }
  else{
    return 'empty';
  }
}

module.exports = scoreLetter;
