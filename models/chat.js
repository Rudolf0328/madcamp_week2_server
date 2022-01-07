const { ObjectID, ObjectId } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chat = new Schema({
  userId: ObjectId, // 채팅을 작성한 사람의 id 현재 로그인 중인 id와 같으면 오른쪽에서 채팅 전송, 이걸 이용해서 user name 불러오기 도전
  content: String,  // 채팅 내용
  time: String, // 채팅 친 시간 string 말고 time 형식도 있을 듯
  roomId: ObjectId  // 이 채팅이 쳐진 chat room의 id
},{versionKey: false});

module.exports = mongoose.model('Chat', chat);
