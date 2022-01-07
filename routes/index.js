// const express = require('express');
// const router = express.Router();
// const User = require('./user');
// const {getCommitByCrawling} = require('./gitCrawler.js');


// router.use('/user', User);

const express = require('express');
const router = express.Router();

const User = require('./user');
const ChatRoom = require('./chatroom');
const Chat = require('./chat');

router.use('/user', User); 
router.use('/chatroom', ChatRoom);
router.use('/chat', Chat);

router.get('/', function(req, res, next) {
    res.send('hello world!')
});

router.put('/', function(req, res, next) {
  res.send('hello hello world!')
});

module.exports = router;