<?php

namespace Tests\Feature;

use App\Models\Pesquisa;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PesquisaTest extends TestCase
{
    use RefreshDatabase;

    protected $token;
    protected $user;
    protected $pesquisa;

    protected function setUp(): void
    {
        parent::setUp();

        // Cria o usuário usando factory

        $this->user = User::factory()->create([
            "name" => "teste",
            'email' => 'teste@email.com',
            'password' => bcrypt('123456'),
        ]);

        // Faz login e obtém o token
        $response = $this->postJson('/api/login', [
            'email' => 'teste@email.com',
            'password' => '123456',
        ]);

        $this->token = $response->json('token');

        // Cria a pesquisa usando factory
        $this->pesquisa = Pesquisa::factory()->create([
            "nome" => "Pesquisa de Satisfação TESTE",
            "descricao" => "Pesquisa para avaliar a satisfação TESTE"
        ]);
    }

    public function test_success_response_is_returned_after_create()
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->postJson('/api/pesquisas', [
            "nome" => "Pesquisa de Satisfação Teste",
            "descricao" => "Pesquisa para avaliar a satisfação dos clientes isso teste."
        ]);

        $response->assertExactJson([
            'message' => 'Pesquisa criada com sucesso!'
        ]);
    }

    public function test_success_response_is_returned_after_edit()
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->putJson('/api/pesquisas/' . $this->pesquisa->id, [
            "nome" => "Pesquisa de Satisfação Teste UPDATE",
            "descricao" => "Pesquisa para avaliar a satisfação dos clientes isso teste UPDATE."
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('pesquisas', [
            'id' => $this->pesquisa->id,
            'nome' => 'Pesquisa de Satisfação Teste UPDATE',
            'descricao' => 'Pesquisa para avaliar a satisfação dos clientes isso teste UPDATE.'
        ]);
    }

    /* Teste para criar uma pesquisa com erros */

    public function test_user_cannot_access_protected_route_with_invalid_token()
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer token_invalido'
        ])->postJson('/api/pesquisas', [
            "descricao" => "Pesquisa para avaliar a satisfação dos clientes isso teste."

        ]);

        $response->assertStatus(401); // Unauthorized
    }


    public function test_error_response_is_returned()
    {
        $response =  $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->postJson('/api/pesquisas', [
            "descricao" => "Pesquisa para avaliar a satisfação dos clientes isso teste."

        ])->assertExactJson([
            'message' => 'O nome é obrigatório!',
            'errors' => [
                'nome' => [
                    'O nome é obrigatório!'
                ]
            ]
        ]);

        $response->assertStatus(422);
    }
}
