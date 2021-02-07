<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;
    protected $table = 'file';
    protected $primaryKey = 'file_id';
    protected $fillable = [
        'id_working_day', 'id_training_program','file_name','status_file'
    ];

    public function workingDay ()
    {
        return $this->belongsTo(WorkingDayli::class,'id_working_day','working_day_id');
    }

    public function trainingProgram(){
        return $this->belongsTo(TrainingProgram::class,'id_training_program','training_program_id');
    }
}
