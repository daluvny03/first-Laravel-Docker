<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return 'Saya adalah Developer B';
});

Route::get('/navbar', function() {
    return 'Ini halaman Navbar Developer B';
});
