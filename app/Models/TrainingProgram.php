<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrainingProgram extends Model
{
    use HasFactory;
    protected $table = 'training_program';
    protected $primaryKey = 'training_program_id';
    protected $fillable = [
        'training_program_code', 'training_program_name', 'training_program_acronym'
    ];
}
