// Auto-scroll
function scrollToBottom() {
    $('#chatwrap').animate({
        scrollTop: $("#chat-end").offset().top
    }, 150);
}

// Websocket connection
function connect(host, port) {
    // connect to server socket
    var ws = new WebSocket('ws://' + host + ':' + '8080');
    console.log(ws);
    return ws;
}
function sendMessage(ws) {
    // @DOBA: do something when form is submitted
    message = $('#chat').val();
    if (!message) {
        return;
    }
    $('#chat').val('');
    ws.send(message);
    addChatLog(null, message);
}
function addChatLog(username, message) {
    // @DOBA: do something if recieve a [message]
    if (username === null) {
        $('#chatlog').append('<div class="bubble me">' + message + '</div>');
    } else {
        $('#chatlog').append('<div class="bubble other">' + username + ": " + message + '</div>');
    }
    console.log('Message received:' + message);
    scrollToBottom();
}
function login(ws, username, roomname) {
    // init websocket connection
    var ws = connect('52.74.90.15', '8080'); // ec2-host
    ws.onopen = function() {
        // @DOBA: do something when connection is established
        $('#chatform').submit(function(e) {
            e.preventDefault();
            sendMessage(ws);
        });
        // login prerequisite
        var data = {
            username: $('#login__username').val(),
            roomname: "AnonymousRoom"
        }
        ws.send(JSON.stringify(data));
    }
    ws.onmessage = function(event) {
        var json = JSON.parse(event.data);
        addChatLog(json.username, json.message);
    }
}

login();
