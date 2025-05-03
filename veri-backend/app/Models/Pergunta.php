<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pergunta extends Model
{
    use HasFactory;


    protected $fillable = [
        'descricao',
        'id_pesquisa',
        'tipo',
        'ordem',
        'obrigatoria'
    ];


    public function opcoes(): HasMany
    {
        return $this->hasMany(PerguntaOpcoes::class, 'id_pergunta', 'id');
    }

    public function aceitaOpcoes(): bool
    {
        return in_array($this->tipo, ['multipla_escolha']);
    }

}
