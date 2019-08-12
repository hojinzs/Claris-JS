# Socket io 이벤트 이름 정의

*Socket io Event List*

[#1. on(Send) :: Client to Server](#1.-on(Send)-::-Client-to-Server)
1. [connection(접속)](#1.connection)
2. [setUserInfo(로그인, 사용할 닉네임 설정)](#2.setUserInfo)
3. [chatMessage(채팅 메시지)](#3.chatMessage)
4. [getUserInfo(로그인, 이전에 사용한 유저 정보 요청)](#4.getUserInfo)
5. [getRoomList(개설된 방 목록 요청)](#5.getRoomList)
6. [makeNewRoom(방 개설 요청)](#6.makeNewRoom)
7. [reqJoinRoom(방 참여)](#7.reqJoinRoom)
8. [leaveRoom(방 탈퇴)](#8.leaveRoom)

[#2. emit(Receive) :: Server to Client](#2.-emit(Receive)-::-Server-to-Client)
1. [sendUserInfo(유저 정보 전달)](#1.sendUserInfo)
2. [authFail(인증 실패)](#2.authFail)
3. [chatMessage(채팅 메시지 송출)](#3.chatMessage)
4. [userList(접속된 유저 정보)](#4.userList)
5. [roomList(방 정보)](#5.RoomList)
6. [resNewRoom(새로 개설된 방 정보)](#6.resNewRoom)
7. [resJoinRoom(방 참여됨 알림)](#7.resJoinRoom)
8. [resLeaveRoom(방 나가짐 알림)](#8.resLeaveRoom)

## #1. on(Send) :: Client to Server

### 1.connection
* eventname :: connection 
* description :: 사용자 접속

### 2.setUserInfo
* eventname :: setUserInfo
* description :: 접속자 정보(이름) 세팅
* server-response :: sendUserInfo

**규격(String, 유저 닉네임)**
```string
  의사양반
```

### 3.chatMessage
* eventname :: chatMessage
* description :: 서버로 입력 메시지 송신

**규격(String, 유저가 입력한 메시지)**
```string
  아, 안심하세요. 여긴 병원이에요.
```

### 4.getUserInfo
* eventname :: setUserInfo
* description :: 토큰값으로 이전에 접속했던 유저정보 요청
* server-response :: sendUserInfo, authFail

**규격(String, 로컬 스토리지의 토큰 값)**
```string
  foPKdcjQVfvmuERAAAAfoPKdcjQVfvmuERAAAA
```

### 5.getRoomList
* eventname :: getRoomList
* description :: 공개 개설된 방 목록을 요청
* server-response :: resRoomList

**규격(String, nullable, 방 이름을 키워드로 검색)**
```string
 백병원 중환자실
```

### 6.makeNewRoom
* eventname :: makeNewRoom
* description :: 새로운 방 개설을 요청
* server-response :: resNewRoom

**규격(String, 개설할 방 이름)**
```string
 백병원 중환자실
```

### 7.reqJoinRoom
* eventname :: reqJoinRoom
* description :: 방 참여를 요청
* server-response :: resJoinRoom

**규격(String, 들어가고자 하는 방 id)**
```string
 503
```

### 8.leaveRoom
* eventname :: leaveRoom
* description :: 방에서 나감
* server-response :: resLeaveRoom

**규격(String, 나가고자 하는 방 id)**
```string
 503
```

## #2. emit(Receive) :: Server to Client

**규격(String, 소켓ID)**
```string
  _foPKdcjQVfvmuERAAAA
```

### 1.sendUserInfo
* eventname :: sendUserInfo
* description :: (클라이언트에서 전달한 토큰값에 해당하는 유저가 있을 경우) 유저 정보를 클라이언트로 리턴

**규격(json, User 정보 Object)**
```json
{
"user": {
    "id": 4,
    "name": "김두한",
    "token" : "foPKdcjQVfvmuERAAAAfoPKdcjQVfvmuERAAAA",
  }
}
```

### 2.authFail
* eventname :: authFail
* description :: (클라이언트에서 전달한 토큰값에 해당하는 유저가 '없을' 경우) 실패 알림

### 3.chatMessage
* eventname :: chatMessage
* description :: 클라이언트로 채팅 메시시 송신

**규격**
```json
{
  "user": {
    "id": 4,
    "name": "김두한"
  },
  "outputs": [
    {
      "simpleText": {
        "text": "이보시게 심영이 나 김두한이야."
      }
    },
    {
      "simpleText": {
        "text": "왜 왔는지 알겠나??"
      }
    }
  ]
}
```

### 4.userList
* eventname :: userList
* description :: 유저 목록. 유저의 접속, 연결 해제가 있을때마다 송신

**규격(Sample)**
```json
[
  {
    "id": "_foPKdcjQVfvmuERAAAA",
    "name": "김두한"
  },
  {
    "id": "-9Am1IJi2LNiFRvpAAAB",
    "name": "심영"
  },
      {
    "id": "MNTFNyI6MEbSOHo4AAAA",
    "name": "의사양반"
  },    
]
```

### 5.roomList
* eventname :: roomList
* description :: 개설된 방 목록

**규격(Sample)**
```json
[
  {
    "id": 1,
    "name": "종로 우미관",
  },
  {
    "id": 2,
    "name": "중앙극장",
  },
      {
    "id": 3,
    "name": "백병원 중환자실",
  },    
]
```

### 6.resNewRoom
* eventname :: resNewRoom
* description :: 개설된 방 정보 전달

**규격(Sample)**
```json
{
  "id": 3,
  "name": "백병원 중환자실",
},
```

### 7.resJoinRoom
* eventname :: resJoinRoom
* description :: 참여한 방 정보 전달

**규격(Sample)**
```json
{
  "id": 3,
  "name": "백병원 중환자실",
},
```

### 8.resLeaveRoom
* eventname :: resLeaveRoom
* description :: 나가진 방 정보 전달

**규격(Sample)**
```json
{
  "id": 3,
  "name": "백병원 중환자실",
},
```