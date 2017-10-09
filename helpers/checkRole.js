function checkRole(page, role) {
  switch(role) {
    case 'headmaster':
      if(page == 'subjects' || page == 'students' || page =='teachers' || page=='users'){
        return true;
      }
      return false;
    break;
    case 'teacher':
      if(page == 'students'){
        return true;
      }
      return false;
    break;
    case 'academic':
      if(page == 'subjects' || page =='students'){
        return true;
      }
      return false;
    break;
    default:
      return false;
    break;
  }
}

module.exports = checkRole;
