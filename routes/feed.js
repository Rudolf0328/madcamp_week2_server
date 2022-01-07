var express = require('express');
var router = express.Router();
var app = express();

const User = require('../models/user.js');
const ChatRoom = require('../models/chatroom.js');
const Chat = require('../models/chat.js');
const Feed = require('../models/feed.js');

// get feed with feed id
router.get('/:id', (req, res) => {
  const filter = {_id: req.params.id};
  Feed.findOne(filter).exec((err, info) => {
    if(err) res.status(500).json({"validation": 0}); 
    if(!info) res.status(404).json({"validation": 2});
    else {
      console.log('get info by id 성공');
      console.log(info);
      User.findOne({_id: info["userId"]}, (error, user) => {
        if(error) res.status(500).json({"validation": 0});
        if(!user) res.status(404).json({"validation": 2});
        else {
          return res.status(200).json({
            nickName: user["nickName"],
            time: info["time"],
            image: info["image"],
            content: info["content"]
          });
        }
      })
    }
  })
})


// TODO : 여기부터
router.delete('/:id', (req, res) => {
  const filter = {_id: req.params.id};
  Feed.deleteOne(filter).exec((err, feed) => {
    
  });
});