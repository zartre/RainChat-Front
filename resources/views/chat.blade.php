<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta property="og:image" content="{{ asset('img/ogimage.jpg') }}">
    <meta name="description" content="A text-messaging service that focuses on anonymity.">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('favicon/apple-touch-icon.png') }}">
    <link rel="icon" type="image/png" href="{{ asset('favicon/favicon-32x32.png') }}" sizes="32x32">
    <link rel="icon" type="image/png" href="{{ asset('favicon/favicon-16x16.png') }}" sizes="16x16">
    <link rel="manifest" href="{{ asset('favicon/manifest.json?v=1.0') }}">
    <link rel="mask-icon" href="{{ asset('favicon/safari-pinned-tab.svg') }}" color="#5bbad5">
    <link rel="shortcut icon" href="{{ asset('favicon/favicon.ico') }}">
    <meta name="msapplication-config" content="{{ asset('favicon/browserconfig.xml?v=1.0') }}">
    <meta name="theme-color" content="#0267ff">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <title>Rainy.Chat</title>
    <link rel="stylesheet" href="{{ asset('css/chat.css') }}">
    <link rel="stylesheet" href="{{ asset('css/rain-min.css') }}">
    {{-- <script src="https://unpkg.com/vue"></script> --}}
    <script src="{{ asset('js/vue.min.js') }}"></script>
</head>

<body>
    <div id="app" style="height:100%;">
        @if (substr(url('/'), -3, 3) == 'dev')
            <div style="position: absolute; left: 20px; bottom: 20px; z-index: 10">
            Development Mode<br>
            url: {{ url('/') }}<br>
            room: {{ $room }}<br>
            host: @{{ config.host }}<br>
            port: @{{ config.port }}
            </div>
        @endif
        <div class="modal" v-if="!loggedIn">
            <form class="box" id="login_form" v-on:submit.prevent>
                <img src="{{ asset('img/i-user.svg') }}" alt="Room" class="no-drag">
                <h1 class="no-drag">Enter a display name</h1>
                <input type="text" placeholder="Display name" v-model="username" autofocus required>
                <label v-bind:class="{active: loginErrMsg}" class="no-drag">@{{ loginErrMsg }}</label>
                <button class="styled no-drag" type="submit" v-if="username" @click="checkLogin">Log in</button>
                @if (substr(url('/'), -3, 3) == 'dev')
                    <button class="styled no-drag" v-if="!username" onclick="window.open('http://rainy.dev', '_self')">Change room</button>
                @else
                    <button class="styled no-drag" v-if="!username" onclick="window.open('http://rainy.chat', '_self')">Change room</button>
                @endif
            </form>
        </div>
        <section class="rain"></section>
        <div class="drawer" v-bind:class="{active: drawerOpen, night: night}">
            <img src="{{ asset('img/sidebar-white.png') }}" alt="RainyChat" class="logo no-drag">
            <div class="welcome no-drag" v-if="loggedIn">
                Welcome,<br>
                @{{ username }}
            </div>
            <div class="online no-drag">
                <div class="heading">
                    Online users
                </div>
                <div class="user" v-for="person in online">@{{ person }}</div>
            </div>
        </div>
        <div class="drawer-bg" v-bind:class="{active: drawerOpen}" @click="drawerOpen=false"></div>
        <div class="content" v-bind:class="{night: night}">
            <header>
                <img src="{{ asset('img/i-menu.svg') }}" alt="menu" class="icon no-drag" id="menu" @click="drawerOpen=true">
                <div class="room-name no-drag">
                    {{ $room }}
                </div>
                <img src="{{ asset('img/i-more.svg') }}" alt="menu" class="icon no-drag" id="more" @click="menuOpen=!menuOpen">
                <div class="menu" v-bind:class="{active: menuOpen}">
                    <a href="#" @click="toggleNight()">@{{ nightText }}</a>
                    <a href="{{ url('http://rainy.dev/dev') }}" target="_blank">Join more</a>
                    <a href="#" onclick="window.reload(false)">Logout</a>
                </div>
            </header>
            <div class="chat-wrap" id="chatlog">
                {{-- chats are here --}}
            </div>
            <form class="chat-box" id="chatform" autocomplete="off">
                <input type="text" v-bind="{placeholder: inputBox, disabled: !loggedIn}" id="chat" name="command" maxlength="400">
                <button type="submit" class="submit-btn" v-if="loggedIn && username">
                    <img src="{{ asset('img/i-send.svg') }}" alt="Send">
                </button>
            </form>
        </div>
    </div>
    <script src="{{ asset('js/jquery.min.js') }}"></script>
    <script src="{{ asset('js/visible.min.js') }}"></script>
    <script src="{{ asset('js/chat-min.js?v=1.2') }}"></script>
    <script src="{{ asset('js/rain-min.js?v=1.2') }}"></script>
</body>

</html>
