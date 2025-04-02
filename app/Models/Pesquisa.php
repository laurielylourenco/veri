<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Pesquisa extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'nome',
        'descricao',
        'id_criador',
        'token_pesquisa',
        'url',
    ];

    public function perguntas(): HasMany
    {
        return $this->hasMany(Pergunta::class, 'id_pesquisa', 'id');
    }

}
