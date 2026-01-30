<?php

use Illuminate\Support\Facades\Route;

// Crud Controller
use App\Http\Controllers\CrudController;

// Sample CRUD Operation Routes
Route::get('/sample-crud', [CrudController::class, 'loadList'])->name('list.load');

Route::get('/posts/add', [CrudController::class, 'create'])->name('posts.create');
Route::post('/posts', [CrudController::class, 'store'])->name('posts.store');

Route::get('/posts/{post}/edit', [CrudController::class, 'edit'])->name('posts.edit');
Route::put('/posts/{post}', [CrudController::class, 'update'])->name('posts.update');

Route::delete('/posts/{post}', [CrudController::class, 'destroy'])->name('posts.destroy');

// Actual Routes
Route::get('/', function () {
    return inertia('Home');
});
