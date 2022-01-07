# API LIST

성공 : 200  
연결 끊김 : 404  
기타 다른거 : 400  

## GET
[GET] api/user/:id
- response
```
{
  nickName: "이지원",
  feeds: ["feed"],   // feed list
  chatRooms: ["room"], // room list
  profile: String
}
```  

[GET] api/user/feeds/:id
- response
```
{
  feeds: ["feed"]   //  혹시 피드만 불러올 일이 있을까봐 따로 만들었는데 get user 랑 합쳐도 되면 말해줭
}
```

[GET] api/chatroom/:roomId
- response
```
{
  empty: 1 or 0,    // 1이면 채팅이 없는거
  name: "채팅방 이름",
  ownerId: "ck07160",
  chats: [
    {
      _id: "엄청 긴거",   // 각 chatting 마다 id
      userId: "엄청 긴거",  //이거 별로면 얘기햄
      content: "안녕",
      time: 2021-10-28,   // 시간까지 주고 싶은데 어떤 형식인지 알려줘
      chatroomId: "엄청 긴거"   // 채팅방 id 일단 주는데 굳이 필요한가? 안 쓰면 빼줄게
    }
  ]   // 일단 많이 주는데 얼마나 줄 수 있는지 모르겠다.
      // 만약에 한계가 있으면 recyclerview에서 위로 올릴 때마다 줘야 될지도...
}
```

[GET] api/feed/:id  : feed id를 통해 feed 불러오기 그니까 feed id 길어도 잘 보관해
- response
```
{
  nickName: "루돌프",   // 그 닉네임..?이 나오는게 맞겠지 졸려서 생각이 잘 안돼
  time: "시간",
  image: "이미지 주소",
  content: "내용"
}
```


## POST
[POST] api/user/ : 새로운 유저 가입
- request
```
{
  nickName: "이지원",
  profile: "프로필 주소",
  id: "사용자 id",     // 로그인 할 때 쓰는 고유한 id
  // password: "****"
}
```
- response
```
{
  result: 0 or 1  // 성공하면 1, 실패하면 0
}
```  
  
[POST] api/chatroom/ : 새로운 채팅 방 추가
- request
```
{
  name: "밥 먹자",
  ownerId: "사용자 고유 id",   // 채팅방 만든 사람
  maxUser: 5,   // 최대 가능 인원 수, currentUser는 1로 설정
  image: "채팅방 사진"
}
```
- response
```
{
  result: 0 or 1,  // 성공하면 1, 실패하면 0
  _id: "엄청 긴 아이디" // 이거 저장했다가 나중에 room 부를 때 필요해
}
```
  
[POST] api/chat/  : 새로운 채팅 전송
- request
```
{
  userId: "ck07160",
  content: "안녕",
  time: "2021-10-28",    // 시간까지? 어떻게 주는거징 알게 되면 수정해주세요~
  chatroomId: "엄청 긴 id"
}
```
- response
```
{
  result: 0 or 1  // 전송되면 1 아니면 0 뭐 그런거
}
```

## PUT
[PUT] api/user/:id  // 프로필 편집, 업데이트 할 때 사용
- request
```
{
  nickName: "루돌프",
  profile: "이미지",
  newId: "ck0716060"   // 새로 바꿀 아이디
}
```
- response
```
{
  result: 0 or 1    // 성공하면 1, 실패하면 0
}
```

## DELETE
[DELETE] api/user/:id   // 탈퇴 시 사용  
- response
```
{
  result: 0 or 1    // 성공하면 1, 실패하면 0
}
```