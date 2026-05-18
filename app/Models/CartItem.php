<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Cart;
use App\Models\Book;

class CartItem extends Model
{
    use HasFactory;
    protected $fillable = [
        'cart_id',
        'book_id',
        'qty'
    ];
    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}
