
<div class="modal fade" id="modalFormApprentice" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header headerRegister">
                <h5 class="modal-title" id="titleModal">Nuevo Aprendiz</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="formApprentice" name="formApprentice" class="form-horizontal">
                    @csrf
                    <input type="hidden" name="idApprentice" id="idApprentice">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="file_id">Ficha</label>
                            <select name="file_id" id="file_id" class="form-control">
                                <option value="0">Seleccione..</option>
                            </select>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="document_number">Documento</label>
                            <input type="text" class="form-control" id="document_number" name="document_number" required="">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="apprentice_name">Nombres</label>
                            <input type="text" class="form-control" id="apprentice_name" name="apprentice_name" required="">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="apprentice_surname">Apellidos</label>
                            <input type="text" class="form-control" id="apprentice_surname" name="apprentice_surname" required="">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="apprentice_email">Email</label>
                            <input type="email" class="form-control" id="apprentice_email" name="apprentice_email" required="">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="birth_date">Fecha nacimiento</label>
                            <input type="date" class="form-control" id="birth_date" name="birth_date" required="">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="apprentice_gender">Genero</label>
                            <select name="apprentice_gender" id="apprentice_gender" class="form-control">
                                <option value="0">Seleccione..</option>
                            </select>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="document_type">Tipo de documento</label>
                            <select name="document_type" id="document_type" class="form-control">
                                <option value="0">Seleccione..</option>
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



