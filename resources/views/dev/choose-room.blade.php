<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=no">
    <meta property="og:image" content="{{ asset('img/ogimage.jpg') }}">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('favicon/apple-touch-icon.png') }}">
    <link rel="icon" type="image/png" href="{{ asset('favicon/favicon-32x32.png') }}" sizes="32x32">
    <link rel="icon" type="image/png" href="{{ asset('favicon/favicon-16x16.png') }}" sizes="16x16">
    <link rel="manifest" href="{{ asset('favicon/manifest.json?v=1.0') }}">
    <link rel="mask-icon" href="{{ asset('favicon/safari-pinned-tab.svg') }}" color="#5bbad5">
    <link rel="shortcut icon" href="{{ asset('favicon/favicon.ico') }}">
    <meta name="msapplication-config" content="{{ asset('favicon/browserconfig.xml?v=1.0') }}">
    <meta name="theme-color" content="#00b8ff">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <link rel="stylesheet" href="{{ asset('css/choose-room.css') }}">
    <title>Rainy.Chat</title>
    <script src="{{ asset('js/vue.min.js') }}"></script>
</head>

<body>
    <div id="app" style="height:100%;">
        <div class="modal">
            <form class="box" id="login_form" v-on:submit.prevent>
                <img src="{{ asset('img/i-home.svg') }}" alt="Room">
                <h1>Enter a room name</h1>
                <input type="text" placeholder="Room name" autofocus required v-model="roomName">
                <label v-bind:class="{active: !validate()}">This name is not allowed</label>
                <button class="styled" type="submit" v-if="roomName" @click="create()">Next</button>
            </form>
        </div>
    </div>
    <script src="{{ asset('js/choose.js') }}"></script>
</body>

</html>
