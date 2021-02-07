let tableFile;
document.addEventListener('DOMContentLoaded',function (){

    tableFile = $('#tableFile').dataTable( {
        "aProcessing":true,
        "aServerSide":true,
        "language":{
            "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"
        },
        "ajax":{
            "url": '/File/create',
            "dataSrc":""
        },
        "columns":[
            {data: "working_day.working_day_name"},
            {data: "training_program.training_program_name"},
            {data: "file_name"},
            {data: "status_file", "searchable": false, "orderable":false, "render": function (data, type ,row) {
                    if (row.status_file == 1) {
                        return '<span class="badge badge-success">Activo</span>';
                    } else {
                        return '<span class="badge badge-danger">Inactivo</span>';
                    }
            }},
            {data: "file_id","render": function (data ,type ,row) {
                    return '<div class="text-center"><button class="btn btn-info btn-sm btnViewUsers" onClick="ftnFile('+row.file_id+')" title="Ver usuario"><i class="far fa-eye"></i></button><button class="btn btn-primary btn-sm btnEditUsers" onClick="ftnEditFile('+row.file_id+')" title="Editar"><i class="fas fa-pencil-alt"></i></button><button class="btn btn-danger btn-sm btnDelUser" onClick="ftnInFile('+row.file_id+')" title="Desactivar"><i class="fas fa-times-circle"></i></button></div>'
            }},
            {data: "created_at"},
        ],
        "bDestroy": true,
        "iDisplayLength": 10,
        "order": [[0,"des"]]

    });
    //nuevo usuario
    if (document.querySelector('#formFile')) {
        let formFile = document.querySelector('#formFile');
        formFile.onsubmit = function (e) {
            e.preventDefault();
            let token = '{{csrf_token()}}';
            let idFile = document.querySelector('#idFile').value;
            let id_working_day = document.querySelector('#id_working_day').value;
            let id_training_program = document.querySelector('#id_training_program').value;
            let file_name = document.querySelector('#file_name').value;
            let status_file = document.querySelector('#status_file').value;

            if (id_working_day == 0 || id_training_program == 0 || file_name == "" || status_file == 0) {
                Swal.fire('Atención', "Todos los campos son obligatorios.", "error");
                return false;
            }

            let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            let ajaxUrl = '/File';
            let formData = new FormData(formFile);
            if (idFile == '') {
                request.open("POST", ajaxUrl, true);
                request.send(formData);
            } else {
                let formDataJson = {
                    '_token': $('input[name=_token]').val(),
                    "id_working_day": id_working_day,
                    "id_training_program": id_training_program,
                    "file_name": file_name,
                    "status_file": status_file
                };
                let ajaxUrl = '/File/'+idFile;
                request.open("PUT",ajaxUrl,true);
                request.setRequestHeader("Content-Type", "application/json");
                request.send(JSON.stringify(formDataJson));
            }


            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    let objData = JSON.parse(request.responseText);
                    if (objData.status) {
                        $('#modalFormFile').modal("hide");
                        formFile.reset();
                        Swal.fire("Ficha", objData.msg, "success");
                        tableFile.api().ajax.reload();
                    } else {
                        Swal.fire('Error', objData.msg, "error");
                    }
                }
            }
        }
    }
},false);

//mostar file
function ftnFile(file_id) {

    let File_id = file_id;
    let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    let ajaxUrl = '/File/'+File_id+'/edit';
    request.open("GET",ajaxUrl,true);
    request.send();
    request.onreadystatechange = function() {
        if(request.readyState == 4 && request.status == 200){
            let objData = JSON.parse(request.responseText);
            console.log(objData);
            if (objData.status) {
                document.querySelector('#celid_working_day').innerHTML = objData.data.working_day.working_day_name;
                document.querySelector('#celid_training_program').innerHTML = objData.data.training_program.training_program_name;
                document.querySelector('#celfile_name').innerHTML = objData.data.file_name;
                if (objData.data.status_file == 1) {
                    var span = '<span class="badge badge-success">Activo</span>';
                } else {
                    var span = '<span class="badge badge-danger">Inactivo</span>';
                }
                document.querySelector('#celstatus_file').innerHTML = span;
                document.querySelector('#celcreated_at').innerHTML = objData.data.created_at;
                document.querySelector('#celupdated_at').innerHTML = objData.data.updated_at;
                $('#modalViewFile').modal('show');
            }else{
                Swal.fire("Error", objData.msg ,"error");
            }
        }
    }
}

//mostar modal actualizar
function ftnEditFile(file_id) {

    document.querySelector('#titleModal').innerHTML = "Actualizar Ficha";
    document.querySelector('.modal-header').classList.replace("headerRegister", "headerUpdate");
    document.querySelector('#btnActionForm').classList.replace("btn-primary", "btn-info");
    document.querySelector('#btnText').innerHTML = "Actualizar";

    let File_id = file_id;
    let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    let ajaxUrl = '/File/'+File_id;
    request.open("GET",ajaxUrl,true);
    request.send();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            let objData = JSON.parse(request.responseText);
            if(objData.status){
                document.querySelector('#idFile').value = objData.data.file_id;
                document.querySelector('#id_working_day').value = objData.data.id_working_day;
                document.querySelector('#id_training_program').value = objData.data.id_training_program;
                document.querySelector('#file_name').value = objData.data.file_name;
                document.querySelector('#status_file').value = objData.data.status_file;
            }
        }
        $('#modalFormFile').modal('show');
    }
}

//in file
function ftnInFile(file_id) {
    let File_id= file_id;

    Swal.fire({
        title: "Desactivar Ficha",
        text: "¿Realmente quiere desactivar la ficha?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, desactivar!",
        cancelButtonText: "No, cancelar!"
    }).then((result)=> {

        if (result.isConfirmed)
        {
            let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            let ajaxUrl = '/File/'+File_id;
            let jsonData = {"file_id":File_id,'_token': $('input[name=_token]').val()};
            request.open("DELETE",ajaxUrl,true);
            request.setRequestHeader("Content-Type", "application/json");
            request.send(JSON.stringify(jsonData));
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    let objData = JSON.parse(request.responseText);
                    if (objData.status) {
                        Swal.fire("Desactivar", objData.msg, "success");
                        tableFile.api().ajax.reload();
                    } else {
                        Swal.fire("Atención", objData.msg, "error");
                    }
                }
            }
        }
    });
}
$('#tableFile').DataTable();

window.addEventListener('load', function (){
    ftnWorkingDay();
    ftnTrainingProgram();
},false);

function ftnWorkingDay() {
    let ajaxUrl = '/workingsDaily';
    let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    request.open("GET",ajaxUrl,true);
    request.send();

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            let objData = JSON.parse(request.responseText);
            let $select = $('#id_working_day');
            $.each(objData,function (working_day_id, name) {
                $select.append('<option value="'+name.working_day_id+'">'+name.working_day_name+'</option>');
            });
        }
    }
}

function ftnTrainingProgram() {
    let ajaxUrl = '/TrainingProgram/create';
    let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    request.open("GET",ajaxUrl,true);
    request.send();

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            let objData = JSON.parse(request.responseText);
            let $select = $('#id_training_program');
            $.each(objData,function (training_program_id, name) {
                $select.append('<option value="'+name.training_program_id+'">'+name.training_program_name+'</option>');
            });
        }
    }
}

function openModalFile() {

    document.querySelector('#idFile').value = "";
    document.querySelector('.modal-header').classList.replace("headerUpdate", "headerRegister");
    document.querySelector('#btnActionForm').classList.replace("btn-info", "btn-primary");
    document.querySelector('#btnText').innerHTML = "Guardar";
    document.querySelector('#titleModal').innerHTML = "Nueva Ficha";
    document.querySelector('#formFile').reset();

    $('#modalFormFile').modal('show');
}
