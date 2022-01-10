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
  feeds: ["feedId"],   // feed list
  chatRooms: ["room"], // room list
  profile: String
}
```  

현재
```
{
    "nickName": "박정웅",
    "_id": "61db0dedb8233af9f2acd891",
    "profile": "https://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg",
    "feeds": [
        "61db1a14ad67d057df42baa2",
        "61db1a32ad67d057df42baa7",
        "61db1af0e869cdaa58b92a3b",
        "61db25a5e1ca61d908832f7c",
        "61db267be1ca61d908832f87",
        "61db26c285b1ca4f3a110740",
        "61db27778873ec4fdbf452f7"
    ]
}
```

[GET] api/user/feeds/:id        // feed id 리스트가 아니라 feed list로 바꿔보자
- response
```
{
  feeds: ["feed id"]   //  혹시 피드만 불러올 일이 있을까봐 따로 만들었는데 get user 랑 합쳐도 되면 말해줭
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

[GET] api/feed/   :모든 feed


현재
쓴 사람 nickName이 안 떠 ㅠ

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

[POST] api/feed/:id  : 사람 아이디 이용해서 새로운 feed 추가
- request
```
{
  nickName: "닉네임",
  content: "맛있었다.",
  image: "이미지 url",
  time: "올린 시간"
}
```
- response
```
{
  result: 0 or 1    // 0이면 실패 1이면 성공
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

//현재: 프로필 수정이 안돼요

[PUT] api/chatroom/:id    // 채팅방에 한 명 추가 됐을 때
- request
```
{
  userId: "yelio327"    // 채팅방에 새로 들어간 유저의 id
  
}
```

[PUT] api/feed/:id  // feed 편집
- request
```
{
  time: "수정시간",
  image: "수정된 사진",
  content: "수정된 내용"
}
```
- response
```
{
  result: 0 or 1    // 이거 사실 업데이트하면 바뀐 정보를 주는게 맞는거 같은데 일단 두고 고쳐줄게 그게 맞겠지...?
}
```

//현재: feed 수정시 response는 오는데 실제로 수정이 안돼용

## DELETE
[DELETE] api/user/:id   // 탈퇴 시 사용  
- response
```
{
  result: 0 or 1    // 성공하면 1, 실패하면 0
}
```

현재
```
유저가 가지고 있는 피드들이 삭제가 안돼. 이건 클라이언트에서 계정삭제할때 user feed list 불러와서 하나하나 다 feed삭제 한 다음에 유저 계정 삭제해도 되긴 하는데 디비 바꾸기 어려우면 저렇게 해볼게
```

[DELETE] api/feed/:id   // feed 삭제 시 사용
- response
```
{
  result: 0 or 1    // 성공하면 1, 실패하면 0
}
```

현재
```
피드 삭제가 user feedlist에 반영이 안돼 ㅠ 유저 a가 피드 리스트로 [feed1] 들고 있을때 feed1 을 삭제해도 /api/user/유저a 하면 유저 피드리스트에 [feed1]이 떠
```
