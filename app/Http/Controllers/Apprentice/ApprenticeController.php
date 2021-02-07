<?php

namespace App\Http\Controllers\Apprentice;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Apprentice;

class ApprenticeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('modules.Apprentice.index');
    }

    public function tp(){
        $tp = [['id_tp' => '1', 'acronym_tp' => 'CC', 'name_tp' => 'Cedula ciudadania'], ['id_tp' => '2', 'acronym_tp' => 'CE', 'name_tp' => 'Cedula extranjeria'], ['id_tp' => '3', 'acronym_tp' => 'TI','name_tp' => 'Tarjeta de identidad']];
        return response()->json($tp);
    }

    public function gender(){
        $tp = [['id_gender' => '1', 'acronym_gender' => 'M', 'name_gender' => 'Masculino'], ['id_gender' => '2', 'acronym_gender' => 'F', 'name_gender' => 'Femenino'], ['id_gender' => '3', 'acronym_gender' => 'O','name_gender' => 'Otros']];
        return response()->json($tp);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $datos = Apprentice::with('File')->get();
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
        $apprentice_email = $request->input('apprentice_email');
        $document_number = $request->input('document_number');
        $consulta = Apprentice::where([['apprentice_email','=',$apprentice_email],['document_number','=',$document_number]])->get();
        $respuesta = json_decode($consulta);
        if (empty($respuesta)){
            $apprentice = Apprentice::create($request->all());
            if ($apprentice){
                return response()->json(['status' => true, 'msg' => 'Datos guardados']);
            }else{
                return response()->json(['status' => false, 'msg' => 'Error']);
            }
        }else{
            return response()->json(['status' => false, 'msg' => 'El docuemnto o email ya existe.']);
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
        $datos = Apprentice::with('File')->findOrFail($id);
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
        $datos = Apprentice::findOrFail($id);
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
        $update = Apprentice::findOrFail($id);
        $update->file_id = $request->input('file_id');
        $update->document_number = $request->input('document_number');
        $update->apprentice_name = $request->input('apprentice_name');
        $update->apprentice_surname = $request->input('apprentice_surname');
        $update->apprentice_email = $request->input('apprentice_email');
        $update->birth_date = $request->input('birth_date');
        $update->apprentice_gender = $request->input('apprentice_gender');
        $update->document_type = $request->input('document_type');
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
        $delete = Apprentice::findOrFail($id)->delete();
        if ($delete){
            return response()->json(['status' => true, 'msg' => 'Aprendiz eliminado.']);
        }else{
            return response()->json(['status' => false, 'msg' => 'Error']);
        }
    }
}
