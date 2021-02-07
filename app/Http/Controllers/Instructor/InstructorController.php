<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Instructor;
use App\Models\File;

class InstructorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('modules.Instructor.index');
    }

    public function getFile(){
        $datos = File::all()->where('status_file','=',"1");
        return $datos;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $datos = Instructor::with('File')->get();
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
        $file = $request->file('profile_phote');
        $nombre = $file->getClientOriginalName();
        \Storage::disk('locales')->put($nombre, \File::get($file));
        $instructor = Instructor::create([
            "file_id"=>$request->input('file_id'),
            "instructor_names"=>$request->input('instructor_names'),
            "surnames_instructor"=>$request->input('surnames_instructor'),
            "document_number"=>$request->input('document_number'),
            "profile_phote"=>$nombre,
            "status_instructor"=>$request->input('status_instructor')
        ]);
        if ($instructor){
            return response()->json(['status' => true, 'msg' => 'Datos guardados']);
        }else{
            return response()->json(['status' => false, 'msg' => 'Error']);
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
        $datos = Instructor::with('File')->findOrFail($id);
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
        $datos = Instructor::findOrFail($id);
        if (empty($datos)){
            return response()->json(['status'=>false, 'msg'=> 'Datos no encontrados']);
        }else{
            return response()->json(['status'=>true, 'data' => $datos]);
        }
    }

    public function inUpdates(Request $request, $id)
    {
        $file = $request->file('profile_phote');
        if (empty($file)){
            $update = Instructor::findOrFail($id);
            $update->file_id = $request->input('file_id');
            $update->instructor_names = $request->input('instructor_names');
            $update->surnames_instructor = $request->input('surnames_instructor');
            $update->document_number = $request->input('document_number');
            $update->status_instructor = $request->input('status_instructor');
            $update->save();
            if ($update){
                return response()->json(['status' => true, 'msg' => 'Datos actualizados']);
            }else{
                return response()->json(['status' => false, 'msg' => 'Error']);
            }
        }else{
            $nombre = $file->getClientOriginalName();
            \Storage::disk('locales')->put($nombre, \File::get($file));
            $updates = Instructor::findOrFail($id);
            $updates->file_id = $request->input('file_id');
            $updates->instructor_names = $request->input('instructor_names');
            $updates->surnames_instructor = $request->input('surnames_instructor');
            $updates->document_number = $request->input('document_number');
            $updates->profile_phote = $nombre;
            $updates->status_instructor = $request->input('status_instructor');
            $updates->save();
            if ($updates){
                return response()->json(['status' => true, 'msg' => 'Datos actualizados']);
            }else{
                return response()->json(['status' => false, 'msg' => 'Error']);
            }
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

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $update = Instructor::findOrFail($id);
        $update->status_instructor = 2;
        $update->save();
        if ($update){
            return response()->json(['status' => true, 'msg' => 'Ficha desactivada']);
        }else{
            return response()->json(['status' => false, 'msg' => 'Error']);
        }
    }
}
