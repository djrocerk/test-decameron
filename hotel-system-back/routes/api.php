<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\TipoHabitacionController;
use App\Http\Controllers\AcomodacionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Estas rutas están dentro del middleware "api"
| y están completamente separadas del sistema web.
| Ideal para comunicación con frontend (React).
*/

// CRUD de Hoteles
Route::apiResource('hoteles', HotelController::class);

// Rutas para tipos de habitación de un hotel
Route::prefix('hoteles/{hotel}')->group(function () {
    Route::get('tipos-habitacion', [TipoHabitacionController::class, 'index']);
    Route::post('tipos-habitacion', [TipoHabitacionController::class, 'store']);
    Route::get('tipos-habitacion/{tipo}', [TipoHabitacionController::class, 'show']);
    Route::put('tipos-habitacion/{tipo}', [TipoHabitacionController::class, 'update']);
    Route::delete('tipos-habitacion/{tipo}', [TipoHabitacionController::class, 'destroy']);

    // Rutas para acomodaciones dentro de un tipo de habitación
    Route::get('tipos-habitacion/{tipo}/acomodaciones', [AcomodacionController::class, 'index']);
    Route::post('tipos-habitacion/{tipo}/acomodaciones', [AcomodacionController::class, 'store']);
    Route::get('tipos-habitacion/{tipo}/acomodaciones/{acomodacion}', [AcomodacionController::class, 'show']);
    Route::delete('tipos-habitacion/{tipo}/acomodaciones/{acomodacion}', [AcomodacionController::class, 'destroy']);
});
