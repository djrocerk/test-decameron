<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TipoHabitacion extends Model
{
    use HasFactory;

    protected $fillable = [
        'tipo',
        'hotel_id',
    ];

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }
}
