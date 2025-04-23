<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('acomodacions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tipo_habitacion_id')->constrained()->onDelete('cascade');
            $table->integer('cantidad');
            $table->enum('acomodacion', ['Sencilla', 'Doble', 'Triple', 'Cuádruple']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('acomodacions');
    }
};
