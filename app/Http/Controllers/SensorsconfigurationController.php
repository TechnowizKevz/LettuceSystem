<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sensorsconfiguration;
use PDF;

class SensorsconfigurationController extends Controller
{
    public function index()
    {
        $sensorsconfiguration=Sensorsconfiguration::whereNull('deleted_at')->get();
        return response()->json($sensorsconfiguration);
    }

    public function index1()
    {
        $sensorsconfiguration=Sensorsconfiguration::whereNull('deleted_at')->where('isActive','1')->get();
        return response()->json($sensorsconfiguration);
    }

    public function index2()
    {
        $sensorsconfiguration=Sensorsconfiguration::where('deleted_at','!=',NULL)->get();
        return response()->json($sensorsconfiguration);
    }

    public function save(Request $request)
    {
        $input = $request->all();
        $sensorsconfiguration=Sensorsconfiguration::create($input); 
        return response()->json($sensorsconfiguration);
    }

    public function save2(Request $request)
    {
        $input = $request->all();
        $sensorsconfiguration=Sensorsconfiguration::create($input); 
        return response()->json($sensorsconfiguration);
    }
    
    public function save3(Request $request)
    {
        $input = $request->all();
        $sensorsconfiguration=Sensorsconfiguration::create($input); 
        return response()->json($sensorsconfiguration);
    }

    public function save4(Request $request)
    {
        $input = $request->all();
        $sensorsconfiguration=Sensorsconfiguration::create($input); 
        return response()->json($sensorsconfiguration);
    }

    public function update(Request $request, Sensorsconfiguration $sensorsconfigurations)
    {
        $input = $request->all();
        $sensorsconfigurations->update($input);
        return response()->json($sensorsconfigurations, 200);
    }

    public function destroy(Sensorsconfiguration $sensorsconfiguration)
    {
        $sensorsconfiguration->deleted_at = Carbon::tomorrow();
        $sensorsconfiguration->update();
        return response()->json(array('success'=>true));
    }

    public function recover(Sensorsconfiguration $sensorsconfiguration)
    {
        $sensorsconfiguration->deleted_at = NULL;
        $sensorsconfiguration->update();
        return response()->json(array('success'=>true));
    }
    
    public function activate(Sensorsconfiguration $sensorsconfiguration)
    {
        $sensorsconfiguration->where('id','!=',$sensorsconfiguration->id)->update(['isActive' => 0]);
        $sensorsconfiguration->where('id','=',$sensorsconfiguration->id)->update(['isActive' => 1]);
        return response()->json(array('success'=>true));
    }
}
