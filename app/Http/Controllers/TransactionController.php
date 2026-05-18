<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\TransactionDetail;
use App\Models\Cart;

class TransactionController extends Controller
{
    public function index()
    {
        if (auth()->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Akses hanya admin'
            ], 403);
        }
        $transactions = Transaction::with([
            'customer',
            'details.book'
        ])->get();
        return response()->json([
            'status' => 'success',
            'data' => $transactions
        ]);
    }

    public function show(int $id)
    {
        if (auth()->user()->role !== 'customer') {
            return response()->json([
                'message' => 'Hanya customer'
            ], 403);
        }
        $transaction = Transaction::with([
            'customer',
            'details.book'
        ])->find($id);
        if (!$transaction) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data tidak ditemukan'
            ], 404);
        }
        if ($transaction->customer_id !== auth()->id()) {
            return response()->json([
                'message' => 'Bukan transaksi kamu'
            ], 403);
        }
        return response()->json([
            'status' => 'success',
            'data' => $transaction
        ]);
    }

    public function store(Request $request)
    {
        if (auth()->user()->role !== 'customer') {
            return response()->json([
                'message' => 'Hanya customer'
            ], 403);
        }
        $user = auth()->user();
        $cartItems = Cart::with('book')
            ->where('customer_id', $user->id)
            ->get();
        if ($cartItems->isEmpty()) {
            return response()->json([
                'message' => 'Cart kosong'
            ], 400);
        }
        $total = 0;
        foreach ($cartItems as $item) {
            $total += (
                $item->book->price *
                $item->quantity
            );
        }
        $transaction = Transaction::create([
            'order_number' => 'TRX-' . time(),
            'customer_id' => $user->id,
            'total_amount' => $total
        ]);
        foreach ($cartItems as $item) {
            TransactionDetail::create([
                'transaction_id' => $transaction->id,
                'book_id' => $item->book_id,
                'qty' => $item->quantity,
                'price' => $item->book->price,
            ]);
            $book = $item->book;
            $book->stock -= $item->quantity;
            $book->save();
        }
        Cart::where(
            'customer_id',
            $user->id
        )->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Checkout berhasil',
            'data' => $transaction
        ], 201);
    }

    public function update(Request $request, int $id)
    {
        if (auth()->user()->role !== 'customer') {
            return response()->json([
                'message' => 'Hanya customer'
            ], 403);
        }
        $transaction = Transaction::find($id);
        if (!$transaction) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data tidak ditemukan'
            ], 404);
        }
        if ($transaction->customer_id !== auth()->id()) {
            return response()->json([
                'message' => 'Bukan transaksi kamu'
            ], 403);
        }
        $transaction->update([
            'total_amount' => $request->total_amount
        ]);
        return response()->json([
            'status' => 'success',
            'data' => $transaction
        ]);
    }
    public function destroy(int $id)
    {
        if (auth()->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Akses hanya admin'
            ], 403);
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
