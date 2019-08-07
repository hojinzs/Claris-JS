import io from 'socket.io-client';

/**
 * 채팅 컨트롤러 객체
 */
export default class Claris {

    /**
     * 채팅 시작
     * @param {Object} _callbackFn 이벤트 수신 콜백 함수 세팅
     */
    constructor(_callbackFn = {
        _setUser : Function,
        _chatMessage : Function,
        _userList : Function,
        _connectLost : Function,
    }){
        this.socket = io('http://localhost:3000');

        // 콜백 함수 정의
        this.callbackFn = {
            setUser : _callbackFn._setUser,
            chatMessage : _callbackFn._chatMessage,
            userList : _callbackFn._userList,
            connectLost : _callbackFn._connectLost,
        };

        // 연결 상태
        this.connect = 0;

        // 사용자 정보
        this.user = { // 사용자 정보
            id: undefined,
            name: undefined,
            token : undefined,
        };

        // 접속자 정보 배열
        this.userList = [];
        
        // 채팅 로그
        this.log = [];
        
        //////////////////////////
        // 리스닝 이벤트 등록 시작
        //////////////////////////
        let myClaris = this;

            /**
             * (이벤트 이름 : connect)첫번째 연결. 소켓 아이디를 확인한다.
             */
            this.socket.on('connect',function(){
                console.log("SOCKET ID:::",myClaris.socket.id);
                this.connect = 1;
                myClaris.log.push("SOCKET ID :"+myClaris.socket.id)

                // 로컬 스토리지에 유저 토큰이 있다면, 해당 토큰으로 접속 시도
                let CurrentToken = localStorage.getItem('userToken');
                if(CurrentToken != undefined){
                    console.log('Get User Info use Current Token!!')
                    myClaris.getUserInfo(CurrentToken);
                }
            })

            /**
             * (이벤트 이름 : sendUserInfo) 서버에서 토큰을 포함한 유저 정보를 할당 받을때마다 실행할 이벤트
             */
            this.socket.on('sendUserInfo',function(rsp){
                myClaris.log.push(rsp); // 로깅

                if(rsp == null) return; //유저 정보가 아무것도 안왔다면 그냥 return

                myClaris.user = {
                    id: rsp.id,
                    name: rsp.name,
                    token: rsp.token,
                };

                // 유저 토큰을 웹스토리지에 저장
                localStorage.setItem('userToken',myClaris.user.token);

                // 유저 설정 완료 후 콜백 호출
                myClaris.callbackFn.setUser(myClaris.user);
            });

            /**
             * (이벤트 이름 : chatMessage) 서버에서 채팅 메시지를 받을때마다 실행할 이벤트
             * type : json
             */
            this.socket.on('chatMessage',function(msg){
                myClaris.log.push(msg); // 로깅

                myClaris.callbackFn.chatMessage(msg);
            });

            /**
             * (이벤트 이름 : userList) 유저 접속, 연결해제시 서버에서 보내오는 유저 리스트
             * type : json (User Object Array)
             */
            this.socket.on('userList',function(msg){
                myClaris.log.push(msg); // 로깅

                // 유저리스트를 정렬한다. (Live 우선, id 빠른 순 우선)
                let sortedList = msg.sort(function(a, b) {
                    var o1 = b['connect'];
                    var o2 = a['connect'];
                    var p1 = a['id'];
                    var p2 = b['id'];
                
                    if (o1 < o2) return -1;
                    if (o1 > o2) return 1;
                    if (p1 < p2) return -1;
                    if (p1 > p2) return 1;
                
                    return 0;
                });

                myClaris.userList = sortedList;
                myClaris.callbackFn.userList(sortedList);
            });

            this.socket.on('disconnect',function(){
                this.connect = 0;
                console.log("SOCKET Lost");

                myClaris.callbackFn.connectLost();

            })

            //////////////////////////
            // 리스닝 이벤트 등록 종료
            //////////////////////////

        // 모듈 정상 임포트 완료
        console.log("Chat Module 'Claris' was Imported!");
    }

    // 닉네임 설정 메소드
    setNickname(value){
        this.socket.emit('setUserInfo', value); // 서버에 사용할 닉네임을 통보함
    }


    /**
     * 토큰값을 이용해 기존에 받아온 유저 정보를 가져옴
     * @param {String} _token 로컬 스토리지에서 받아온 토큰값
     */
    getUserInfo(_token){
        this.socket.emit('getUserInfo', _token); // 서버에 사용할 닉네임을 통보함
    }

    // 메시지 발송 메소드
    SendChat(message){
        this.log.push(message); // 로깅

        this.socket.emit('chatMessage', message);
    }

    // 로그 확인 메소드
    getLog(){
        return this.log;
    }
};