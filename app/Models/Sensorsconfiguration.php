<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sensorsconfiguration extends Model
{
    use HasFactory;

    protected $fillable = [
        'configuration_limit_value','configuration_max_value',
    ];


    protected $dates = ['deleted_at'];

    protected $appends = [
        'statusName',
        'datetimeval',
    ];

    public function getDatetimeValAttribute()
    {
        if($this->deleted_at!=NULL){
            return $this->deleted_at->format('M-d-Y'). ' '. $this->deleted_at->format('g:i:s A');
        }
    }    

    public function getStatusNameAttribute()
    { 
        $status="Active";
            
            if($this->isActive==0){
                $status = "Not Active";
            }
            return $status;
    }
}
