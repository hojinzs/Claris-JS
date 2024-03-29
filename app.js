var express = require('express');
var app = express();

var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = 3001;


// /dist, /public 폴더를 스태틱 폴더로 지정
app.use('/dist', express.static('dist'));

////////////////////////
/// Route Setting
////////////////////////

//  root 라우팅
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/view/index.html');
});

////////////////////////
/// Chatting Setting
////////////////////////

// 채팅 내용 포맷팅용 미들웨어 (간단하게 메시지 JSON을 보내고, 받은 내용을 파싱하여 객체화 하는 역할, 클라이언트와 공유)
const MsgParser = require('./static/messageHelper');

// 유저 정보 저장, 검색, 사용용 미들웨어
const User = require('./middleware/user');
let UserList = new User;

// 기타 (나중에 활용하려고 모아둠)
let userMessage = new Array(),
    userSocketId = null;

////////////////////////
/// Socket io Setting
////////////////////////
io.on('connection', function (socket) {

    // (소켓 열림) 유저 아이디를 소켓아이디로 설정
    let userSocketId = socket.id;
    console.log('a user (',userSocketId,') was connected');

    // 유저 아이디 전달
    io.emit('userSocketId', userSocketId);

    // // (테스트용) 사람이 오면 일단 테스트 메시지를 일단 날려본다. (어서오시게 두한이)
    // function fourDollor(){
    //     let fourDollor = new MsgParser;
    //     return fourDollor.forDollor();        
    // }
    // io.emit('chatMessage',fourDollor());

    // 유저 정보 설정
    socket.on('setUserInfo', function (data) {
        UserList.Add({
            "id" : userSocketId,
            "name" : data
        })
        let msg = new MsgParser;
        io.emit('chatMessage',msg.setSystemMessage("닉네임은 '"+data+"' 님이 접속하셨습니다."));

        // 로깅 (닉네임 세팅)
        console.log('a user ('+userSocketId+') set nickname -> '+ data+' (live user :'+UserList.Connections +')');
    });

    // 유저가 메시지를 보냈을 때
    socket.on('chatMessage', function (msg) {
        let res = new MsgParser;
        let user = UserList.getUserById(userSocketId);
        io.emit('chatMessage',res.setSimpleText(user,msg));

        // 로깅
        console.log(user.name+'('+user.id+') :: '+ msg);
    });

    // 유저 디스커텍트
    socket.on('disconnect', function () {

        // 유저 배열에서 유저 삭제
        UserList.Del(userSocketId);

        // 로깅
        console.log('a user (',userSocketId,') disconnected (live user :'+UserList.Connections+')'); //서버 로그에 disconnect 메시지 표시
    });
});

http.listen(port, function () {
    console.log(`listening on *:${port}`);
});