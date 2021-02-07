
<div class="modal fade" id="modalFormWorkingDaily" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header headerRegister">
                <h5 class="modal-title" id="titleModal">Nueva Jornada</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="formWorkingDaily" name="formWorkingDaily" class="form-horizontal">
                    @csrf
                    <input type="hidden" name="idWorkingDaily" id="idWorkingDaily">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="working_day_name">Nombre Jornada</label>
                            <input type="text" class="form-control" id="working_day_name" name="working_day_name" required="" autofocus>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="acrony_wd">Acronimo Jornada</label>
                            <input name="acrony_wd" id="acrony_wd" class="form-control">
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
