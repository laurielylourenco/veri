<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PerguntaOpcoes extends Model
{
    use HasFactory;


    protected $table = 'opcoes';
    
    protected $fillable = [
        'descricao',
        'id_pergunta',
        'ordem',
    ];

 
     // Relacionamento inverso com Pergunta
     public function pergunta(): BelongsTo
     {
         return $this->belongsTo(Pergunta::class, 'id_pergunta', 'id');
     }
}
