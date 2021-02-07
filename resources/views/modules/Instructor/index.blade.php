@extends('layouts.admin.app')
@extends('layouts.admin.components.Modals.modalInstructor')
@extends('layouts.admin.components.Modals.modalViewInstructor')
@section('content')
    <div class="app-title">
        <div>
            <h1><i class="fas fa-user"></i> Instructor <span>SENA-APP </span>
                <button class="btn btn-primary" type="button" onclick="openModalInstructor()"><i class="fas fa-plus-circle"></i>
                    Nuevo </button>
            </h1>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="tile">
                <div class="tile-body">
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered dt-responsive nowrap" id="tableInstructor">
                            <thead>
                            <tr>
                                <th>Ficha</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Documento</th>
                                <th>Foto</th>
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



