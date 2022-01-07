const express = require('express');
const router = express.Router();

const User = require('..models/user');
const Chatroom = require('../models/chatroom');

router.use('/user', User); 
router.use('/chatroom', Chatroom);

router.get('/', function(req, res, next) {
    res.send('hello world!')
});

router.put('/', function(req, res, next) {
  res.send('hello hello world!')
});

module.exports = router;