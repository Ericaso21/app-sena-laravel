<?php

namespace App\Http\Controllers\TrainingProgram;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TrainingProgram;

class TrainingProgramController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('modules.TrainingProgram.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $datos = TrainingProgram::all();
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
        $training_program_code = $request->input('training_program_code');
        $training_program_name = $request->input('training_program_name');
        $consulta = TrainingProgram::where([['training_program_code','=',$training_program_code],['training_program_name','=', $training_program_name]])->first();
        $respuesta = json_decode($consulta);
        if (empty($respuesta)) {
            $trainingProgram = TrainingProgram::create($request->all());
            if ($trainingProgram){
                return response()->json(['status' => true, 'msg' => 'Datos guardados']);
            }else{
                return response()->json(['status' => false, 'msg' => 'Error']);
            }
        }else{
            return response()->json(['status' => false, 'msg' => 'Este progrma ya existe.']);
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
        $datos = TrainingProgram::findOrFail($id);
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
        //
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
        $update = TrainingProgram::findOrFail($id);
        $update->training_program_code = $request->input('training_program_code');
        $update->training_program_name = $request->input('training_program_name');
        $update->training_program_acronym = $request->input('training_program_acronym');
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
        //
    }
}
