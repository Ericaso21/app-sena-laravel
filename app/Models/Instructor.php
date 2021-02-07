<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Instructor extends Model
{
    use HasFactory;
    protected $table = 'instructor';
    protected $primaryKey = 'instructor_id';
    protected $fillable = [
        'file_id','instructor_names','surnames_instructor','document_number','profile_phote','status_instructor'
    ];

    public function File() {
        return $this->belongsTo(File::class,'file_id','file_id');
    }
}
