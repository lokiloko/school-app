function checkRole(page, role) {
  switch(page) {
    case 'students':
      if(role != null){
        return true;
      }
      return false;
    break;
    case 'teachers':
      if(role == 'headmaster'){
        return true;
      }
      return false;
    break;
    case 'subjects':
      if(role == 'headmaster' || role=='academic'){
        return true;
      }
      return false;
    break;
  }
}

module.exports = checkRole;
