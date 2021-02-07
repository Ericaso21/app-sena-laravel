
<div class="modal fade" id="modalFormTrainingProgram" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header headerRegister">
                <h5 class="modal-title" id="titleModal">Nuevo Programa de formación</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="formTrainingProgram" name="formTrainingProgram" class="form-horizontal">
                    @csrf
                    <input type="hidden" name="idTrainingProgram" id="idTrainingProgram">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="training_program_code">Codigo programa de formación</label>
                            <input type="text" class="form-control" id="training_program_code" name="training_program_code" required="">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="training_program_name">Nombre programa de formación</label>
                            <input type="text" class="form-control" id="training_program_name" name="training_program_name" required="">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="training_program_acronym">Acronimo Programa de formación</label>
                            <input type="text" class="form-control" id="training_program_acronym" name="training_program_acronym" onkeyup="javascript:this.value=this.value.toUpperCase();">
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

