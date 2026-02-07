<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use App\Models\User;
use App\Models\Store;
use App\Models\UserStore;

class RegistrationController extends Controller
{
    function loadRegistrationPage() {
        return inertia('registration/Registration');
    }

    function register(Request $request) {
        /**
         * Validation that is recommended by Inertia
         * $request->validate($rules, $customErrorMessages);
         */
        $rules = [
            'name' => ['required', 'string', 'max:255', 'regex:/^[a-zA-Z\s]+$/'],
            'email' => 'required|email|unique:users,email',
            // 'confirmed' rule will automatically check for a field named 'password_confirmation'
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'store_name' => 'required|string|max:255',
            'location' => 'nullable|string',
            'description' => 'nullable|string',
        ];

        $customErrorMessages = [
            'name.required' => 'Name is required.',
            'name.string' => 'Name must be a string.',
            'name.max' => 'Name cannot exceed 255 characters.',
            'name.regex' => 'Name can only contain letters and spaces.',

            'email.required' => 'Email is required.',
            'email.email' => 'Email must be a valid email address.',
            'email.unique' => 'Email is already taken.',

            'password.required' => 'Password is required.',
            'password.string' => 'Password must be a string.',
            'password.min' => 'Password must be at least 8 characters.',
            'password.confirmed' => 'Passwords do not match.',

            'store_name.required' => 'Store name is required.',
            'store_name.string' => 'Store name must be a string.',
            'store_name.max' => 'Store name cannot exceed 255 characters.'
        ];
        
        $request->validate($rules, $customErrorMessages);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $store = Store::create([
            'name' => $request->store_name,
            'description' => $request->description,
            'location' => $request->location,
        ]);

        $userStore = UserStore::create([
            'user_id' => $user->id,
            'store_id' => $store->id,
        ]);

        // Do not double redirect. Instead, use back() to return to the registration page with a success message.
        // Then, in the frontend, you can check for this success message and redirect to the login page after a short delay.
        return back()->with('success', 'Registration successful!');
    }
}
