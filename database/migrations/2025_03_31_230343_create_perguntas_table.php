<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('perguntas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_pesquisa')->references('id')->on('pesquisas');
            $table->char('descricao', 255);
            $table->char('tipo', 50);
            $table->integer('obrigatoria');
            $table->integer('ordem');
            $table->timestamps();
        });


        Schema::create('opcoes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_pergunta')->references('id')->on('perguntas');
            $table->char('descricao', 255);
            $table->integer('ordem');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('opcoes');
        Schema::dropIfExists('perguntas');
    }
};
