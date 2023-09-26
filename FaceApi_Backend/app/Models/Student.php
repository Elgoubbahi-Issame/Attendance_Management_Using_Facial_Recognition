<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{

    use HasFactory, HasApiTokens, Notifiable;
    protected $fillable = [
        'first_name',
        'last_name',
        'CIN',
        'image',
        'classroom_id',
        'validation'
    ];
}
