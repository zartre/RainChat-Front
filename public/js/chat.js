"use strict";

const FLAG_PEER = 1;
const FLAG_PUBLIC = 2;
const FLAG_MESSAGE = 4;
const FLAG_FROMPEER = 8;
const FLAG_FROMABOVE = 16;
const FLAG_RAIN = 32;
const FLAG_ENCRYPT = 64;
const FLAG_BOT = 128;

var notiSound;

// Auto-scroll
function scrollToBottom() {
    $("#chatlog").scrollTop($("#chatlog")[0].scrollHeight);
}

// Websocket connection
function connect(host, port) {
    // connect to server socket
    var ws = new WebSocket('ws://' + host + ':' + port);
    console.log(ws);
    return ws;
}

function addChatLog(json, message) {
    // @DOBA: do something if recieve a [message]
    message = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    if (!json.flag) {
        // from self
        if (message.charAt(0) === '/') {
            var command = message.split(' ')
            message = message.substr(command[0].length);
            console.log(command);
            // is command
            if (command[0] === '/public') {
                // message published
                $('#chatlog').append('<div class="b bubble me">Message public: ' + message + '</div>');
            }
            else if (command[0] === '/rain') {
                // rain triggered
                createRain();
                console.log('Raining');
            } else {
                console.log('Command not found');
                $('<div/>', {
                    class: 'notification-log',
                    text: 'Command not found'
                }).appendTo('#chatlog');
            }
        } else {
            // echo message to self
            $('#chatlog').append('<div class="b bubble me">' + message + '</div>');
        }
        scrollToBottom();
    } else {
        // from other
        var innerMessage = '<div class="bubble other">' + message + '</div>';
        var innerUser;
        if (json.flag & FLAG_MESSAGE) {
            // message
            if (json.id === app.last_id) {
                innerUser = '';
            } else {
                if (json.flag & FLAG_FROMPEER) {
                    console.log("is peer");
                    innerUser = $('<div/>', {
                        class: 'other-name',
                        text: json.username
                    }).prop('outerHTML');;
                } else if (json.flag & FLAG_FROMABOVE) {
                    console.log("is above");
                    innerUser = $('<div/>', {
                        class: 'other-name',
                        text: json.username +  ' (public from ' + json.roomname + ')'
                    }).prop('outerHTML');;
                    innerUser = '<div class="other-name">' + json.username +  ' (public from ' + json.roomname + ')</div>';
                } else if (json.flag & FLAG_BOT) {
                    console.log("is bot");
                    innerUser = $('<div/>', {
                        class: 'other-name',
                        text: "rainyBot"
                    }).prop('outerHTML');
                }
            }
        } else if (json.flag & FLAG_RAIN) {
            // rain triggered
            createRain();
            console.log('Raining');
            return app.last_id;
        }
        console.log('flag: ' + json.flag);
        $('#chatlog').append(
            '<div class="b bub-other-group">' + innerUser + innerMessage + '</div>'
        );
        if ($('.b:last-child').visible()) {
            scrollToBottom();
        }
        if (!document.hasFocus()) {
            notiSound.play();
            app.setNotification(app.notification.count + 1);
        }
    }
    return json.id;
}

function sendMessage(ws) {
    // @DOBA: do something when form is submitted
    var message = $('#chat').val();
    if (!message) {
        return;
    }
    if (message === '/exit') {
        location.reload();
    }
    $('#chat').val('');
    ws.send(message);
    message = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var json = {
        id: 0,
        username: app.username,
        flag: 0
    }
    app.last_id = addChatLog(json, message);
}

function ready(ws, username, roomname) {
    $('#chatform').submit(function(e) {
        e.preventDefault();
        sendMessage(ws);
    });
    app.loggedIn = true;
    app.typeHere = 'Type and press enter to send';
    $('input#chat').focus();
}

function listen(ws, username, roomname, message) {
    // do something when receive message
    console.log(message);
    var json = JSON.parse(message);
    if (json.type === 'message') {
        // plain message
        json.roomname = json.roomname.split('.').slice(0, -2);
        app.last_id = addChatLog(json, json.message);
    } else if (json.type === 'online') {
        // online users status
        console.log(json);
        // var notification = document.querySelector('.mdl-js-snackbar');
        if ('added' in json && json.added != username) {
            // do something if user added
            $('<div/>', {
                class: 'notification-log',
                text: json.added + ' joined the room'
            }).appendTo('#chatlog');
        }
        if ('removed' in json) {
            // do something if user removed
            $('<div/>', {
                class: 'notification-log',
                text: json.removed + ' left the room'
            }).appendTo('#chatlog');
        }
        app.online = json.users;
    } else if (json.type === 'login') {
        // login verification
        if (json.iserror) {
            // display login error
            app.loginErrMsg = json.errormsg;
            throw json.errormsg;
        } else {
            console.log('Logged in!')
            ready(ws, username, roomname);
        }
    } else if (json.type === 'rooms') {
        console.log(json)
    } else {
        console.log('invalid server response')
    }

}

function login(ws, username, roomname) {
    var data = {
        username: username
    }
    console.log(JSON.stringify(data));
    ws.send(JSON.stringify(data));
}

// Vue

var app = new Vue({
    el: '#app',
    data: {
        title: 'Rainy.Chat',
        ws: null,
        login_count: 0,
        loggedIn: false,
        loginErrMsg: '',
        username: '',
        room: '',
        drawerOpen: false,
        menuOpen: false,
        inputBox: 'Please log in first',
        night: false,
        nightText: "Night mode",
        online: [],
        config: {},
        notification: {
            count: 0
        },
        last_id: -1
    },
    methods: {
        onlineList: function() {
            var rawJson = '{ "type": "online", "count": 0, "users": []}';
            var parsedJson = JSON.parse(rawJson);
            this.online = parsedJson.users;
        },
        checkLogin: function() {
            if (!this.username) {
                this.loginErrMsg = 'Please enter a display name';
            } else if (this.username) {
                this.login_count++;
                if (this.login_count === 1) {
                    this.ws = connect(this.config.host, this.config.port); // local
                    this.ws.onopen = function() {
                        login(app.ws, app.username, "global");
                    };
                    this.ws.onmessage = function(event) {
                        listen(app.ws, app.username, app.roomname, event.data);
                    }
                    this.ws.onclose = function() {
                        window.location.reload(false);
                    }
                    this.inputBox = 'Type here';
                    setTimeout(function() {
                        $('#chat').focus();
                    }, 100);
                } else {
                    login(this.ws, this.username, "global");
                }
            }
        },
        toggleNight: function() {
            this.night = !this.night;
            if (this.night === false) {
                this.nightText = 'Night mode';
                $('meta[name="theme-color"]').attr('content', '#0267ff');
                $('body').css('background-color', '#FFF');
            } else {
                this.nightText = 'Normal';
                $('meta[name="theme-color"]').attr('content', '#000');
                $('body').css('background-color', '#000');
            }
        },
        setNotification: function(value) {
            this.notification.count = value;
            var noti;
            if (value) {
                noti = '(' + this.notification.count + ') '
            } else {
                noti = ''
            }
            document.title = noti + this.title;
        }
    }
});

$(document).ready(function() {
    notiSound = new Audio('noti.mp3');

    // get configuration
    $.getJSON('config.json', function(response) {
        app.config = response;
        console.log(app.config);
    })

    window.onfocus = function() {
        app.setNotification(0);
    };
});

$('html').click(function(e) {
    if(e.target.id != "more") {
        app.menuOpen = false;
   }
});
