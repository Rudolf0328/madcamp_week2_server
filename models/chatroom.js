const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatroom = new Schema({
  name: String,  // 채팅방 이름
  owner: {type: Schema.Types.ObjectId, ref: 'User'}, // 채팅방 만든 주인
  people: {type: [Schema.Types.ObjectId], ref: 'User'}, // 채팅방에 참가 중인 사람들
  maxUser: Number,  // 채팅방의 총 사람 수
  currentUser: Number,  // 채팅 방의 현재 참여 중인 인원
  image: String,  // 채팅방 사진 우리가 줄 듯
  status: Boolean // 채팅방이 살아있는지 죽어있는지
},{versionKey: false});

module.exports = mongoose.model('ChatRoom', chatroom);
