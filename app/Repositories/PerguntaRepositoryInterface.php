<?php

namespace App\Repositories;

use App\Models\Pesquisa;
use Illuminate\Database\Eloquent\Collection;

interface PerguntaRepositoryInterface
{
    public function all(Pesquisa $pesquisa) : Collection; // Retorna todas as perguntas de uma pesquisa
/*     public function find($id);
    public function create(array $data);
    public function update($id, array $data);
    public function delete($id); */
}

