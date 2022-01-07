const express = require('express');
const router = express.Router();
// const User = require('./user');

// router.use('/user', User);

router.get('/', function(req, res, next) {
    res.send('hello world!')
});

router.put('/', function(req, res, next) {
  res.send('hello hello world!')
});

module.exports = router;