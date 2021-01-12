var express = require('express');
var router = express.Router();
const User = require('./../models').User;

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let users = await User.findAll({});
  res.json({
    users: users
  })
});

module.exports = router;
