
<div class="modal fade" id="modalFormFile" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header headerRegister">
                <h5 class="modal-title" id="titleModal">Nueva ficha</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="formFile" name="formFile" class="form-horizontal">
                    @csrf
                    <input type="hidden" name="idFile" id="idFile">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="id_working_day">Jornada</label>
                            <select name="id_working_day" id="id_working_day" class="form-control">
                                <option value="0">Seleccione..</option>
                            </select>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="id_training_program">Programa de formación</label>
                            <select name="id_training_program" id="id_training_program" class="form-control">
                                <option value="0">Seleccione..</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="file_name">Nombre ficha</label>
                            <input type="text" class="form-control" id="file_name" name="file_name"
                                   required="">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="second_name">Estado</label>
                            <select name="status_file" id="status_file" class="form-control">
                                <option value="0">Seleccione...</option>
                                <option value="1">Activo</option>
                                <option value="2">Inactivo</option>
                            </select>
                        </div>
                    </div>
                    <div class="tile-footer">
                        <button id="btnActionForm" class="btn btn-primary" type="submit"><i
                                class="fa fa-fw fa-lg fa-check-circle"></i><span
                                id="btnText">Guardar</span></button>
                        <button class="btn btn-danger" type="button" data-dismiss="modal"><i class="fa fa-fw fa-lg fa-times-circle"></i>Cerrar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

