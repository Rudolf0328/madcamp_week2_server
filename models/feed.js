const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feed = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: "User"}, // 작성자 id 이거 이용해서 이름까지 불러올 수 있게 해볼게
  time: String, // 작성 시간
  image: String,  // 피드 사진  // 일단 한개만 저장
  content: String // 피드 내용
}, {versionKey: false});

module.exports = mongoose.model('Feed', feed);
