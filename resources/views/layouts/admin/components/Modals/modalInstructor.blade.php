
<div class="modal fade" id="modalFormInstructor" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header headerRegister">
                <h5 class="modal-title" id="titleModal">Nuevo Instructor</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="formInstructor" name="formInstructor" class="form-horizontal">
                    @csrf
                    <input type="hidden" name="idInstructor" id="idInstructor">
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="file_id">Ficha</label>
                            <select name="file_id" id="file_id" class="form-control">
                                <option value="0">Seleccione..</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="instructor_names">Nombres</label>
                            <input type="text" class="form-control" id="instructor_names" name="instructor_names" required="">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="surnames_instructor">Apellidos</label>
                            <input type="text" class="form-control" id="surnames_instructor" name="surnames_instructor" required="">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="document_number">Documento</label>
                            <input type="text" class="form-control" id="document_number" name="document_number" required="">
                        </div>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="inputGroupFileAddon01">LOGO</span>
                                </div>
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" name="profile_phote" id="profile_phote" aria-describedby="inputGroupFileAddon01">
                                    <label class="custom-file-label" for="inputGroupFile01">Logo</label>
                                </div>
                            </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="status_instructor">Estado</label>
                            <select name="status_instructor" id="status_instructor" class="form-control">
                                <option value="0">Seleccione..</option>
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


