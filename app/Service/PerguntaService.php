<?php

namespace App\Service;

use App\Models\Pergunta;
use App\Models\Pesquisa;
use App\Repositories\PerguntaRepositoryInterface;

class PerguntaService
{

    public function __construct(protected PerguntaRepositoryInterface $pergunta_repository) {}


    public function all(Pesquisa $pesquisa): \Illuminate\Database\Eloquent\Collection
    {
        return $this->pergunta_repository->all($pesquisa);
    }

    public function create(array $data) {


        return $this->pergunta_repository->create($data);
    }
}
