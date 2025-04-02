<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PerguntaController;
use App\Http\Controllers\PesquisaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('pesquisas', PesquisaController::class);

    Route::get('/pesquisas/{pesquisa}/perguntas', [PerguntaController::class, 'index']);
    
});