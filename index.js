var express = require('express');
var socket = require('socket.io');
//App setup
var app = express();
var server = app.listen(5500,function(){
  console.log('waiting for request on port 5500');
});

//Static Files
app.use(express.static('public'));

//socket setup
var io = socket(server);

io.on('connection',function(socket){
  console.log('socket connection established',socket.id)

  socket.on("chat",function(data){
    io.sockets.emit('chat',data);
  });

  socket.on('typing',function(data){
    socket.broadcast.emit('typing',data);
  });
});
