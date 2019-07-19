import io from 'socket.io-client';

// Claris Chat 메인 객체
export default class Claris {

    constructor(){
        this.log = [];
        this.socket = "";
        this._userNickname = "";
        this.dialog = "";
        this.socket = io('http://localhost:3000');

        // 모듈 정상 임포트 완료
        console.log("Chat Module 'Claris' was Imported!");
    }

    // 채팅 시작
    on(callbackFn){
        this.receiveCallback = callbackFn;
        let myClaris = this;

        this.socket.on('chatMessage',function(msg){
            myClaris.ReceiveChat(msg);
        });
    }

    // 닉네임 설정 메소드
    setNickname(value){
        this._userNickname = value;
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
    ReceiveChat(msg){
        let nickname = this._userNickname;
        let message = {
            who : nickname,
            value : msg,
        }
        this.receiveCallback(message);
    }
};