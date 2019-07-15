// Claris Chat 메인 객체
const Claris = function(){
    this.log = [];
    this.socket = "";
    this._userNickname = "";
}

// 채팅 시작
Claris.prototype.on = function(){
    let myClaris = this;
    myClaris.socket = io();

    this.socket.on('chat message',function(msg){
        myClaris.ReciveChat(msg);
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
Claris.prototype.ReciveChat = function(msg){
    let nickname = this._userNickname;
    $('#messages').append($('<li class="red">').text(nickname + ' : ' + msg)); //DOM과 연결된 메시지 목록 배열에 메시지를 추가하는 것으로 수정 예정
}

// 모듈 정상 임포트 완료
console.log("Chat Module 'Claris' was Imported!");