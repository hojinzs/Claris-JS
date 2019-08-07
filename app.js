var express = require('express');
var app = express();

var http = require('http').createServer(app);
var io = require('socket.io')(http);

var isConnected = true;

// /dist, /public 폴더를 스태틱 폴더로 지정
app.use('/dist', express.static('dist'));

////////////////////////
/// Initialize0
////////////////////////
const Common = require('./middleware/common');
let init = new Common;

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
const UserList = require('./middleware/user')();

// 기타 (나중에 활용하려고 모아둠)
let userMessage = new Array(),
    userSocketId = null;

////////////////////////
/// Socket io Setting
////////////////////////
io.on('connection', function (socket) {

    // (소켓 열림) 유저 아이디를 소켓아이디로 설정
    let userSocketId = socket.id;
    console.log('a user (socktid : ',userSocketId,') was connected');

    /**
     * SocketIo Event Name :: setUserInfo
     * 클라이언트에서 유저 정보 세팅을 요청
     */
    socket.on('setUserInfo', function (data) {
        let newUser = UserList.Add({
            "socketid" : userSocketId,
            "name" : data,
        })
        let msg = new MsgParser;
        io.emit('chatMessage',msg.setSystemMessage("닉네임은 '"+data+"' 님이 접속하셨습니다."));

        // 해당 사용자에게 토큰값 전달
        io.to(newUser.socketid).emit('sendUserInfo', newUser);

        //사용자정보를 client로 전송
        io.emit('userList', UserList.List);

        // 로깅 (닉네임 세팅)
        console.log('a user ('+userSocketId+') set nickname -> '+ data+' , token ->',newUser.token,'(live user :'+UserList.Connections +')');
    });

    /**
     * SocketIo Event Name :: getUserInfo
     * 클라이언트에서 발급받은 토큰으로 이전에 접속한 유저 정보를 요청
     */
    socket.on('getUserInfo', function(data) {

        // 기존에 해당 토큰으로 연결된 소켓이 있다면, 접속을 끊는다.
        if(ConnUser = UserList.getUserByToken(data)){
            io.to(ConnUser.socketid).emit('disconnect');
        }

        let token = data,
            reSocketId = socket.id,
            reConnUser = UserList.Connect(token, reSocketId);

        io.to(reSocketId).emit('sendUserInfo', reConnUser);

        //접속된 사용자 정보를 UserList로 전송
        io.emit('userList', UserList.List);
    });

    /**
     * SocketIo Event Name :: chatMessage
     * 클라이언트에서 메시지를 발신함
     */
    socket.on('chatMessage', function (msg) {
        let res = new MsgParser;
        let user = UserList.getUserBySocketId(userSocketId);
        io.emit('chatMessage',res.setSimpleText(user,msg));

        // 로깅
        console.log(user.name+'('+user.id+') :: '+ msg);
    });

    /**
     * SocketIo Event Name :: disconnect
     * 클라이언트의 접속이 끊김
     */
    socket.on('disconnect', function () {
        // 해당 유저의 상태를 DISCONNECT로 바꾸고 유저 정보를 가져옴
        let user = UserList.Disconnect(userSocketId);

        // 메모리의 유저 목록에 등록된 사용자의 접속이 끊겼을 경우, 안내 메시지를 보냄
        if(user != null){
            let msg = new MsgParser;
            io.emit('chatMessage',msg.setSystemMessage("'" + user.name + "' 님이 퇴장하셨습니다."));
        }

        // 변동된 유저 목록을 모두에게 전달
        io.emit('userList', UserList.List);

        // 로깅
        console.log('a user (',userSocketId,') disconnected (live user :'+UserList.Connections+')'); //서버 로그에 disconnect 메시지 표시
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});