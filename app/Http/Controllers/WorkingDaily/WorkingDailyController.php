<?php

namespace App\Http\Controllers\WorkingDaily;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\WorkingDayli;

class WorkingDailyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('modules.workingDaily.index');
    }

    public function getWorkingDaily()
    {
        $workinDaily = WorkingDayli::all();
        return $workinDaily;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $working_day_name = $request->input('$working_day_name');
        $consulta = WorkingDayli::where('working_day_name', '=', $working_day_name)->get();
        $respuesta = json_decode($consulta);
        if (empty($respuesta)){
            $workingDaily =  WorkingDayli::create($request->all());
            if ($workingDaily) {
                return response()->json(['status' => true, 'msg' => 'Datos guardados']);
            }else{
                return response()->json(['status' => false, 'msg' => 'Error']);
            }
        }else {
            return response()->json(['status' => false, 'msg' => 'Esta Jornada ya existe.']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $datos = WorkingDayli::findOrFail($id);
        if (empty($datos)){
            return response()->json(['status'=>false, 'msg'=> 'Datos no encontrados']);
        }else{
            return response()->json(['status'=>true, 'data' => $datos]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $update = WorkingDayli::findOrFail($id);
        $update->working_day_name = $request->input('working_day_name');
        $update->acrony_wd = $request->input('acrony_wd');
        $update->save();
        if ($update){
            return response()->json(['status' => true, 'msg' => 'Datos actualizados']);
        }else{
            return response()->json(['status' => false, 'msg' => 'Error']);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $delete = WorkingDayli::findOrFail($id)->delete();
        if ($delete){
            return response()->json(['status' => true, 'msg' => 'Jornada eliminada con exito.']);
        }else{
            return response()->json(['status' => false, 'msg' => 'Error']);
        }
    }
}
