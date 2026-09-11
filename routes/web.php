<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return 'halo dari Laravel Docker, Laravel _ Docker sudah berhasil, HORE!';
});

Route::get('/navbar', function() {
    return 'Ini halaman Navbar Developer B';
});
