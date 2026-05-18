<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            [
                'email' => 'admin@gmail.com'
            ],
            [
                'name' => 'Admin',
                'username' => 'admin',
                'password' => '123456',
                'role' => 'admin',
            ]
        );
    }
}
