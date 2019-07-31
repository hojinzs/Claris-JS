# Socket io 이벤트 이름 정의


## #1. on(Send) (client -> server)

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



## 2. emit(Receive) (server -> client)

### 1.userSocketId
* eventname :: userSocketId
* description :: 접속자 socket id 리턴

**규격(String, 소켓ID)**
```string
  _foPKdcjQVfvmuERAAAA
```

### 2.sendUserInfo
* eventname :: returnUserInfo
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

### 3.authFail
* eventname :: authFail
* description :: (클라이언트에서 전달한 토큰값에 해당하는 유저가 '없을' 경우) 실패 알림

### 4.chatMessage
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

### 5.userList
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