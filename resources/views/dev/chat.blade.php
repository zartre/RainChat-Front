<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
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
    <title>Rainy.Chat</title>
    <link rel="stylesheet" href="{{ asset('css/chat.css') }}">
    <script src="https://unpkg.com/vue"></script>
    {{-- <script src="js/vue.min.js"></script> --}}
    <script>
        document.createElement("picture");
    </script>
    <script src="{{ asset('js/picturefill.min.js') }}" async></script>
</head>

<body>
    <div id="app" style="height:100%;">
        <div class="modal" v-if="!loggedIn">
            <div class="box">
                <h1>Enter a display name</h1>
                <input type="text" placeholder="Display name">
                <button class="styled" @click="loggedIn=true">Log in</button>
            </div>
        </div>
        <div class="drawer" v-bind:class="{active: drawerOpen}">
            <img src="{{ asset('img/sidebar-white.svg') }}" alt="RainyChat" class="logo">
            <div class="welcome">
                Welcome,<br>Nathan
            </div>
            <div class="online">
                <div class="heading">
                    Online users
                </div>
                <div class="user">DobaKung</div>
                <div class="user">DobaKung</div>
                <div class="user">DobaKung</div>
            </div>
        </div>
        <div class="drawer-bg" v-bind:class="{active: drawerOpen}" @click="drawerOpen=false"></div>
        <div class="content">
            <header>
                <img src="{{ asset('img/i-menu.svg') }}" alt="menu" class="icon" id="menu" @click="drawerOpen=true">
                <div class="room-name">
                    Anonymous Group
                </div>
                <img src="{{ asset('img/i-more.svg') }}" alt="menu" class="icon" id="more" @click="menuOpen=!menuOpen">
                <div class="menu" v-bind:class="{active: menuOpen}">
                    <a href="#">Night mode</a>
                    <a href="#">Join more</a>
                    <a href="#">Logout</a>
                </div>
            </header>
            <div class="chat-wrap">
                <div class="bubble me">Lorem ipsum dolor sit amet</div>
                <div class="bub-other-group">
                    <div class="other-name">Doba</div>
                    <div class="bubble other">Lorem ipsum dolor sit amet</div>
                </div>
                <div class="bub-other-group">
                    <div class="bubble other">Lorem ipsum dolor sit amet</div>
                </div>
                <div class="bubble me">Lorem ipsum dolor sit amet</div>
                <div class="bubble me">Lorem ipsum dolor sit amet</div>
                <div class="bub-other-group">
                    <div class="other-name">Doba</div>
                    <div class="bubble other">Lorem ipsum dolor sit amet</div>
                </div>
                <div class="bub-other-group">
                    <div class="bubble other">Lorem ipsum dolor sit amet</div>
                </div>
                <div class="bubble me">Lorem ipsum dolor sit amet</div>
                <div class="bubble me">Lorem ipsum dolor sit amet</div>
                <div class="bub-other-group">
                    <div class="other-name">Doba</div>
                    <div class="bubble other">Lorem ipsum dolor sit amet</div>
                </div>
                <div class="bub-other-group">
                    <div class="bubble other">Lorem ipsum dolor sit amet</div>
                </div>
                <div class="bubble me">Lorem ipsum dolor sit amet</div>
            </div>
            <div class="chat-box">
                <input type="text" placeholder="Type here">
                <button class="submit-btn">
                    <img src="{{ asset('img/i-send.svg') }}" alt="Send">
                </button>
            </div>
        </div>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
    <script src="{{ asset('js/visible.min.js') }}"></script>
    <script src="{{ asset('js/chat.js?v=1.1') }}"></script>
</body>

</html>
