// Auto-scroll
function scrollToBottom() {
    $("#chatwrap").scrollTop($("#chatlog")[0].scrollHeight);
}

// Websocket connection
function connect(host, port) {
    // connect to server socket
    var ws = new WebSocket('ws://' + host + ':' + port);
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
    message = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    addChatLog(null, message);
}
function addChatLog(username, message) {
    // @DOBA: do something if recieve a [message]
    if ($('.bubble:last-of-type').visible()) {
        scrollToBottom();
    }
    if (username === null) {
        $('#chatlog').append('<div class="bubble me">' + message + '</div>');
    } else {
        $('#chatlog').append(
            '<div class="bub-other-group"><div class="other-name">' +
            username +
            '</div><div class="bubble other">' +
            message +
            '</div></div>'
        );
    }
    console.log('Message received:' + message);
}
function login(ws, username, roomname) {
    // init websocket connection
    // var ws = connect('52.74.90.15', '8080'); // ec2-host
    var ws = connect('0.0.0.0', '8080'); // ec2-host
    ws.onopen = function() {
        // @DOBA: do something when connection is established
        $('#chatform').submit(function(e) {
            e.preventDefault();
            sendMessage(ws);
        });
        // login prerequisite
        // while (1) {
            var data = {
                username: $('#login__username').val(),
                roomname: $('#login__room_id').val(),
                is_newroom: 1,
                has_pass: 0,
                password: 'password'
            }
            ws.send(JSON.stringify(data));
        // }
    }
    ws.onmessage = function(event) {
        var json = JSON.parse(event.data);
        addChatLog(json.username, json.message);
    }
}

login();
