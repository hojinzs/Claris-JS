var express = require('express');
var app = express();

var http = require('http').createServer(app);
var io = require('socket.io')(http);
//todo : 접속자정보 저장

var userlist = [];

app.use('/dist',express.static('dist'));
app.use('/public',express.static('public'));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/view/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});