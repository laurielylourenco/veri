<?php

namespace App\Http\Controllers;

use App\Models\Pergunta;
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



    public function store(Request $request)
    {


        
        $data = $request->validate([
            'id_pesquisa' => 'required|integer',
            'descricao' => 'required|string',
            'tipo' => 'required|in:multipla_escolha,texto,avaliacao,data,upload,sim_nao',
            'ordem' => 'required',
            'obrigatoria' => 'required|integer',
            'opcoes' => 'nullable|array',
            'opcoes.*.descricao' => 'required_with:opcoes|string',
            'opcoes.*.ordem' => 'required_with:opcoes|integer',
        ]);
      
        $pergunta = $this->pergunta_service->create($data);

        if (!$pergunta instanceof Pergunta) {

            throw new \UnexpectedValueException('Falha ao criar a pergunta');
        }

        return response()->json([
            'message' => 'Pergunta criada com sucesso!',
        ], 201);
    }
}
