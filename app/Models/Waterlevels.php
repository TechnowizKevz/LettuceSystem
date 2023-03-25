<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Waterlevels extends Model
{
    use HasFactory;

    protected $fillable = [
        'waterlevel',
    ];

    protected $appends = [
        'date',
        'time',
        'statusName'
    ];

    public function getDateAttribute()
    {
        return $this->created_at? $this->created_at->format('M-d-Y'): null;
    }

    public function getTimeAttribute()
    {
        return $this->created_at? $this->created_at->format('g:i A'): null;
    }

    public function getstatusNameAttribute()
    {
        $stat="";
        if($this->status==0){
            $stat = "High Water Level";
        }else if($this->status==1){
            $stat = "Good Water Level";
        }else if($this->status==2){
            $stat = "Low Water Level";
        }
        return $stat;
    }
}
