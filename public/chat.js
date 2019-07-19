// Claris Chat 메인 객체 (ES6 변환 전 원본 파일)
const Claris = (function(){
    function Claris(){
        this.log = [];
        this.socket = "";
        this._userNickname = "";
        this.dialog = "";
    }

    // 채팅 시작
    Claris.prototype.on = function(callbackFn){
        this.receiveCallback = callbackFn;
        let myClaris = this;
        myClaris.socket = io();

        this.socket.on('chat message',function(msg){
            myClaris.ReceiveChat(msg);
        });
        this.socket.on('userSocketId',function(msg){
            myClaris.ReceiveChat('접속 ::'+msg);
        });
    }

    // 닉네임 설정 메소드
    Claris.prototype.setNickname = function(value){
        this._userNickname = value;
    }

    // 채팅로그 확인 메소드
    Claris.prototype.chatlog = function(){
        return this.log;
    }

    // 메시지 발송 메소드
    Claris.prototype.SendChat = function(message){
        this.socket.emit('chat message', message);
        this.log.push(message);
    }

    // 메시지 송신시 실행 메소드
    Claris.prototype.ReceiveChat = function(msg){
        let nickname = this._userNickname;

        message = {
            who : nickname,
            value : msg,
        }
        this.receiveCallback(message);
    }

    // 모듈 정상 임포트 완료
    console.log("Chat Module 'Claris' was Imported!");

    return Claris;
})();