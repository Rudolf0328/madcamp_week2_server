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

        else { 
          console.log(chats);
          return res.status(200).json({
            // validation: 1,
            empty: 0,
            name: info["name"],
            owner: info["owner"],
            currentUser: info["currentUser"],
            chats
          });
        }
      })
    }
  })
})

router.get('/', (req, res) => {
  ChatRoom.find().exec((err, chatrooms) => {
    if(err) return res.status(500).json({ "validation": 0});
    if(!chatrooms) return res.status(404).json({"validation": 2});
    else {
      console.log(chatrooms);
      return res.status(200).send(
        chatrooms
      )
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
  const filter = {id: req.body.owner};
  console.log(req.body)
  console.log(req.body.owner);
  console.log(filter);
  User.findOne(filter).exec((err, info) => {
    if(err)  {
      console.log(err);
      res.status(500).json({"error": "error"});
    }
    if(!info) res.status(404).json({"error": "없는 유저"});
    else {
      console.log(info);
      const owner = info["_id"];
      
      // owner를 people에 추가하고 currentUser 없애기 그냥 People 수 세기
      ChatRoom.insertMany({ name, owner, maxUser, currentUser, image, status }, (err, chatroom) => {
        if(err) {
          res.status(404).json({result: 0});
          console.log(err);
        }
        else {
          console.log('add chatroom 성공');
          console.log("여기 맞지...?" + chatroom);
          return res.status(200).json({ 
            _id: chatroom[0]["_id"],
            result: 1,
            test: 3,
            name: chatroom[0]["name"],
            currentUser: chatroom[0]["currentUser"],
            // image: chatroom["image"],
            maxUser: chatroom[0]["maxUser"],
            status: chatroom[0]["status"]
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
        // chat["currentUser"] += 1;
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

// delete user with id
router.delete('/:id', (req, res) => {
  ChatRoom.deleteOne({id: req.params.id}, (err, d) => {
    if(err) res.status(200).json({result: 0});
    else {
      if(d.deletedCount === 1) return res.status(200).json({result: 1});
      else return res.status(200).json({result: 0});
    }
  })
})

module.exports = router;