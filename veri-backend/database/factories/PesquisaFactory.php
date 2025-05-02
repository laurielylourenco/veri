<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Pesquisa;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pesquisa>
 */
class PesquisaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nome' => $this->faker->name, 
            'descricao' => $this->faker->paragraph,
            'token_pesquisa' => $this->faker->uuid(),
            'id_criador' => 1
        ];
    }
}