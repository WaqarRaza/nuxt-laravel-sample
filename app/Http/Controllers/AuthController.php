<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Service\Facades\Api;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {

        if (!Api::validate(['email' => 'required|email', 'password' => 'required'])) {
            return Api::validation_errors();
        }

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return Api::error(message: 'User not found');
        }

        if (Auth::attempt($request->only(['email', 'password']))) {
            $token = $user->createToken('Login token');
            return Api::response(data: ['access_token' => $token->plainTextToken, 'user' => $user]);
        }

        return Api::error(message: 'Invalid Credentials');
    }

    public function register(Request $request)
    {
        if (!Api::validate(['name' => 'required|min:3|max:150', 'email' => 'required|email|unique:users', 'password' => 'required|confirmed'])) {
            return Api::validation_errors();
        }

        $insert = $request->only(['name', 'email', 'password']);
        $insert['password'] = bcrypt($insert['password']);
        $user = User::create($insert);

        $token = $user->createToken('Login token');
        return Api::response(data: ['access_token' => $token->plainTextToken, 'user' => $user]);
    }
}
