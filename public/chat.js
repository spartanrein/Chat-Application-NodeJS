// connection
var socket = io.connect("http://localhost:5500");

//DOM
var message = document.getElementById('message');
var username = document.getElementById('username');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var typingmessage = document.getElementById('typingmessage');

// Emit
btn.addEventListener('click',function(){
  socket.emit('chat',{
    message:message.value,
    username:username.value
  });
  message.value = "";
});

message.addEventListener('keypress',function(){
  socket.emit('typing',username.value);
});
//listen for events
socket.on('chat',function(data){
  typingmessage.innerHTML ="";
  output.innerHTML +='<p><strong>' +data.username+':</strong>'+data.message+'</p>';
});

socket.on('typing',function(data){
  typingmessage.innerHTML = '<p><em>'+data+'is typing a message...</em></p>';
});
