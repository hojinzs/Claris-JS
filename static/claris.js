import io from 'socket.io-client';

// Claris Chat 메인 객체
export default class Claris {

    constructor(){
        this.log = [];
        this.socket = io('http://localhost:3000');
        this.socket_id = '',
        this.user = {
            id: undefined,
            name: undefined,
        };

        // 모듈 정상 임포트 완료
        console.log("Chat Module 'Claris' was Imported!");
    }

    // 채팅 시작. 서버에서 받을 메시지 이벤트를 이곳에 정의
    on(callbackFn){
        this.receiveCallback = callbackFn;
        let myClaris = this;

        // 첫번째 연결
        this.socket.on('connect',function(){
            console.log("SOCKET ID:::",myClaris.socket.id);
            myClaris.socket_id = myClaris.socket.id
        })

        // // (이벤트 이름 : chatMessage) 접속시 유저 소켓아이디를 저장한다.
        // this.socket.on('userSocketId',function(rec){
        //     myClaris.socket_id = rec;
        //     console.log('set ID is ::', myClaris.socket_id);
        // });

        // (이벤트 이름 : chatMessage) 서버에서 채팅 메시지를 받을때마다 실행할 이벤트
        // 외부에서 CallbackFn을 받아 'chatMessage'를 받을때마다 콜백을 보낸다.
        this.socket.on('chatMessage',function(msg){
            myClaris.ReceiveChat(msg);
        });
    }

    // 닉네임 설정 메소드
    setNickname(value){
        this.socket.emit('setUserInfo', value); // 서버에 사용할 닉네임을 통보함

        let socket_id = this.socket_id;
        this.user = {
            id: socket_id,
            name: value,
        };
    }

    // 채팅로그 확인 메소드
    chatlog(){
        return this.log;
    }

    // 메시지 발송 메소드
    SendChat(message){
        this.socket.emit('chatMessage', message);
        this.log.push(message);
    }

    // 메시지 송신시 실행 메소드
    ReceiveChat(message){
        // let nickname = this._userNickname;
        // let message = {
        //     who : nickname,
        //     value : msg,
        // }
        this.receiveCallback(message);
    }
};