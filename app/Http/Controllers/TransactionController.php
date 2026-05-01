<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    // =========================
    // ADMIN ONLY - READ ALL
    // =========================
    public function index()
    {
        if (auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'Akses hanya admin'], 403);
        }

        $transactions = Transaction::with(['customer', 'book'])->get();

        return response()->json([
            'status' => 'success',
            'data' => $transactions
        ]);
    }

    // =========================
    // CUSTOMER - SHOW
    // =========================
    public function show(int $id)
    {
        if (auth()->user()->role !== 'customer') {
            return response()->json(['message' => 'Hanya customer'], 403);
        }

        $transaction = Transaction::with(['customer', 'book'])->find($id);

        if (!$transaction) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $transaction
        ]);
    }

    // =========================
    // CUSTOMER - CREATE
    // =========================
    public function store(Request $request)
    {
        if (auth()->user()->role !== 'customer') {
            return response()->json(['message' => 'Hanya customer'], 403);
        }

        $request->validate([
            'book_id' => 'required|exists:books,id',
            'total_amount' => 'required|numeric'
        ]);

        $transaction = Transaction::create([
            'order_number' => 'TRX-' . time(),
            'customer_id' => auth()->id(),
            'book_id' => $request->book_id,
            'total_amount' => $request->total_amount
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $transaction
        ], 201);
    }

    // =========================
    // CUSTOMER - UPDATE
    // =========================
    public function update(Request $request, int $id)
    {
        if (auth()->user()->role !== 'customer') {
            return response()->json(['message' => 'Hanya customer'], 403);
        }

        $transaction = Transaction::find($id);

        if (!$transaction) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data tidak ditemukan'
            ], 404);
        }

        // optional: biar cuma bisa update transaksi sendiri
        if ($transaction->customer_id !== auth()->id()) {
            return response()->json(['message' => 'Bukan transaksi kamu'], 403);
        }

        $transaction->update([
            'total_amount' => $request->total_amount
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $transaction
        ]);
    }

    // =========================
    // ADMIN ONLY - DELETE
    // =========================
    public function destroy(int $id)
    {
        if (auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'Akses hanya admin'], 403);
        }

        $transaction = Transaction::find($id);

        if (!$transaction) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data tidak ditemukan'
            ], 404);
        }

        $transaction->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Deleted'
        ]);
    }
}