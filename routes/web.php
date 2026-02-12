<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CrudController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductController;

// Temp Route --> This route is intended for managing session data
Route::get('/session/{operation?}', function($operation = null){
    // Restrict to specific environments only
    $allowedEnvs = ["local", "dev", "development", "staging", "test"];
    
    if (!App::environment($allowedEnvs)) {
        abort(403, 'Access denied. This route is not available in '.App::environment().' environment.');
    }

    if($operation == null) {
        echo "- Specify a proper URL";
    } else if ($operation == "view") {
        $existingSession = session()->all();
        dd($existingSession);
    } else if ($operation == "clear") {
        session()->pull('auth_token');
        echo "- All session data has been flushed (hard reset).";
    } else if ($operation === "flush") {
        session()->flush();
        echo "- All session data has been flushed (hard reset).";
    } else {
        echo "- Specify a proper URL";
    }
});

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
Route::get('/products', [ProductController::class, 'loadProductsPage'])->name('products.page.load');

// API Routes
Route::post('/api/register', [RegistrationController::class, 'register'])->name('registration.submit');
Route::post('/api/login', [AuthenticationController::class, 'login'])->name('login.submit');