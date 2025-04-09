<?php

namespace App\Repositories;

use App\Models\Pesquisa;
use App\Models\Pergunta;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PerguntaRepository implements PerguntaRepositoryInterface
{
    protected $model;

    public function __construct(Pergunta $model)
    {
        $this->model = $model;
    }

    public function all(Pesquisa $pesquisa): Collection
    {
        return $pesquisa->perguntas()->with('opcoes')->orderBy('ordem')->get();
    }


    public function create(array $data): Pergunta
    {
        return $this->model->create($data);
    }


    public function findWithOptions(int $id): Pergunta
    {
        return $this->model->with('opcoes')->findOrFail($id);
    }


    public function update(int $id, array $data): Pergunta
    {
        $pergunta = $this->model->findOrFail($id);
        $pergunta->update($data);
        return $pergunta->fresh(); // Retorna a versão atualizada
    }

 
    public function delete(int $id): bool
    {
        $pergunta = $this->model->findOrFail($id);
        return $pergunta->delete();
    }

 
    public function addOptions(int $perguntaId, array $opcoes): Collection
    {
        $pergunta = $this->model->findOrFail($perguntaId);
        return $pergunta->opcoes()->createMany($opcoes);
    }

   
    public function syncOptions(int $perguntaId, array $opcoes): Collection
    {
        $pergunta = $this->model->findOrFail($perguntaId);
        
        // Primeiro remove as opções existentes
        $pergunta->opcoes()->delete();
        
        // Adiciona as novas opções
        return $this->addOptions($perguntaId, $opcoes);
    }

    /**
     * Remove opções específicas de uma pergunta
     */
    public function removeOptions(int $perguntaId, array $opcoesIds): int
    {
        return $this->model->findOrFail($perguntaId)
            ->opcoes()
            ->whereIn('id', $opcoesIds)
            ->delete();
    }

    /**
     * Reordena as perguntas de uma pesquisa
     */
    public function reorder(Pesquisa $pesquisa, array $newOrder): bool
    {
        foreach ($newOrder as $order => $perguntaId) {
            $this->model->where('id', $perguntaId)
                ->where('id_pesquisa', $pesquisa->id)
                ->update(['ordem' => $order + 1]); // +1 para começar de 1
        }
        
        return true;
    }
}