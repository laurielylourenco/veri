<?php

namespace Tests\Feature;

use App\Models\Pergunta;
use App\Models\Pesquisa;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PerguntaTest extends TestCase
{
    //use RefreshDatabase;

    protected $token;
    protected $user;
    protected $pesquisa;
    protected $pergunta;


    protected function setUp(): void
    {
        parent::setUp();

        // Cria o usuário usando factory
        $uuid  = uniqid();
        $this->user = User::factory()->create([
            "name" => "teste",
            'email' => 'teste' . $uuid . '@email.com',
            'password' => bcrypt('123456'),
        ]);

        // Faz login e obtém o token
        $response = $this->postJson('/api/login', [
            'email' => 'teste' . $uuid . '@email.com',
            'password' => '123456',
        ]);

        $this->token = $response->json('token');

        // Cria a pesquisa usando factory
        $this->pesquisa = Pesquisa::factory()->create([
            "nome" => "Pesquisa de Satisfação TESTE",
            "descricao" => "Pesquisa para avaliar a satisfação TESTE"
        ]);
    }

    public function test_success_response_is_returned_after_create_text(): void
    {
        $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->postJson('/api/perguntas', [
            "id_pesquisa" => $this->pesquisa->id,
            "tipo" => "texto",
            "descricao" => "Há algum tipo de informação sobre empresas que você tem dificuldade em encontrar?",
            "ordem" => 1,
            "obrigatoria" => 0
        ])->assertExactJson([
            'message' => 'Pergunta criada com sucesso!'
        ]);
    }

    public function test_success_response_is_returned_after_create_opcoes(): void
    {
        $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->postJson('/api/perguntas', [
            "id_pesquisa" =>  $this->pesquisa->id,
            "tipo" => "multipla_escolha",
            "descricao" => "Como você descreveria a cultura desta empresa?",
            "ordem" => 2,
            "obrigatoria" => 0,
            "opcoes" => [
                [
                    'descricao' => "opcao 1",
                    'ordem' => 1,
                ],
                [
                    'descricao' => "opcao 2",
                    'ordem' => 2,
                ]
            ]
        ])->assertStatus(201);
    }


    public function test_success_update_pergunta()
    {

        $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->putJson("/api/perguntas/1", [
            "id_pergunta" => 1,
            "id_pesquisa" =>  $this->pesquisa->id,
            "tipo" => "multipla_escolha",
            "descricao" => "Qual melhor lanche da empresa?",
            "ordem" => 2,
            "obrigatoria" => 0,
            "opcoes" => [
                [
                    "id" => 1,
                    'descricao' => "Cachorro quente",
                    'ordem' => 1,
                ],
                [
                    "id" => 2,
                    'descricao' => "Coxinha",
                    'ordem' => 2,
                ]
            ]
        ])->assertStatus(200);
    }


    public function test_success_delete()
    {

        $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token
        ])->delete("/api/perguntas/1")->assertStatus(204);
    }
}
