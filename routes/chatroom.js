var express = require('express');
var router = express.Router();
var app = express();

const User = require('../models/user.js');
const ChatRoom = require('../models/chatroom.js');
const Chat = require('../models/chat.js');

// get chat room with room id
router.get('/:roomId', (req, res) => {
  // const id = new ObjectId(req.params.roomId);
  // const filter = {_id: req.params.roomId};

  ChatRoom.findOne({ _id: req.params.roomId }).exec((err, info) => {
    if (err) return res.status(500).json({ "validation": 0 });  // db failed -> db가 아예 터지거나 쿼리가 잘못되었을 때
    if (!info) return res.status(404).json({ "validation": 2 });   // no user  -> db에 저장된 유저정보가 없는 이름일 때
    else {
      console.log('get info by room id 성공');
      console.log(info);
      // const filter = { chatroomId: info["_id"] };
      Chat.find({chatroomId: req.params.roomId}).exec((error, chats) => {
        if (error) return res.status(500).json({ "validation": 3 });
        if (!chats) return res.status(200).json({ "empty": 1 });

        console.log(chats);
        return res.status(200).json({
          // validation: 1,
          empty: 0,
          name: info["name"],
          ownerId: info["owner"],
          currentUser: info["currentUser"],
          chats
        });
      })
    }
  })
})

// post new chat room with a lot of information
router.post('/', (req, res) => {
  const name = req.body.name;
  const maxUser = req.body.maxUser;
  const currentUser = 1;
  const image = req.body.image;
  const status = true;
  const filter = {id: req.body.ownerId};
  console.log(filter);
  User.findOne(filter).exec((err, info) => {
    if(err) res.status(500).json({"error": "error"});
    if(!info) res.status(404).json({"error": "없는 유저"});
    else {
      console.log(info);
      const owner = info["_id"];
      ChatRoom.insertMany({ name, owner, maxUser, currentUser, image, status }, (err, chatroom) => {
        if(err) res.status(404).json({result: 0});
        else {
          console.log('add chatroom 성공');
          console.log(chatroom);
          return res.status(200).json({ 
            result: 1,
            _id: chatroom["_id"] 
          });
        }
      });
    }
  }) 
})

router.put('/:id', (req, res) => {
  const userId = req.body.userId;
  const filter = {chatroomId: req.params.id};
  User.findOne({id: userId}, (error, user) => {
    const _id = user["_id"];
    // TODO : currentUser 늘리기
    ChatRoom.updateOne(filter, {$push: {people: _id}}, (err, chat) => {
      if(err) return res.status(500).json({"error": error});
      if(!chat) return res.status(404).json({"error": error});
      else {
        // TODO : currentUser 하나 증가
        // TODO : 왜 안되냐 짜증나게 -_-; 귀엽네
        const currentUser = chat["currentUser"] + 1;
        console.log(chat["currentUser"]);
        console.log(currentUser);
        ChatRoom.updateOne(filter, {currentUser}, (error, result) => {
          if(error) return res.status(500).json({"error": error});
          // 
          else {
            return res.status(200).json({
              "result": 1
            })
          }
        })
        // chat["currentUser"] += 1;
      }
    })
  })
})

module.exports = router;