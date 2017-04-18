var last_id = -1;
var notiSound = new Audio('noti.mp3');

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
    addChatLog(-1, null, message);
}

function addChatLog(id, username, message) {
    // @DOBA: do something if recieve a [message]
    message = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    if ($('.scroll:last-of-type').visible()) {
        scrollToBottom();
    }
    if (username === null) {
        $('#chatlog').append('<div class="scroll bubble me">' + message + '</div>');
    } else {
        var innerMessage = '<div class="bubble other">' + message + '</div>';
        if (id == last_id) {
            var innerUser = '';
        } else {
            var innerUser = '<div class="other-name">' + username + '</div>';
        }
        $('#chatlog').append(
            '<div class="scroll bub-other-group">' + innerUser + innerMessage + '</div>'
        );
        if (!document.hasFocus()) {
            notiSound.play();
        }
    }
    console.log('Message received: ' + message);
    return id;
}

function ready(ws, username, roomname) {
    $('#chatform').submit(function(e) {
        e.preventDefault();
        sendMessage(ws);
        last_id = -1;
    });
    app.loggedIn = true;
    app.typeHere = 'Type and press enter to send';
    $('input#chat').focus();
}

function listen(ws, username, roomname, message) {
    // do something when receive message
    console.log(message);
    var json = JSON.parse(message);
    if (json.type == 'message') {
        // plain message
        last_id = addChatLog(json.id, json.username, json.message);
    } else if (json.type == 'online') {
        // online users status
        var notification = document.querySelector('.mdl-js-snackbar');
        if ('added' in json && json.added != username) {
            // do something if user added
            notification.MaterialSnackbar.showSnackbar({
                message: json.added + ' joined the room'
            });
        }
        if ('removed' in json) {
            // do something if user removed
            notification.MaterialSnackbar.showSnackbar({
                message: json.removed + ' left the room'
            });
        }
        app.online = json.users;
    } else if (json.type == 'login') {
        // login verification
        if (json.iserror) {
            // display login error
            var notification = document.querySelector('.mdl-js-snackbar');
            notification.MaterialSnackbar.showSnackbar({
                message: json.errormsg
            });
            throw json.errormsg;
        } else {
            console.log('Logged in!')
            ready(ws, username, roomname);
        }
    } else {
        console.log('invalid server response')
    }

}

function login(ws, username, roomname) {
    var data = {
        username: username
    }
    ws.send(JSON.stringify(data));
}

var config;

$.getJSON('config.json', function(response){
   config = response;
   console.log(config);
})
