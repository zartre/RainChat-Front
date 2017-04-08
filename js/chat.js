// Message Transmission
function connect(host, port) {
    // connect to server socket
    ws = new WebSocket('ws://' + host + ':' + '8080');
    console.log(ws);
    return ws
}
function sendMessage() {
    // @DOBA: do something when form is submitted
    message = $('#chat').val();
    if (!message) {
        return;
    }
    $('#chat').val('');
    ws.send(message);
    showMessage('me', message);
}
function showMessage(from, message) {
    // @DOBA: do something if recieve a [message]
    $('#chatlog').append('<div class="bubble ' + from + '">' + message + '</div>');
    console.log('Message received:' + message);
    scrollToBottom();
}
ws = connect('52.74.90.15', '8080'); // ec2-host
ws.onopen = function () {
    // @DOBA: do something when connection is established
    $('#chatform').submit(function (e) {
        e.preventDefault();
        sendMessage();
    });
}
ws.onmessage = function (event) {
    showMessage('other', event.data);
}

// Auto-scroll
function scrollToBottom() {
    $('#chatwrap').animate({
        scrollTop: $("#chat-end").offset().top
    }, 150);
}
