const express = require('express');
const router = express.Router();

const User = require('./user');
const ChatRoom = require('./chatroom');
const Chat = require('./chat');
const Feed = require('./feed');

router.use('/user', User); 
router.use('/chatroom', ChatRoom);
router.use('/chat', Chat);
router.use('/feed', Feed);

router.get('/', function(req, res, next) {
    res.send('hello world!')
});

router.put('/', function(req, res, next) {
  res.send('hello hello world!')
});

module.exports = router;