<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;
    protected $fillable = [
        'order_number',
        'customer_id',
        'total_amount'
    ];
    public function customer()
    {
        return $this->belongsTo(
            User::class,
            'customer_id'
        );
    }
    public function details()
    {
        return $this->hasMany(
            TransactionDetail::class
        );
    }
}
