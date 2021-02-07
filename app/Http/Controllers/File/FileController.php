<?php

namespace App\Http\Controllers\File;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\File;

class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('modules.File.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $datos = File::with('workingDay','trainingProgram')->get();
        return $datos;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $file_name = $request->input('file_name');
        $consulta = File::where('file_name', '=', $file_name)->get();
        $respuesta = json_decode($consulta);
        if (empty($respuesta)) {
            $file = File::create($request->all());
            if ($file){
                return response()->json(['status' => true, 'msg' => 'Datos guardados']);
            }else{
                return response()->json(['status' => false, 'msg' => 'Error']);
            }
        }else {
            return response()->json(['status' => false, 'msg' => 'El nombre de la ficha ya existe.']);
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
        $datos = File::findOrFail($id);
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
        $datos = File::with('workingDay','trainingProgram')->findOrFail($id);
        if (empty($datos)){
            return response()->json(['status'=>false, 'msg'=> 'Datos no encontrados']);
        }else{
            return response()->json(['status'=>true, 'data' => $datos]);
        }
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
        $update = File::findOrFail($id);
        $update->id_working_day = $request->input('id_working_day');
        $update->id_training_program = $request->input('id_training_program');
        $update->file_name = $request->input('file_name');
        $update->status_file = $request->input('status_file');
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
        $update = File::findOrFail($id);
        $update->status_file = 2;
        $update->save();
        if ($update){
            return response()->json(['status' => true, 'msg' => 'Ficha desactivada']);
        }else{
            return response()->json(['status' => false, 'msg' => 'Error']);
        }

    }
}
