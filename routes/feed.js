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
      console.log(info);
      console.log(info["userId"])
      User.findOne({_id: info["userId"]}).exec((error, user) => {
        if (err) return res.status(500).json({"validation": 0});
        if (!user) return res.status(404).json({"validation": 2});
        else {
          return res.status(200).json({
            time: info["time"],
            image: info["image"],
            content: info["content"],
            nickName: user["nickName"]
          });
        }
      })
      // console.log('get info by id 성공');
      // console.log(info);
      // User.findOne({_id: info["userId"]}, (error, user) => {
      //   if(error) res.status(500).json({"validation": 0});
      //   if(!user) res.status(404).json({"validation": 2});
      //   else {
      //     return res.status(200).json({
      //       nickName: user["nickName"],
      //       time: info["time"],
      //       image: info["image"],
      //       content: info["content"]
      //     });
      //   }
      // })
    }
  })
})

// get all feed
router.get('/', (req, res) => {
  Feed.find().exec((err, feeds) => {
    if(err) return res.status(500).json({"validation": 0});
    if(!feeds) return res.status(404).json({"validation": 2});
    else return res.status(200).json({ 
      feeds
    });
  })
})

// post new feed with id, nickname
router.post('/:id', (req, res) => {
  const nickName = req.body.nickName;
  const content = req.body.content;
  const image = req.body.image;
  const time = req.body.time;
  // const filter = {id: req.params.id};
  User.findOne({id: req.params.id}).exec((erroror, useru) => {
    if(erroror) return res.status(404).json({result: 0});
    if(!useru) return res.status(404).json({result: 2});
    else {
      console.log(useru);
      Feed.insertMany({nickName, content, image, time, userId: useru["_id"]}, (err, feed) => {
        if(err) res.status(404).json({result: 0});    // 이미 있는 유저
        else {
          console.log('add feed 성공');
          const feedId = feed[0]["_id"];
          console.log(feedId);
          User.updateOne({id: req.params.id}, { $push: {feeds: feedId} }, (error, user) => {
            if(error) return res.status(404).json({result: 0});
            else {
              console.log(feed);
              console.log(user);
              return res.status(200).json({result: 1});
            }
          })
        }
      });
    }
  })
})

// update feed
router.put('/:id', (req, res) => {
  const time = req.body.time;
  const image = req.body.image;
  const content = req.body.content;
  Feed.updateOne({_id: req.params.id}, {time, image, content}, function(err, success) {
    if(err) return res.status(400).json({"result": 0});
    else return res.status(200).json({"result": 1});
  })
})


// delete feed
router.delete('/:id', (req, res) => {
  Feed.deleteOne({_id: req.params.id}, (err, d) => {
    if(err) return res.status(200).json({result: 0});
    else {
      if(d.deletedCount === 1) return res.status(200).json({result: 1});
      else return res.status(200).json({result: 0});
    }
  });
});

module.exports = router;