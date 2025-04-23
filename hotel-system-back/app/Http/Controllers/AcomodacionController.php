<?php

namespace App\Http\Controllers;

use App\Models\Acomodacion;
use App\Models\TipoHabitacion;
use Illuminate\Http\Request;

class AcomodacionController extends Controller
{
    public function store(Request $request, $tipo_habitacion_id)
    {
        $tipoHabitacion = TipoHabitacion::findOrFail($tipo_habitacion_id);

        $request->validate([
            'cantidad' => 'required|integer',
            'acomodacion' => 'required|string|in:Sencilla,Doble,Triple,Cuádruple',
        ]);
        // Implemente validaciones desde el back tambien
        if ($tipoHabitacion->tipo == 'Estándar' && !in_array($request->acomodacion, ['Sencilla', 'Doble'])) {
            return response()->json(['error' => 'Acomodación no válida para este tipo de habitación'], 400);
        }
        if ($tipoHabitacion->tipo == 'Junior' && !in_array($request->acomodacion, ['Triple', 'Cuádruple'])) {
            return response()->json(['error' => 'Acomodación no válida para este tipo de habitación'], 400);
        }
        if ($tipoHabitacion->tipo == 'Suite' && !in_array($request->acomodacion, ['Sencilla', 'Doble', 'Triple'])) {
            return response()->json(['error' => 'Acomodación no válida para este tipo de habitación'], 400);
        }

        $acomodacion = new Acomodacion($request->all());
        $tipoHabitacion->acomodacions()->save($acomodacion);

        return response()->json($acomodacion, 201);
    }
}
