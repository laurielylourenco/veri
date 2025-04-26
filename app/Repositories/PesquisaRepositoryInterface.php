<?php

namespace App\Repositories;

interface PesquisaRepositoryInterface
{
    public function all();
    public function getAllByUser($id);
    public function find($id);
    public function create(array $data);
    public function update($id, array $data);
    public function delete($id);
}
