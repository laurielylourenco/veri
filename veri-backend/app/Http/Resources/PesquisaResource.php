<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PesquisaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
         return [
            'token_pesquisa' => $this->token_pesquisa,
            'nome' => $this->nome,
            'descricao' => $this->descricao,
            'url' => $this->url,
        ];
    }
}