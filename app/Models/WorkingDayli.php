<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class WorkingDayli extends Model
{
    use HasFactory,SoftDeletes;
    protected $table = 'working_day';
    protected $primaryKey = 'working_day_id';
    protected $fillable = [
        'working_day_name', 'acrony_wd'
    ];
    protected $dates = ['deleted_att'];
}
