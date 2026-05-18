<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Book;

class CartController extends Controller
{
    public function addToCart(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id'
        ]);
        $cart = Cart::firstOrCreate([
            'user_id' => auth()->id()
        ]);
        $item = CartItem::where('cart_id', $cart->id)
            ->where('book_id', $request->book_id)
            ->first();
        if ($item) {
            $item->qty += 1;
            $item->save();
        } else {
            CartItem::create([
                'cart_id' => $cart->id,
                'book_id' => $request->book_id,
                'qty' => 1
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => 'Book added to cart'
        ]);
    }

    public function getCart()
    {
        $cart = Cart::with('items.book')
            ->where('user_id', auth()->id())
            ->first();
        return response()->json([
            'success' => true,
            'data' => $cart
        ]);
    }

    public function updateQty(Request $request, $id)
    {
        $request->validate([
            'qty' => 'required|integer|min:1'
        ]);
        $item = CartItem::find($id);
        if (!$item) {
            return response()->json([
                'success' => false,
                'message' => 'Cart item tidak ditemukan'
            ], 404);
        }
        $item->qty = $request->qty;
        $item->save();
        return response()->json([
            'success' => true,
            'message' => 'Qty updated'
        ]);
    }

    public function removeItem($id)
    {
        $item = CartItem::find($id);
        if (!$item) {
            return response()->json([
                'success' => false,
                'message' => 'Cart item tidak ditemukan'
            ], 404);
        }
        $item->delete();
        return response()->json([
            'success' => true,
            'message' => 'Item removed'
        ]);
    }
}
