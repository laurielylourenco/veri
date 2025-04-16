<?php

namespace App\Service;

use App\Models\Pergunta;
use App\Models\Pesquisa;
use App\Repositories\PerguntaRepositoryInterface;

class PerguntaService
{

    public function __construct(protected PerguntaRepositoryInterface $pergunta_repository) {}


    public function all(Pesquisa $pesquisa): \Illuminate\Database\Eloquent\Collection
    {
        return $this->pergunta_repository->all($pesquisa);
    }

    

    public function create(array $data)
    {

        
        // Primeiro cria a pergunta básica

         $pergunta = $this->pergunta_repository->create($data);

        // Verifica se é um tipo de pergunta que requer opções e se opções foram fornecidas
        if ($this->perguntaRequerOpcoes($data['tipo']) && isset($data['opcoes'])) {   
           $this->handleOpcoes($pergunta, $data['opcoes']);
        }

        return $pergunta; 
    }

    protected function perguntaRequerOpcoes(string $tipo): bool
    {
        // Lista de tipos de perguntas que requerem opções
        return in_array($tipo, ['multipla_escolha', 'unica_escolha', 'selecao_multipla']);
    }

    protected function handleOpcoes(Pergunta $pergunta, array $opcoes): void
    {

        if (count($opcoes) > 0) {

            // Verifica se as opções têm a estrutura esperada
            if (!isset($opcoes[0]['descricao'])) {
                throw new \InvalidArgumentException('As opções devem conter a chave "descricao"');
            }

            // Adiciona as opções à pergunta
            $this->pergunta_repository->addOptions($pergunta->id, $opcoes);
        }
    }


    public function update (int $id, array $data){

        $pergunta = $this->pergunta_repository->update($id, $data);

        // Verifica se é um tipo de pergunta que requer opções e se opções foram fornecidas
        if ($this->perguntaRequerOpcoes($data['tipo']) && isset($data['opcoes'])) {   

            $this->pergunta_repository->updateOptions($pergunta->id, $data['opcoes']);
        }


        return $pergunta;
    }
}
