<?php

namespace App\Http\Controllers;

use App\Http\Resources\PesquisaResource;
use App\Models\Pesquisa;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Service\PesquisaService;

class PesquisaController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function __construct(
        protected PesquisaService $pesquisa_service
    ) {}

    public function index()
    {

        /* Tudos que usuario pode ver seja pq ele criou ou ele participa de uma equipe validar */

        $idusuario = auth()->id();

        $pesquisa = $this->pesquisa_service->getAllByUser($idusuario);

        return PesquisaResource::collection($pesquisa);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $data = $request->validate([
            'nome' => 'required',
            'descricao' => 'required'
        ]);

        $data['id_criador'] = auth()->id();
        $data['token_pesquisa'] =  Str::orderedUuid();

        $pesquisa = $this->pesquisa_service->create($data);

        if (!$pesquisa instanceof Pesquisa) {

            throw new \UnexpectedValueException('Falha ao criar a pergunta');
        }

        return response()->json([
            'message' => 'Pesquisa criada com sucesso!',
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        return response()->json($this->pesquisa_service->find($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //

        $data = $request->validate([
            'nome' => 'sometimes|string|max:255',
            'descricao' => 'nullable|string',
        ]);

        return response()->json($this->pesquisa_service->update($id, $data));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        return response()->json(['deleted' => $this->pesquisa_service->delete($id)], 204);
    }
}
