<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Registrar um novo usuário.
     */
    public function register(Request $request)
    {
        // Valida os dados de entrada
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ], [
            'name.required' => 'O nome é obrigatório!',
            'email.required' => 'O e-mail é obrigatório!',
            'email.email' => 'Digite um e-mail válido!',
            'email.unique' => 'Esse e-mail já está cadastrado!',
            'password.required' => 'A senha é obrigatória!',
            'password.min' => 'A senha deve ter pelo menos 6 caracteres!',
        ]);


        // Cria o usuário no banco de dados
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
        ]);

        // Gera o token para autenticação
        $token = $user->createToken('api-token')->plainTextToken;

        // Retorna os dados do usuário e o token
        return response()->json([
            'message' => 'Usuário criado com sucesso!',
            'token' => $token,
            'user' => $user,
        ], 201);
    }


    /**
     * Login do usuário.
     */
    public function login(Request $request)
    {
        $request->validate(
            [
                'email' => 'required|email',
                'password' => 'required',
            ],
            [
                'email.required' => 'O e-mail é obrigatório!',
                'email.email' => 'Digite um e-mail válido!',
                'password.required' => 'A senha é obrigatória!',
            ]

        );

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['As credenciais fornecidas estão incorretas.'],
            ]);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json(['token' => $token, 'user' => $user]);
    }

    /**
     * Obter usuário autenticado.
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    /**
     * Logout do usuário.
     */
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logout realizado com sucesso']);
    }
}
