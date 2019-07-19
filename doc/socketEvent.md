# Socket io 이벤트 이름 정의


## on(Send) (client -> server)

### 1.connection
* eventname :: connection 
* description :: 사용자 접속

### 2.setUserInfo
* eventname :: setUserInfo
* description :: 접속자 정보(이름) 세팅

### 3.chatMessage
* eventname :: chatMessage
* description :: 서버로 입력 메시지 송신

## emit(Receive) (server -> client)

### 1.userSocketId
* eventname :: userSocketId
* description :: 접속자 socket id 리턴

### 2.chatMessage
* eventname :: chatMessage
* description :: 클라이언트로 채팅 메시시 송신

*규격*

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

