<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Apprentice extends Model
{
    use HasFactory,SoftDeletes;
    protected $table = 'apprentice';
    protected $primaryKey = 'apprentice_id';
    protected $fillable = [
        'file_id','document_number', 'apprentice_name', 'apprentice_surname','apprentice_email','birth_date','apprentice_gender','document_type'
    ];
    protected $dates = ['deleted_att'];

    public function File() {
        return $this->belongsTo(File::class,'file_id','file_id');
    }

}
