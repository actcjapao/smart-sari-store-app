<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;

use App\Models\Post;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if ((App::environment() === 'production' || App::environment() === 'prod') || Post::count() > 0) {
            // Do not run this seeder in production environment or if posts already exist
            return;
        }

        $numberOfRows = 5;

        for ($i = 1; $i <= $numberOfRows; $i++) {
            Post::create([
                'title' => "Sample Post $i",
                'content' => "Description for Sample Post $i",
            ]);
        }
    }
}
