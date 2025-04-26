<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pergunta>
 */
class PerguntaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "id_pesquisa" =>  1,
            "tipo" => "multipla_escolha",
            "descricao" => $this->faker->paragraph,
            "ordem" => 2,
            "obrigatoria" => 0,
            "opcoes" => [
                [
                    "id" => 1,
                    'descricao' => $this->faker->paragraph,
                    'ordem' => 1,
                ],
                [
                    "id" => 2,
                    'descricao' => $this->faker->paragraph(2),
                    'ordem' => 2,
                ]
            ]
        ];
        
    }
}
