<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    // LOGIN
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);
        $credentials = $request->only('email', 'password');
        if (!$token = auth('api')->attempt($credentials)) {

            return response()->json([
                'message' => 'Email atau password salah'
            ], 401);
        }
        return response()->json([
            'message' => 'Login berhasil',
            'access_token' => $token,
            'token_type' => 'bearer',
            'user' => auth('api')->user(),
        ]);
    }

    // REGISTER
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'username' => 'required|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);
        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => $request->password,
            'role' => 'customer',
        ]);
        $token = auth('api')->login($user);
        return response()->json([
            'message' => 'Register berhasil',
            'access_token' => $token,
            'token_type' => 'bearer',
            'user' => $user,
        ], 201);
    }
    public function logout()
    {
        auth('api')->logout();
        return response()->json([
            'message' => 'Logout berhasil'
        ]);
    }
    public function me()
    {
        return response()->json(auth('api')->user());
    }
}
