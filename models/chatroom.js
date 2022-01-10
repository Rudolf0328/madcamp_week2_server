const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatroom = new Schema({
  name: String,  // 채팅방 이름
  owner: {type: String, ref: 'User'}, // 채팅방 만든 주인
  people: {type: [String], ref: 'User'}, // 채팅방에 참가 중인 사람들
  maxUser: Number,  // 채팅방의 총 사람 수
  // currentUser: Number,  // 채팅 방의 현재 참여 중인 인원
  image: Number,  // 채팅방 사진 우리가 줄 듯
  time: String,   // 모일 시간 받아서 저장
  status: Boolean // 채팅방이 살아있는지 죽어있는지
},{versionKey: false});

module.exports = mongoose.model('ChatRoom', chatroom);
