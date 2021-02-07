@extends('layouts.admin.app')
@extends('layouts.admin.components.Modals.modalWorkingDaily')
@extends('layouts.admin.components.Modals.modalViewWorkingDaily')
@section('content')
    <div class="app-title">
        <div>
            <h1><i class="fas fa-laptop-house"></i> Jornadas <span>SENA-APP </span>
                <button class="btn btn-primary" type="button" onclick="openModalWorkingModal()"><i class="fas fa-plus-circle"></i>
                    Nuevo </button>
            </h1>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="tile">
                <div class="tile-body">
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered dt-responsive nowrap" id="tableWorkingDaily">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre Jornada</th>
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

