@extends('layouts.admin.app')
@extends('layouts.admin.components.Modals.modalTrainingProgram')
@extends('layouts.admin.components.Modals.modalViewTrainingProgram')
@section('content')
    <div class="app-title">
        <div>
            <h1><i class="fas fa-spinner"></i> Programa de formación <span>SENA-APP </span>
                <button class="btn btn-primary" type="button" onclick="openModalTrainingProgram()"><i class="fas fa-plus-circle"></i>
                    Nuevo </button>
            </h1>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="tile">
                <div class="tile-body">
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered dt-responsive nowrap" id="tableTrainingProgram">
                            <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Nombre</th>
                                <th>Acronimo</th>
                                <th>Fecha creación</th>
                                <th>Acciones</th>
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


