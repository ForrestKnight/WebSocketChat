// Make connection
var socket = io.connect('http://localhost:9000');

// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

// Emit events (upon click, emit to chat the message and handle)
btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

// Attach event listener to message input field
message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})

// get existing messages
socket.on('initial-connection', function(messages) {
	for(var m of messages) {
		appendMessage(m);
	}
});

// Listen for events
socket.on('chat', appendMessage);

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

function appendMessage(data) {
	feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
}