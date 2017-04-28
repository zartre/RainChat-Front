<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
    <style>
        html, body {
            height: 100%;
            margin: 0;
        }
        body {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #FFF;
            font-family: "-apple-system", "Segoe UI", "Ubuntu", sans-serif;
            background: linear-gradient(135deg, rgb(2,103,255), rgb(56,202,255));
            overflow: hidden;
        }
        img {
            display: block;
            width: 100%;
            max-width: 270px;
            margin-bottom: 3em;
        }
        h2 {
            margin: 0 0 0.6rem;
        }
        h3 {
            margin: 0;
        }
        @media (max-width: 320px) {
            img {
                max-width: 220px;
                margin-bottom: 2em;
            }
            h2 {
                font-size: 1.2em;
            }
            h3 {
                font-size: 1em;
            }
        }
    </style>
</head>

<body>
    <img src="{{ asset('img/sidebar-white.png') }}" alt="Rainy.Chat">
    <h2>May the 4th be with you</h2>
    <h3>Let's meet at IT Auditorium, 1 PM</h3>
</body>

</html>
