<?php

namespace App\Http\Controllers;

use App\Models\TipoHabitacion;
use App\Models\Hotel;
use Illuminate\Http\Request;

class TipoHabitacionController extends Controller
{
    public function store(Request $request, $hotel_id)
    {
        $hotel = Hotel::findOrFail($hotel_id);

        $request->validate([
            'tipo' => 'required|string|in:Estándar,Junior,Suite',
        ]);

        $tipoHabitacion = new TipoHabitacion($request->all());
        $hotel->tipoHabitacions()->save($tipoHabitacion);

        return response()->json($tipoHabitacion, 201);
    }
}
