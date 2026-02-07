<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CrudController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\DashboardController;

// Sample CRUD Operation Routes
Route::get('/sample-crud', [CrudController::class, 'loadList'])->name('list.load');
Route::get('/posts/add', [CrudController::class, 'create'])->name('posts.create');
Route::post('/posts', [CrudController::class, 'store'])->name('posts.store');
Route::get('/posts/{post}/edit', [CrudController::class, 'edit'])->name('posts.edit');
Route::put('/posts/{post}', [CrudController::class, 'update'])->name('posts.update');
Route::delete('/posts/{post}', [CrudController::class, 'destroy'])->name('posts.destroy');

// Navigation Routes
Route::get('/registration', [RegistrationController::class, 'loadRegistrationPage'])->name('registration.page.load');
Route::get('/login', [AuthenticationController::class, 'loadLoginPage'])->name('login.page.load');
Route::get('/dashboard', [DashboardController::class, 'loadDashboardPage'])->name('dashboard.page.load');

// API Routes
Route::post('/api/register', [RegistrationController::class, 'register'])->name('registration.submit');
Route::post('/api/login', [AuthenticationController::class, 'login'])->name('login.submit');