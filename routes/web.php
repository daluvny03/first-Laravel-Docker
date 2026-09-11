<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return 'halo dari Laravel Docker, Laravel + Docker sudah berhasil, HORE!. Saya adalah Developer A';
});

Route::get('/navbar', function() {
    return 'Ini halaman Navbar Developer B';
});
