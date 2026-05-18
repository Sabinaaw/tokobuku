<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Book;
use App\Models\Author;
use App\Models\Transaction;

class DashboardController extends Controller
{
    public function index()
    {
        return response()->json([
            'total_users' => User::count(),
            'total_books' => Book::count(),
            'total_authors' => Author::count(),
            'total_transactions' => Transaction::count(),

            'recent_transactions' => Transaction::with('user')
                ->latest()
                ->take(5)
                ->get()
        ]);
    }
}
