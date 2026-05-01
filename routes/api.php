<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TransactionController;

// =======================
// LOGIN
// =======================
Route::post('/login', [AuthController::class, 'login']);


// =======================
// PUBLIC (NO LOGIN)
// =======================

// AUTHOR
Route::get('/authors', [AuthorController::class, 'index']);
Route::get('/authors/{id}', [AuthorController::class, 'show']);

// GENRE
Route::get('/genres', [GenreController::class, 'index']);
Route::get('/genres/{id}', [GenreController::class, 'show']);

// AUTHENTICATED USER
Route::middleware(['auth:api'])->group(function () {

    // AUTHOR (ADMIN)
    Route::post('/authors', [AuthorController::class, 'store']);
    Route::put('/authors/{id}', [AuthorController::class, 'update']);
    Route::delete('/authors/{id}', [AuthorController::class, 'destroy']);

    // GENRE (ADMIN)
    Route::post('/genres', [GenreController::class, 'store']);
    Route::put('/genres/{id}', [GenreController::class, 'update']);
    Route::delete('/genres/{id}', [GenreController::class, 'destroy']);

    // TRANSACTION (CUSTOMER)
    Route::post('/transactions', [TransactionController::class, 'store']); // create
    Route::put('/transactions/{id}', [TransactionController::class, 'update']); // update
    Route::get('/transactions/{id}', [TransactionController::class, 'show']); // show

    // TRANSACTION (ADMIN)
    Route::get('/transactions', [TransactionController::class, 'index']); // read all
    Route::delete('/transactions/{id}', [TransactionController::class, 'destroy']); // delete
});