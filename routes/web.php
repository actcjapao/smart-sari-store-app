<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CrudController;
use App\Http\Controllers\RegistrationController;

// Sample CRUD Operation Routes
Route::get('/sample-crud', [CrudController::class, 'loadList'])->name('list.load');
Route::get('/posts/add', [CrudController::class, 'create'])->name('posts.create');
Route::post('/posts', [CrudController::class, 'store'])->name('posts.store');
Route::get('/posts/{post}/edit', [CrudController::class, 'edit'])->name('posts.edit');
Route::put('/posts/{post}', [CrudController::class, 'update'])->name('posts.update');
Route::delete('/posts/{post}', [CrudController::class, 'destroy'])->name('posts.destroy');


// Navigation Routes
Route::get('/', [RegistrationController::class, 'loadRegistrationPage'])->name('registration.page.load');

// API Routes
