<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pesquisas', function (Blueprint $table) {

            $table->id();
            $table->uuid('token_pesquisa');
            $table->char('nome', 50)->nullable(false);
            $table->mediumText('descricao');
            $table->foreignId('id_criador')->references('id')->on('users');
            $table->char('url', 100)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pesquisas');
    }
};
