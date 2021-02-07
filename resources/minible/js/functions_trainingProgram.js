let tableTrainingProgram;
document.addEventListener('DOMContentLoaded',function (){

    tableTrainingProgram = $('#tableTrainingProgram').dataTable( {
        "aProcessing":true,
        "aServerSide":true,
        "language":{
            "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"
        },
        "ajax":{
            "url": '/TrainingProgram/create',
            "dataSrc":""
        },
        "columns":[
            {data: "training_program_code"},
            {data: "training_program_name"},
            {data: "training_program_acronym"},
            {data: "created_at"},
            {data: "training_program_id","render": function (data ,type ,row) {
                    return '<div class="text-center"><button class="btn btn-info btn-sm btnViewUsers" onClick="ftnTrainingProgram('+row.training_program_id+')" title="Ver usuario"><i class="far fa-eye"></i></button><button class="btn btn-primary btn-sm btnEditUsers" onClick="ftnEditTrainingProgram('+row.training_program_id+')" title="Editar"><i class="fas fa-pencil-alt"></i></button></div>'
                }}
        ],
        "responsive":"true",
        "bDestroy": true,
        "iDisplayLength": 5,
        "order": [[0,"des"]]

    });
    //nuevo usuario
    if (document.querySelector('#formTrainingProgram')) {
        var formTrainingProgram = document.querySelector('#formTrainingProgram');
        formTrainingProgram.onsubmit = function (e) {
            e.preventDefault();
            let token = '{{csrf_token()}}';
            let idTrainingProgram = document.querySelector('#idTrainingProgram').value;
            let training_program_code = document.querySelector('#training_program_code').value;
            let training_program_name = document.querySelector('#training_program_name').value;
            let training_program_acronym = document.querySelector('#training_program_acronym').value;

            if (training_program_code == '' || training_program_name == '' || training_program_acronym == '' || token == '') {
                swal('Atención', "Todos los campos son obligatorios.", "error");
                return false;
            }

            let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            let ajaxUrl = '/TrainingProgram';
            let formData = new FormData(formTrainingProgram);
            if (idTrainingProgram == '') {
                request.open("POST", ajaxUrl, true);
                request.send(formData);
            } else {
                let formDataJson = {
                    '_token': $('input[name=_token]').val(),
                    "training_program_code": training_program_code,
                    "training_program_name": training_program_name,
                    "training_program_acronym": training_program_acronym
                };
                let ajaxUrl = '/TrainingProgram/'+idTrainingProgram
                request.open("PUT",ajaxUrl,true);
                request.setRequestHeader("Content-Type", "application/json");
                request.send(JSON.stringify(formDataJson));
            }


            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    let objData = JSON.parse(request.responseText);
                    console.log(objData);
                    if (objData.status) {
                        $('#modalFormTrainingProgram').modal("hide");
                        formTrainingProgram.reset();
                        Swal.fire("Programa formación", objData.msg, "success");
                        tableTrainingProgram.api().ajax.reload();
                    } else {
                        Swal.fire('Error', objData.msg, "error");
                    }
                }
            }
        }
    }
},false);

//modal mostrar usuario
function ftnTrainingProgram(training_program_id) {

    let Training_program_id = training_program_id;
    let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    let ajaxUrl = '/TrainingProgram/'+Training_program_id;
    request.open("GET",ajaxUrl,true);
    request.send();
    request.onreadystatechange = function() {
        if(request.readyState == 4 && request.status == 200){
            let objData = JSON.parse(request.responseText);
            if (objData.status) {
                document.querySelector('#celtraining_program_code').innerHTML = objData.data.training_program_code;
                document.querySelector('#celtraining_program_name').innerHTML = objData.data.training_program_name;
                document.querySelector('#celtraining_program_acronym').innerHTML = objData.data.training_program_acronym;
                document.querySelector('#celcreated_at').innerHTML = objData.data.created_at;
                document.querySelector('#celupdated_at').innerHTML = objData.data.updated_at;
                $('#modalTrainingProgram').modal('show');
            }else{
                Swal.fire("Error", objData.msg ,"error");
            }
        }
    }
}

//mostar modal actualizar
function ftnEditTrainingProgram(training_program_id) {

    document.querySelector('#titleModal').innerHTML = "Actualizar programa de formación";
    document.querySelector('.modal-header').classList.replace("headerRegister", "headerUpdate");
    document.querySelector('#btnActionForm').classList.replace("btn-primary", "btn-info");
    document.querySelector('#btnText').innerHTML = "Actualizar";

    let Training_program_id = training_program_id;
    let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    let ajaxUrl = '/TrainingProgram/'+Training_program_id;
    request.open("GET",ajaxUrl,true);
    request.send();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            let objData = JSON.parse(request.responseText);
            if(objData.status){
                document.querySelector('#idTrainingProgram').value = objData.data.training_program_id;
                document.querySelector('#training_program_code').value = objData.data.training_program_code;
                document.querySelector('#training_program_name').value = objData.data.training_program_name;
                document.querySelector('#training_program_acronym').value = objData.data.training_program_acronym;
            }
        }
        $('#modalFormTrainingProgram').modal('show');
    }
}

$('#tableTrainingProgram').DataTable();


function openModalTrainingProgram() {

    document.querySelector('#idTrainingProgram').value = "";
    document.querySelector('.modal-header').classList.replace("headerUpdate", "headerRegister");
    document.querySelector('#btnActionForm').classList.replace("btn-info", "btn-primary");
    document.querySelector('#btnText').innerHTML = "Guardar";
    document.querySelector('#titleModal').innerHTML = "Nuevo Programa de formación";
    document.querySelector('#formTrainingProgram').reset();

    $('#modalFormTrainingProgram').modal('show');
}
