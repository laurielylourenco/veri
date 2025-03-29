<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PesquisaTest extends TestCase
{

    /* Teste para criar uma pesquisa */
    public function success_response_is_returned_after_create()
    {
        $this->postJson('/api/pesquisas', [

            "nome" => "Pesquisa de Satisfação Teste",
            "descricao" => "Pesquisa para avaliar a satisfação dos clientes isso teste."

        ])->assertExactJson([
            'message' => 'Pesquisa criada com sucesso!'
        ]);
    }


    public function success_response_is_returned_after_edit()
    {
        $response =  $this->putJson('/api/pesquisas/1', [
            "nome" => "Pesquisa de Satisfação Teste UPDATE",
            "descricao" => "Pesquisa para avaliar a satisfação dos clientes isso teste UPDATE."
        ]);

        $response->assertStatus(200);
    }


    /* Teste para criar uma pesquisa com erros */

    public function error_response_is_returned()
    {
       $response =  $this->postJson('/api/pesquisas', [
            "descricao" => "Pesquisa para avaliar a satisfação dos clientes isso teste."

        ])->assertExactJson([
            'message' => 'Erro ao criar uma pesquisa'
        ]);

        $response->assertStatus(201);
    }


    /* Requisição sem token */
    public function test_user_cannot_access_protected_route_with_invalid_token()
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer token_invalido'
        ])->postJson('/api/pesquisas', [
            "descricao" => "Pesquisa para avaliar a satisfação dos clientes isso teste."

        ]);

        $response->assertStatus(401); // Unauthorized
    }
}
