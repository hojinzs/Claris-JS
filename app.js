var express = require('express');
var app = express();

var http = require('http').createServer(app);
var io = require('socket.io')(http);

//connected user info
let userListArray = new Array(),
    userMessage = new Array(),
    userSocketId = null;

app.use('/dist',express.static('dist'));
app.use('/public',express.static('public'));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/view/index.html');
});
app.get('/test', function(req, res){
  res.sendFile(__dirname + '/view/test.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  //response socketid
  userSocketId = socket.conn.id
  io.emit('userSocketId', userSocketId);
  //get user info(JSON)
  socket.on('setUserInfo', function (data) {
    //set user info to userListArray
    userListArray.push(data);
  });

  console.log('current user count : ' + userListArray.length);

  socket.on('chatMessage', function(msg){
    console.log('message: ' + msg);
    io.emit('chatMessage', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});