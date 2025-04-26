<?php

namespace App\Repositories;

use App\Models\Pesquisa;
use App\Models\Pergunta;
use Illuminate\Database\Eloquent\Collection;

interface PerguntaRepositoryInterface
{
    public function all(Pesquisa $pesquisa): Collection;
    public function create(array $data): Pergunta;
    public function findWithOptions(int $id): Pergunta;
    public function update(int $id, array $data): Pergunta;
    public function delete(int $id): bool;
    public function addOptions(int $perguntaId, array $opcoes): Collection;
    public function updateOptions(int $perguntaId, array $opcoes): Collection;
    public function removeOptions(int $perguntaId, array $opcoesIds): int;
    public function reorder(Pesquisa $pesquisa, array $newOrder): bool;
}