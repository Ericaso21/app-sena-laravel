let tableWorkingDaily;
document.addEventListener('DOMContentLoaded',function (){

    tableWorkingDaily = $('#tableWorkingDaily').dataTable( {
        "aProcessing":true,
        "aServerSide":true,
        "language":{
            "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"
        },
        "ajax":{
            "url": '/workingsDaily',
            "dataSrc":""
        },
        "columns":[
            {data: "working_day_id"},
            {data: "working_day_name"},
            {data: "acrony_wd"},
            {data: "created_at"},
            {data: "working_day_id","render": function (data ,type ,row) {
                    return '<div class="text-center"><button class="btn btn-info btn-sm btnViewUsers" onClick="ftnWorkingDaily('+row.working_day_id+')" title="Ver usuario"><i class="far fa-eye"></i></button><button class="btn btn-primary btn-sm btnEditUsers" onClick="ftnEditWorkingDaily('+row.working_day_id+')" title="Editar"><i class="fas fa-pencil-alt"></i></button><button class="btn btn-danger btn-sm btnDelUser" onClick="ftnDelWorkingDaily('+row.working_day_id+')" title="Eliminar"><i class="fas fa-trash-alt"></i></button></div>'
                }}
        ],
        "responsive":"true",
        "bDestroy": true,
        "iDisplayLength": 10,
        "order": [[0,"des"]]

    });
    //nuevo usuario
    if (document.querySelector('#formWorkingDaily')) {
        let formWorkingDaily = document.querySelector('#formWorkingDaily');
        formWorkingDaily.onsubmit = function (e) {
            e.preventDefault();
            let token = '{{csrf_token()}}';
            let idWorkingDaily = document.querySelector('#idWorkingDaily').value;
            let working_day_name = document.querySelector('#working_day_name').value;
            let acrony_wd = document.querySelector('#acrony_wd').value;

            if (working_day_name == "") {
                Swal.fire('Atención', "Todos los campos son obligatorios.", "error");
                return false;
            }

            let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            let ajaxUrl = '/workingDaily';
            let formData = new FormData(formWorkingDaily);
            if (idWorkingDaily == '') {
                request.open("POST", ajaxUrl, true);
                request.send(formData);
            } else {
                let formDataJson = {
                    '_token': $('input[name=_token]').val(),
                    "working_day_name": working_day_name,
                    "acrony_wd": acrony_wd
                };
                let ajaxUrl = '/workingDaily/'+idWorkingDaily;
                request.open("PUT",ajaxUrl,true);
                request.setRequestHeader("Content-Type", "application/json");
                request.send(JSON.stringify(formDataJson));
            }


            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    let objData = JSON.parse(request.responseText);
                    if (objData.status) {
                        $('#modalFormWorkingDaily').modal("hide");
                        formWorkingDaily.reset();
                        Swal.fire("Jornada", objData.msg, "success");
                        tableWorkingDaily.api().ajax.reload();
                    } else {
                        Swal.fire('Error', objData.msg, "error");
                    }
                }
            }
        }
    }
},false);

//modal mostrar usuario
function ftnWorkingDaily(working_day_id) {

    let Working_day_id = working_day_id;
    let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    let ajaxUrl = '/workingDaily/'+Working_day_id;
    request.open("GET",ajaxUrl,true);
    request.send();
    request.onreadystatechange = function() {
        if(request.readyState == 4 && request.status == 200){
            let objData = JSON.parse(request.responseText);
            if (objData.status) {
                document.querySelector('#celnumbe_working_day_name').innerHTML = objData.data.working_day_name;
                document.querySelector('#celdocument_acrony_wd').innerHTML = objData.data.acrony_wd;
                document.querySelector('#celcreated_at').innerHTML = objData.data.created_at;
                document.querySelector('#celupdated_at').innerHTML = objData.data.updated_at;
                $('#modalViewWorkingDaily').modal('show');
            }else{
                Swal.fire("Error", objData.msg ,"error");
            }
        }
    }
}

//mostar modal actualizar
function ftnEditWorkingDaily(working_day_id) {

    document.querySelector('#titleModal').innerHTML = "Actualizar Jornada";
    document.querySelector('.modal-header').classList.replace("headerRegister", "headerUpdate");
    document.querySelector('#btnActionForm').classList.replace("btn-primary", "btn-info");
    document.querySelector('#btnText').innerHTML = "Actualizar";

    let Working_day_id = working_day_id;
    let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    let ajaxUrl = '/workingDaily/'+Working_day_id;
    request.open("GET",ajaxUrl,true);
    request.send();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            let objData = JSON.parse(request.responseText);
            if(objData.status){
                document.querySelector('#idWorkingDaily').value = objData.data.working_day_id;
                document.querySelector('#working_day_name').value = objData.data.working_day_name;
                document.querySelector('#acrony_wd').value = objData.data.acrony_wd;
            }
        }
        $('#modalFormWorkingDaily').modal('show');
    }
}

//eliminar conductor
function ftnDelWorkingDaily(working_day_id) {
    let Working_day_id= working_day_id;

    Swal.fire({
        title: "Eliminar Conductor",
        text: "¿Realmente quiere eliminar el conductor?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!"
    }).then((result)=> {

        if (result.isConfirmed)
        {
            let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            let ajaxUrl = '/workingDaily/'+Working_day_id;
            let jsonData = {"working_day_id":Working_day_id,'_token': $('input[name=_token]').val()};
            request.open("DELETE",ajaxUrl,true);
            request.setRequestHeader("Content-Type", "application/json");
            request.send(JSON.stringify(jsonData));
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    let objData = JSON.parse(request.responseText);
                    if (objData.status) {
                        Swal.fire("Eliminar", objData.msg, "success");
                        tableWorkingDaily.api().ajax.reload();
                    } else {
                        Swal.fire("Atención", objData.msg, "error");
                    }
                }
            }
        }
    });
}
$('#tableWorkingDaily').DataTable();

function openModalWorkingModal() {

    document.querySelector('#idWorkingDaily').value = "";
    document.querySelector('.modal-header').classList.replace("headerUpdate", "headerRegister");
    document.querySelector('#btnActionForm').classList.replace("btn-info", "btn-primary");
    document.querySelector('#btnText').innerHTML = "Guardar";
    document.querySelector('#titleModal').innerHTML = "Nueva Jornada";
    document.querySelector('#formWorkingDaily').reset();

    $('#modalFormWorkingDaily').modal('show');
}
