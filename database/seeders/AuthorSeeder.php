<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Author;

class AuthorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $authors = [
            // Indonesia
            'Tere Liye',
            'Andrea Hirata',
            'Pramoedya Ananta Toer',
            'Dee Lestari',
            'Habiburrahman El Shirazy',
            'Raditya Dika',
            'Asma Nadia',

            // Luar Negeri
            'J.K. Rowling',
            'George Orwell',
            'Ernest Hemingway',
            'Mark Twain',
            'Jane Austen',
            'Agatha Christie',
            'Stephen King',
            'Leo Tolstoy',
            'Fyodor Dostoevsky',
            'Haruki Murakami',

            // China (yang kamu maksud)
            'SingShong',
        ];

        foreach ($authors as $author) {
            Author::create([
                'name' => $author
            ]);
    }
}
}