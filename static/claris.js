import io from 'socket.io-client';

// Claris Chat 메인 객체
export default class Claris {

    constructor(){
        this.socket = io('http://localhost:3000');
        this.callbackFn = {}; //콜백 함수 정의
        this.log = []; // 채팅 로그
        this.user = { // 사용자 정보
            id: undefined,
            name: undefined,
        };
        this.userList = []; // 회원 목록

        // 모듈 정상 임포트 완료
        console.log("Chat Module 'Claris' was Imported!");
    }

    /**
     * 채팅 시작. 서버에서 이벤트 메시지 수신시 받을 콜백 함수 정의
     * @param {chatMessage : Function, userList: Function} callbackFn 
     */
    on(callbackFn = {
        chatMessage : Function,
        userList : Function,
    }){
        this.callbackFn.chatMessage = callbackFn.chatMessage;
        this.callbackFn.userList = callbackFn.userList;
        
        let myClaris = this;

        /**
         * (이벤트 이름 : connect)첫번째 연결. 소켓 아이디를 확인한다.
         */
        this.socket.on('connect',function(){
            console.log("SOCKET ID:::",myClaris.socket.id);
            myClaris.log.push("SOCKET ID :"+myClaris.socket.id)
        })

        /**
         * (이벤트 이름 : chatMessage) 서버에서 채팅 메시지를 받을때마다 실행할 이벤트
         * type : json
         */
        this.socket.on('chatMessage',function(msg){
            myClaris.callbackFn.chatMessage(msg);
            myClaris.log.push(msg);
        });

        /**
         * (이벤트 이름 : userList) 유저 접속, 연결해제시 서버에서 보내오는 유저 리스트
         * type : json
         */
        this.socket.on('userList',function(msg){
            myClaris.userList = msg;
            myClaris.callbackFn.userList(msg);
            myClaris.log.push(msg);
        });
    }

    // 닉네임 설정 메소드
    setNickname(value){
        this.socket.emit('setUserInfo', value); // 서버에 사용할 닉네임을 통보함

        let socket_id = this.socket.id;
        this.user = {
            id: socket_id,
            name: value,
        };
    }

    // 메시지 발송 메소드
    SendChat(message){
        this.socket.emit('chatMessage', message);
        this.log.push(message);
    }

    // 로그 확인 메소드
    getLog(){
        return this.log;
    }
};