<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;

// AUTH
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// PUBLIC
Route::apiResource('authors', AuthorController::class)->only([
    'index',
    'show'
]);

Route::apiResource('genres', GenreController::class)->only([
    'index',
    'show'
]);

Route::apiResource('books', BookController::class)->only([
    'index',
    'show'
]);

// USER
Route::middleware('auth:api')->group(function () {

    Route::get('/me', function () {
        return response()->json(auth()->user());
    });

    Route::get('/user', function () {
        return response()->json(auth()->user());
    });
    Route::get('/dashboard', [DashboardController::class, 'index']);

    Route::post('/cart/add', [CartController::class, 'addToCart']);
    Route::get('/cart', [CartController::class, 'getCart']);
    Route::put('/cart/update/{id}', [CartController::class, 'updateQty']);
    Route::delete('/cart/remove/{id}', [CartController::class, 'removeItem']);

    Route::post('/transactions', [TransactionController::class, 'store']);
    Route::get('/transactions/{id}', [TransactionController::class, 'show']);
    Route::get('/my-transactions', [TransactionController::class, 'myTransactions']);

    Route::post('/logout', [AuthController::class, 'logout']);
});

// ADMIN
Route::middleware(['auth:api', 'admin'])->group(function () {

    // USERS
    Route::get('/users', [UserController::class, 'index']);

    // BOOKS
    Route::apiResource('books', BookController::class)->except([
        'index',
        'show'
    ]);

    // AUTHORS
    Route::apiResource('authors', AuthorController::class)->except([
        'index',
        'show'
    ]);

    // GENRES
    Route::apiResource('genres', GenreController::class)->except([
        'index',
        'show'
    ]);

    // TRANSACTIONS
    Route::get('/transactions', [TransactionController::class, 'index']);
    Route::delete('/transactions/{id}', [TransactionController::class, 'destroy']);
});
