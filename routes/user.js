var express = require('express');
var router = express.Router();
var app = express();

const User = require('../models/user.js');

// get user info by id
router.get('/:id', (req, res) => {
  const filter = {id: req.params.id};
  User.findOne(filter).exec((err, info) => {
    if(err) res.status(500).json({"validation": 0});      // db failed -> db가 아예 터지거나 쿼리가 잘못되었을 때
    if(!info) res.status(404).json({"validation": 2});   // no user  -> db에 저장된 유저정보가 없는 이름일 때
    else {
      console.log('get info by id 성공');
      console.log(info);
      return res.status(200).json({
        // validation: 1,
        nickName: info["nickName"],
        _id: info["_id"],
        profile: info["profile"],
        feeds: info["feeds"]
      });
    }
  })
})

// get feed info by user id
router.get('/feeds/:id', (req, res) => {
  const filter = {id: req.params.id};
  User.find(filter).exec((err, user) => {
    if(err) return res.status(500).json({"validation": 0});
    if(!user) return res.status(404).json({"validation": 2});
    else {
      return res.status(200).json({
        feeds: user[0]["feeds"]
      })
    }
  })
})

// post new user with id, nickname
router.post('/', (req, res) => {
  const nickName = req.body.nickName;
  const profile = req.body.profile;
  User.insertMany({id: req.body.id, nickName, profile}, (err, user) => {
    if(err) res.status(404).json({result: 0});    // 이미 있는 유저
    else {
      console.log('add user 성공');
      return res.status(200).json({result: 1});
    }
  });
})

// delete user with id
router.delete('/:id', (req, res) => {
  User.deleteOne({id: req.params.id}, (err, d) => {
    if(err) res.status(200).json({result: 0});
    else {
      if(d.deletedCount === 1) return res.status(200).json({result: 1});
      else return res.status(200).json({result: 0});
    }
  })
})

// update user with id
// 프로필 편집할 때 사용
router.put('/:id', (req, res) => {
  const nickName = req.body.nickName;
  const profile = req.body.profile;
  const newId = req.body.newId;

  User.updateOne({id: id},
    {nickName, profile, id: newId},                         // 이름이 name인 사람을 찾아서햐
    function (error, success) {
      if(error) {
        console.log(error);
        return res.status(400).json({"result": 0});
      } else {
        console.log(success);
        return res.status(200).json({"result": 1});
      }
    })
})

// TODO: feed 추가, 삭제, chatroom 삭제

// // delete friend with json
// router.put('/friend/delete', (req, res) => {
//   const name = req.body.userName;            // body로 받은 userName을 저장
//   const fName = req.body.friendName;    // body로 받은 friendName을 저장
//   User.updateOne(
//     {userName: name},                         // 이름이 name인 사람을 찾아서햐
//     {$pull: {friends: fName}},          // friendName을 friends 배열에서 삭제하라
//     function (error, success) {
//       if(error) {
//         console.log(error);
//         return res.status(400).json({"result": 0});
//       } else {
//         console.log(success);
//         return res.status(200).json({"result": 1});
//       }
//     })
// })

module.exports = router;