<?php

namespace App\Http\Controllers;

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
    ) {
    }

    public function index()
    {

        return $this->pesquisa_service->all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
    
        $data = $request->validate([
            'nome' => 'required',
            'descricao' => 'required',
            'email' => 'required'
        ]);

        $data['id_criador'] = auth()->id();
        $data['token_pesquisa'] =  Str::orderedUuid();
 
        $pesquisa = $this->pesquisa_service->create($data);

        if(!$pesquisa instanceof Pesquisa){

             throw new \UnexpectedValueException('Falha ao criar a pesquisa');
        }

        return response()->json([
            'message' => 'Pesquisa criada com sucesso!', 
        ],201); 
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
