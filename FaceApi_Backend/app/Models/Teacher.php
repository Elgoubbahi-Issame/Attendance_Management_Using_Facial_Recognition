<?php

namespace App\Models;

// use Laravel\Passport\HasApiTokens;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;


class Teacher  extends Authenticatable
{

    use HasFactory, HasApiTokens, Notifiable;
    protected $primaryKey = 'teacher_id';


    protected $fillable = [
        'first_name',
        'last_name',
        'email',
    ];
    // public function __construct()
    // {
    //     $this->middelware('auth:api');
    // }
    // use HasApiTokens;
    // protected $hidden = ['created_at', 'updated_at'];
    // protected $hidden = [
    //     "updated_at",
    //     "session_id"
    // ];
}
