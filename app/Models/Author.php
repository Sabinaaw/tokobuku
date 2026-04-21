<?php

namespace App\Models;

class Author
{
    public static function all()
    {
        return [
            ['id' => 1, 'name' => 'Andrea Hirata'],
            ['id' => 2, 'name' => 'Tere Liye'],
            ['id' => 3, 'name' => 'Pramoedya Ananta Toer'],
            ['id' => 4, 'name' => 'Dee Lestari'],
            ['id' => 5, 'name' => 'Habiburrahman El Shirazy'],
        ];
    }
}