<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['domain' => '{room}.rainy.dev'], function () {
    Route::get('/dev', function ($room) {
        return view('dev.chat', compact('room'));
    })->where('room', '.+');;
});

Route::get('/dev', function () {
    return view('dev.choose-room');
});

Route::get('/', function () {
    return view('chat');
});

// Google Webmaster verification
Route::get('/googled63a3a7848bbc072.html', function () {
    return view('config/googled63a3a7848bbc072');
});

Auth::routes();

Route::get('/home', 'HomeController@index');
