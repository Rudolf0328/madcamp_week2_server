var express = require('express');
var router = express.Router();
var app = express();

const User = require('../models/user.js');
const ChatRoom = require('../models/chatroom.js');
const Chat = require('../models/chat.js');


// get chat with chat id
router.get('/:chatId', (req, res) => {
  // const id = new ObjectId(req.params.roomId);
  // const filter = {_id: req.params.roomId};

  ChatRoom.findOne({ _id: req.params.chatId }).exec((err, info) => {
    if (err) return res.status(500).json({ "validation": 0 });  // db failed -> db가 아예 터지거나 쿼리가 잘못되었을 때
    if (!info) return res.status(404).json({ "validation": 2 });   // no user  -> db에 저장된 유저정보가 없는 이름일 때
    else {
      console.log('get info by room id 성공');
      console.log(info);
      // const filter = { chatroomId: info["_id"] };
      return res.status(200).json({
        // validation: 1,
        userId: info["userId"],
        content: info["content"],
        time: info["time"],
        chatroomId: info["chatroomId"]
      });
    }
  })
});

// post new chat with a lot of information
router.post('/', (req, res) => {
  // const filter = {nickName: req.body.userId};
  const content = req.body.content;
  const time = req.body.time;
  const chatroomId = req.body.chatroomId;

  User.findOne({id: req.body.userId}).exec((error, user) => {
    if(error) return res.status(404).json({ result: "몰라 나도" });
    if(!user) return res.status(500).json({ result: "왜 또 없어" });
    else {
      const userId = user["_id"];
      Chat.insertMany({ userId, content, time, chatroomId }, (err, chat) => {
        if (err) return res.status(404).json({ result: 0 });
        else {
          console.log('add chat 성공');
          console.log(chat);
          return res.status(200).json({
            result: 1,
            _id: chat["_id"]
          });
        }
      });
    }
  })
});

module.exports = router;