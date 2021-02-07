let tableApprentice;
document.addEventListener('DOMContentLoaded',function (){

    tableApprentice = $('#tableApprentice').dataTable( {
        "aProcessing":true,
        "aServerSide":true,
        "language":{
            "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"
        },
        "ajax":{
            "url": '/Apprentice/create',
            "dataSrc":""
        },
        "columns":[
            {data: "file.file_name"},
            {data: "document_number"},
            {data: "apprentice_name"},
            {data: "apprentice_surname"},
            {data: "apprentice_email"},
            {data: "birth_date"},
            {data: "apprentice_id","render": function (data ,type ,row) {
                    return '<div class="text-center"><button class="btn btn-info btn-sm btnViewUsers" onClick="ftnApprentice('+row.apprentice_id+')" title="Ver usuario"><i class="far fa-eye"></i></button><button class="btn btn-primary btn-sm btnEditUsers" onClick="ftnEditApprentice('+row.apprentice_id+')" title="Editar"><i class="fas fa-pencil-alt"></i></button><button class="btn btn-danger btn-sm btnDelUser" onClick="ftnDelApprentice('+row.apprentice_id+')" title="Eliminar"><i class="fas fa-trash-alt"></i></button></div>'
                }},
            {data: "apprentice_gender","searchable": false, "orderable":false, "render": function (data, type ,row) {
                    if (row.apprentice_gender == 1) {
                        return 'Masculino';
                    } else if(row.apprentice_gender == 2) {
                        return 'Femenino';
                    }else {
                        return 'Otro';
                    }
            }},
            {data: "document_type","searchable": false, "orderable":false, "render": function (data, type ,row) {
                    if (row.document_type == 1) {
                        return 'Cedula ciudadania';
                    } else if(row.document_type == 2) {
                        return 'Cedula extranjeria';
                    }else {
                        return 'Tarjeta de identidad';
                    }
                }},
            {data: "created_at"}
        ],
        "responsive":"true",
        "bDestroy": true,
        "iDisplayLength": 10,
        "order": [[0,"des"]]

    });
    //nuevo usuario
    if (document.querySelector('#formApprentice')) {
        let formApprentice = document.querySelector('#formApprentice');
        formApprentice.onsubmit = function (e) {
            e.preventDefault();
            let token = '{{csrf_token()}}';
            let idApprentice = document.querySelector('#idApprentice').value;
            let file_id = document.querySelector('#file_id').value;
            let document_number = document.querySelector('#document_number').value;
            let apprentice_name = document.querySelector('#apprentice_name').value;
            let apprentice_surname = document.querySelector('#apprentice_surname').value;
            let apprentice_email = document.querySelector('#apprentice_email').value;
            let birth_date = document.querySelector('#birth_date').value;
            let apprentice_gender = document.querySelector('#apprentice_gender').value;
            let document_type = document.querySelector('#document_type').value;

            if (file_id == 0 || document_number == '' || apprentice_name == '' || apprentice_surname == '' || token == '') {
                Swal.fire('Atención', "Todos los campos son obligatorios.", "error");
                return false;
            }

            let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            let ajaxUrl = '/Apprentice';
            let formData = new FormData(formApprentice);
            if (idApprentice == '') {
                request.open("POST", ajaxUrl, true);
                request.send(formData);
            } else {
                let formDataJson = {
                    '_token': $('input[name=_token]').val(),
                    "file_id": file_id,
                    "document_number": document_number,
                    "apprentice_name": apprentice_name,
                    "apprentice_surname": apprentice_surname,
                    "apprentice_email": apprentice_email,
                    "birth_date": birth_date,
                    "apprentice_gender": apprentice_gender,
                    "document_type": document_type
                };
                let ajaxUrl = '/Apprentice/'+idApprentice;
                request.open("PUT",ajaxUrl,true);
                request.setRequestHeader("Content-Type", "application/json");
                request.send(JSON.stringify(formDataJson));
            }


            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    let objData = JSON.parse(request.responseText);
                    if (objData.status) {
                        $('#modalFormApprentice').modal("hide");
                        formApprentice.reset();
                        Swal.fire("Aprendiz", objData.msg, "success");
                        tableApprentice.api().ajax.reload();
                    } else {
                        Swal.fire('Error', objData.msg, "error");
                    }
                }
            }
        }
    }
},false);

//modal mostrar aprendiz
function ftnApprentice(apprentice_id) {

    let Apprentice_id = apprentice_id;
    let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    let ajaxUrl = '/Apprentice/'+Apprentice_id;
    request.open("GET",ajaxUrl,true);
    request.send();
    request.onreadystatechange = function() {
        if(request.readyState == 4 && request.status == 200){
            let objData = JSON.parse(request.responseText);
            console.log(objData);
            if (objData.status) {
                document.querySelector('#celfile_id').innerHTML = objData.data.file.file_name;
                document.querySelector('#celdocument_number').innerHTML = objData.data.document_number;
                document.querySelector('#celapprentice_name').innerHTML = objData.data.apprentice_name;
                document.querySelector('#celapprentice_surname').innerHTML = objData.data.apprentice_surname;
                document.querySelector('#celapprentice_email').innerHTML = objData.data.apprentice_email;
                document.querySelector('#celbirth_date').innerHTML = objData.data.birth_date;
                if (objData.data.apprentice_gender == 1){
                    var res = 'Masculino';
                }else if (objData.data.apprentice_gender == 2){
                    var res = 'Femenino';
                }else{
                    var res = 'Otro';
                }
                document.querySelector('#celapprentice_gender').innerHTML = res;
                if (objData.data.document_type == 1){
                    var resp = 'Cedula ciudadania';
                }else if (objData.data.document_type == 2){
                    var resp = 'Cedula extranjeria';
                }else{
                    var resp = 'Tarjeta de identidad';
                }
                document.querySelector('#celdocument_type').innerHTML = resp;
                document.querySelector('#celcreated_at').innerHTML = objData.data.created_at;
                document.querySelector('#celupdated_at').innerHTML = objData.data.updated_at;
                $('#modalViewApprentice').modal('show');
            }else{
                Swal.fire("Error", objData.msg ,"error");
            }
        }
    }
}
//mostar modal actualizar
function ftnEditApprentice(apprentice_id) {

    document.querySelector('#titleModal').innerHTML = "Actualizar Aprendiz";
    document.querySelector('.modal-header').classList.replace("headerRegister", "headerUpdate");
    document.querySelector('#btnActionForm').classList.replace("btn-primary", "btn-info");
    document.querySelector('#btnText').innerHTML = "Actualizar";

    let Apprentice_id = apprentice_id;
    let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    let ajaxUrl = '/Apprentice/'+Apprentice_id+'/edit';
    request.open("GET",ajaxUrl,true);
    request.send();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            let objData = JSON.parse(request.responseText);
            console.log(objData);
            if(objData.status){
                document.querySelector('#idApprentice').value = objData.data.apprentice_id;
                document.querySelector('#file_id').value = objData.data.file_id;
                document.querySelector('#document_number').value = objData.data.document_number;
                document.querySelector('#apprentice_name').value = objData.data.apprentice_name;
                document.querySelector('#apprentice_surname').value = objData.data.apprentice_surname;
                document.querySelector('#apprentice_email').value = objData.data.apprentice_email;
                document.querySelector('#birth_date').value = objData.data.birth_date;
                document.querySelector('#apprentice_gender').value = objData.data.apprentice_gender;
                document.querySelector('#document_type').value = objData.data.document_type;
            }
        }
        $('#modalFormApprentice').modal('show');
    }
}

//eliminar conductor
function ftnDelApprentice(apprentice_id) {
    let Apprentice_id= apprentice_id;

    Swal.fire({
        title: "Eliminar Aprendiz",
        text: "¿Realmente quiere eliminar el aprendiz?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!"
    }).then((result)=> {

        if (result.isConfirmed)
        {
            let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            let ajaxUrl = '/Apprentice/'+Apprentice_id;
            let jsonData = {"apprentice_id ":Apprentice_id,'_token': $('input[name=_token]').val()};
            request.open("DELETE",ajaxUrl,true);
            request.setRequestHeader("Content-Type", "application/json");
            request.send(JSON.stringify(jsonData));
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    let objData = JSON.parse(request.responseText);
                    if (objData.status) {
                        Swal.fire("Eliminar", objData.msg, "success");
                        tableApprentice.api().ajax.reload();
                    } else {
                        Swal.fire("Atención", objData.msg, "error");
                    }
                }
            }
        }
    });
}


$('#tableVehicle').DataTable();

window.addEventListener('load', function (){
    ftnDocumentType();
    ftnGenders();
},false);

function ftnDocumentType() {
    let ajaxUrl = '/document_types';
    let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    request.open("GET",ajaxUrl,true);
    request.send();

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            let objData = JSON.parse(request.responseText);
            let $select = $('#document_type');
            $.each(objData,function (id_tp, name) {
                $select.append('<option value="'+name.id_tp+'">'+name.name_tp+'</option>');
            });
        }
    }
}

function ftnGenders() {
    let ajaxUrl = '/genders';
    let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    request.open("GET",ajaxUrl,true);
    request.send();

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            let objData = JSON.parse(request.responseText);
            let $select = $('#apprentice_gender');
            $.each(objData,function (id_gender, name) {
                $select.append('<option value="'+name.id_gender+'">'+name.name_gender+'</option>');
            });
        }
    }
}

function openModalApprentice() {

    document.querySelector('#idApprentice').value = "";
    document.querySelector('.modal-header').classList.replace("headerUpdate", "headerRegister");
    document.querySelector('#btnActionForm').classList.replace("btn-info", "btn-primary");
    document.querySelector('#btnText').innerHTML = "Guardar";
    document.querySelector('#titleModal').innerHTML = "Nuevo Aprendiz";
    document.querySelector('#formApprentice').reset();

    $('#modalFormApprentice').modal('show');
}
