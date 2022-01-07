const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
  nickName: String, // user name
  profile: String,  // profile image
  id: {type: String, unique: true, required: true},  // login시 사용하는 고유 id 
  // feed table에서 user id로 필터링해서 보여주기
  // feeds: [ObjectId] // 이게 맞는지 모르겠당
  // chatrooms: [ObjectId]  // 얘도 모르겟..
  feeds: { type: [Schema.Types.ObjectId], ref: 'User'},
  chatrooms: {type: [Schema.Types.ObjectId], ref: 'Feed'}
}, {versionKey: false});

module.exports = mongoose.model('User', user);
