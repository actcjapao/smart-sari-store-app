<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RegistrationController extends Controller
{
    function loadRegistrationPage() {
        return inertia('registration/Registration');
    }
}
