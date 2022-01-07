# API LIST
setting : 172.10.5.77

성공 : 200  
연결 끊김 : 404  
기타 다른거 : 400  

## GET
[GET] api/user/:id
- response
```
{
  nickName: "이지원",
  feeds: ["feed"]   // feed list
  chatRooms: ["room"] // room list
}
```  
  
[GET] api/chatroom/:roomId  
- response
```
{

}
```

## POST
[POST] api/user/add : 새로운 유저 가입  
- request
```
{
  nickName: "이지원",
  profile: "프로필 주소",
  id: "사용자 id",     // 로그인 할 때 쓰는 고유한 id
  password: "****"
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
  image: "채팅방 사진",
}
```
- response
```
{
  result: 0 or 1  // 성공하면 1, 실패하면 0
}
```