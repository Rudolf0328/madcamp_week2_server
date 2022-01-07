// const { ObjectID } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
  name: String, // user name
  profile: String,  // profile image
  // feed table에서 user id로 필터링해서 보여주기
  // feed: [ObjectID] // 이게 맞는지 모르겠당
},{versionKey: false});

module.exports = mongoose.model('User', user);
