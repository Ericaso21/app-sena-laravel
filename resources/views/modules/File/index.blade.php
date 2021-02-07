@extends('layouts.admin.app')
@extends('layouts.admin.components.Modals.modalFile')
@extends('layouts.admin.components.Modals.modalViewFile')
@section('content')
    <div class="app-title">
        <div>
            <h1><i class="fas fa-file-alt"></i> Ficha <span>SENA-APP </span>
                <button class="btn btn-primary" type="button" onclick="openModalFile()"><i class="fas fa-plus-circle"></i>
                    Nuevo </button>
            </h1>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="tile">
                <div class="tile-body">
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered dt-responsive nowrap" id="tableFile">
                            <thead>
                            <tr>
                                <th>Jornada</th>
                                <th>Programa formación</th>
                                <th>Nombre ficha</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                                <th>Fecha creación</th>
                            </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection


