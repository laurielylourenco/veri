<?php

namespace App\Providers;

use App\Repositories\PerguntaRepository;
use App\Repositories\PerguntaRepositoryInterface;
use App\Repositories\PesquisaRepository;
use App\Repositories\PesquisaRepositoryInterface;
use App\Service\PerguntaService;
use App\Service\PesquisaService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     * 
     * 
     */
    public function register(): void
    {
        //Isso permite que o Laravel resolva a interface PesquisaRepositoryInterface com a classe PesquisaRepository

        $this->app->bind(PesquisaRepositoryInterface::class, PesquisaRepository::class);
        $this->app->bind(PerguntaRepositoryInterface::class, PerguntaRepository::class);



        $this->app->bind(PesquisaService::class, function ($app) {
            return new PesquisaService($app->make(PesquisaRepositoryInterface::class));
        });

        $this->app->bind(PerguntaService::class, function ($app) {
            return new PerguntaService($app->make(PerguntaRepositoryInterface::class));
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
    }
}
