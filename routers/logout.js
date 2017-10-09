const express = require('express');
const router = express.Router();
const session = require('express-session');

router.get('/', function(req, res) {
  req.session.destroy();
  res.redirect('/login?message=successlogout');
})
module.exports = router;
