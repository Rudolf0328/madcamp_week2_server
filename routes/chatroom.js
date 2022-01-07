var express = require('express');
var router = express.Router();
var app = express();

const ChatRoom = require('../models/chatroom.js');

// post new user with id, nickname
router.post('/', (req, res) => {
  const name = req.body.name;
  const maxUser = req.body.maxUser;
  const currentUser = 1;
  const image = req.body.image;
  const status = true;
  const ownerId = req.body.owner;
  User.findOne({id: ownerId}).exec((err, info) => {
    const owner = info["_id"];
    ChatRoom.insertMany({ name, owner, maxUser, currentUser, image, status }, (err, chatroom) => {
      if(err) res.status(404).json({result: 0});
      else {
        console.log('add chatroom 성공');
        return res.status(200).json({ result: 1 });
      }
    });
  }) 
})