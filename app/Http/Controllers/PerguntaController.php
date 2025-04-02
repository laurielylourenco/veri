<?php

namespace App\Http\Controllers;

use App\Models\Pesquisa;
use App\Service\PerguntaService;
use App\Service\PesquisaService;
use Illuminate\Http\Request;

class PerguntaController extends Controller
{

    public function __construct(
        protected PerguntaService $pergunta_service,
        protected PesquisaService $pesquisa_service
    ) {}
    


    public function index(Pesquisa $pesquisa)
{
    $perguntas = $this->pergunta_service->all($pesquisa);
    return response()->json($perguntas);
}

}
