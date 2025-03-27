<?php

namespace App\Repositories;

use App\Models\Pesquisa;

class PesquisaRepository implements PesquisaRepositoryInterface
{
    public function all()
    {
        return Pesquisa::all();
    }

    public function find($id)
    {
        return Pesquisa::findOrFail($id);
    }

    public function create(array $data)
    {
        return Pesquisa::create($data);
    }

    public function update($id, array $data)
    {
        $pesquisa = Pesquisa::findOrFail($id);
        
        return $pesquisa->update($data);
    }

    public function delete($id)
    {
        $pesquisa = Pesquisa::findOrFail($id);
        $pesquisa->delete();
        return true;
    }
}
