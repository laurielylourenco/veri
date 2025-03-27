<?php

namespace App\Service;

use App\Models\Pesquisa;
use App\Repositories\PesquisaRepositoryInterface;


class PesquisaService
{

    public function __construct(protected PesquisaRepositoryInterface $pesquisa_repository) {}


    public function create(array $data): Pesquisa
    {

        return $this->pesquisa_repository->create($data);
    }


    public function update(int $id, array $data): int
    {
        return $this->pesquisa_repository->update($id, $data);
    }

    public function delete(int $id): bool
    {
        return $this->pesquisa_repository->delete($id);
    }

    public function all(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->pesquisa_repository->all();
    }

    public function find(int $id): ?Pesquisa
    {
        return $this->pesquisa_repository->find($id);
    }
}
