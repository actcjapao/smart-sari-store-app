<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthenticationController extends Controller
{
    function loadLoginPage() {
        return inertia('login/Login');
    }

    function login(Request $request) {
        $rules = [
            'email' => 'required|email|string',
            'password' => 'required|string'
        ];

        $customErrorMessages = [
            'email.required' => 'Email is required.',
            'email.email' => 'Email must be a valid email address.',
            'email.string' => 'Email must be a string.',
            
            'password.required' => 'Password is required.',
            'password.string' => 'Password must be a string.'
        ];

        $request->validate($rules, $customErrorMessages);

        // Authentication logic will be implemented here in the future

        return back()->with('success', 'Logged in successfully.');
    }
}
