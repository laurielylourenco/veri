<?php

namespace App\Providers;

use App\Repositories\PesquisaRepository;
use App\Repositories\PesquisaRepositoryInterface;
use App\Service\PesquisaService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     * 
     * Meu nome Lauriely, começei com dev 19 aos anos empresa software para comunicação entra cliente e empresas onde atuo em projeto chat-omichannel.
*Entre nesse projeto para começar ele junto ao senior onde realizei atividade integração rest, webhooks junto aos redes sociais é para fazer chat funcionar melhor foi usando websockets para comunição então tenho muita experiencia nessa parte esse projeto foi grande desafio pois empresa queria entrar nesse mercado hoje ele já conta mais 40 clientes alem do uso interno da empresa, foi projeto que evolui muito.
*Já nao sou mais junior como eu entrei
     */
    public function register(): void
    {
        //Isso permite que o Laravel resolva a interface PesquisaRepositoryInterface com a classe PesquisaRepository

        $this->app->bind(PesquisaRepositoryInterface::class, PesquisaRepository::class);


        $this->app->bind(PesquisaService::class, function ($app) {
            return new PesquisaService($app->make(PesquisaRepositoryInterface::class));
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
