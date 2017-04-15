$(document).ready(function() {
    var last_id = -1;

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
        if ($('.bubble:last-of-type').visible()) {
            scrollToBottom();
        }
        if (username === null) {
            $('#chatlog').append('<div class="bubble me">' + message + '</div>');
        } else {
            var innerMessage = '<div class="bubble other">' + message + '</div>';
            if (id == last_id) {
                var innerUser = '';
            } else {
                var innerUser = '<div class="other-name">' + username + '</div>';
            }
            $('#chatlog').append(
                '<div class="bub-other-group">' + innerUser + innerMessage + '</div>'
            );
        }
        console.log('Message received: ' + message);
        return id;
    }

    function login(username, roomname) {
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
                    username: app.username,
                    roomname: roomname,
                    is_newroom: 1,
                    has_pass: 0,
                    password: 'password'
                }
                ws.send(JSON.stringify(data));
                console.log(JSON.stringify(data));
            // }
        }
        ws.onmessage = function(event) {
            var json = JSON.parse(event.data);
            if (json.type == "message") {
                last_id = addChatLog(json.id, json.username, json.message);
            } else if (json.type == "online") {
                app.online = json.users;
            }
        }
    }

    $('#login_form').on('submit', function(e) {
        e.preventDefault();
        var username = $('#login__username').val();
        login(username, "global");
    })

});
