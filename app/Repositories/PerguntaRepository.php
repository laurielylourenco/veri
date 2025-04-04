<?php


namespace App\Repositories;

use App\Models\Pesquisa;
use App\Models\Pergunta;
use Illuminate\Database\Eloquent\Collection;

class PerguntaRepository implements PerguntaRepositoryInterface
{


    public function all(Pesquisa $pesquisa): Collection
    {
        return $pesquisa->perguntas ?? collect();
    }

    public function create(array $data)
    {
        return Pergunta::create($data);
    }

}