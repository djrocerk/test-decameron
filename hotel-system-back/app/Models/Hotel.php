<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'direccion',
        'ciudad',
        'nit',
        'numero_de_habitaciones',
    ];

    public function tipoHabitacions()
    {
        return $this->hasMany(TipoHabitacion::class);
    }
}
