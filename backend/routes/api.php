<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\TasksController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/hello', function (): JsonResponse {
    return response()->json([
        'message' => 'Hello from Laravel API!',
    ]);
});
Route::apiResource('tasks', TasksController::class);