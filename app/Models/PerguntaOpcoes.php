<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PerguntaOpcoes extends Model
{
    use HasFactory;

    protected $fillable = [
        'descricao',
        'id_pergunta',
        'ordem',
    ];
}
