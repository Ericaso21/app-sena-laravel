let tableInstructor;
document.addEventListener('DOMContentLoaded',function (){

    tableInstructor = $('#tableInstructor').dataTable( {
        "aProcessing":true,
        "aServerSide":true,
        "language":{
            "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"
        },
        "ajax":{
            "url": '/Instructor/create',
            "dataSrc":""
        },
        "columns":[
            {data: "file.file_name"},
            {data: "instructor_names"},
            {data: "surnames_instructor"},
            {data: "document_number"},
            {data: "profile_phote","render": function (data ,type ,row) {
                return '<img class="img-fluid rounded mx-auto d-block" src="assets/images/instructor/'+row.profile_phote+'" alt="Responsive image" style="width: 50px">'
                }},
            {data: "status_instructor", "searchable": false, "orderable":false, "render": function (data, type ,row) {
                    if (row.status_instructor == 1) {
                        return '<span class="badge badge-success">Activo</span>';
                    } else {
                        return '<span class="badge badge-danger">Inactivo</span>';
                    }
                }},
            {data: "instructor_id","render": function (data ,type ,row) {
                    return '<div class="text-center"><button class="btn btn-info btn-sm btnViewUsers" onClick="ftnInstructor('+row.instructor_id+')" title="Ver usuario"><i class="far fa-eye"></i></button><button class="btn btn-primary btn-sm btnEditUsers" onClick="ftnEditInstructor('+row.instructor_id+')" title="Editar"><i class="fas fa-pencil-alt"></i></button><button class="btn btn-danger btn-sm btnDelUser" onClick="ftnInInstuctor('+row.instructor_id+')" title="Desactivar"><i class="fas fa-times-circle"></i></button></div>'
                }},
            {data: "created_at"},
        ],
        "bDestroy": true,
        "iDisplayLength": 10,
        "order": [[0,"des"]]

    });
    //nuevo usuario
    if (document.querySelector('#formInstructor')) {
        let formInstructor = document.querySelector('#formInstructor');
        formInstructor.onsubmit = function (e) {
            e.preventDefault();
            let token = '{{csrf_token()}}';
            let idInstructor = document.querySelector('#idInstructor').value;
            let file_id = document.querySelector('#file_id').value;
            let instructor_names = document.querySelector('#instructor_names').value;
            let surnames_instructor = document.querySelector('#surnames_instructor').value;
            let document_number = document.querySelector('#document_number').value;
            let profile_phote = document.querySelector('#profile_phote').value;
            let status_instructor = document.querySelector('#status_instructor').value;

            if (file_id == 0 || instructor_names == "" || surnames_instructor == "" || status_instructor == 0) {
                Swal.fire('Atención', "Todos los campos son obligatorios.", "error");
                return false;
            }

            let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            let ajaxUrl = '/Instructor';
            let formData = new FormData(formInstructor);
            if (idInstructor == '') {
                request.open("POST", ajaxUrl, true);
                request.send(formData);
            } else {
                let ajaxUrl = '/Instructors/'+idInstructor;
                request.open("POST",ajaxUrl,true);
                request.send(formData);
            }


            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    let objData = JSON.parse(request.responseText);
                    console.log(objData);
                    if (objData.status) {
                        $('#modalFormInstructor').modal("hide");
                        formInstructor.reset();
                        Swal.fire("Intructor", objData.msg, "success");
                        tableInstructor.api().ajax.reload();
                    } else {
                        Swal.fire('Error', objData.msg, "error");
                    }
                }
            }
        }
    }
},false);

//mostar file
function ftnInstructor(instructor_id) {

    let Instructor_id = instructor_id;
    let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    let ajaxUrl = '/Instructor/'+Instructor_id;
    request.open("GET",ajaxUrl,true);
    request.send();
    request.onreadystatechange = function() {
        if(request.readyState == 4 && request.status == 200){
            let objData = JSON.parse(request.responseText);
            console.log(objData);
            if (objData.status) {
                document.querySelector('#celfile_id').innerHTML = objData.data.file.file_name;
                document.querySelector('#celinstructor_names').innerHTML = objData.data.instructor_names;
                document.querySelector('#celsurnames_instructor').innerHTML = objData.data.surnames_instructor;
                document.querySelector('#celdocument_number').innerHTML = objData.data.document_number;
                document.querySelector('#celprofile_phote').innerHTML = '<img class="img-fluid rounded mx-auto d-block" src="assets/images/instructor/'+objData.data.profile_phote+'" alt="Responsive image" style="width: 50px">'
                if (objData.data.status_instructor == 1) {
                    var span = '<span class="badge badge-success">Activo</span>';
                } else {
                    var span = '<span class="badge badge-danger">Inactivo</span>';
                }
                document.querySelector('#celstatus_instructor').innerHTML = span;
                document.querySelector('#celcreated_at').innerHTML = objData.data.created_at;
                document.querySelector('#celupdated_at').innerHTML = objData.data.updated_at;
                $('#modalViewInstructor').modal('show');
            }else{
                Swal.fire("Error", objData.msg ,"error");
            }
        }
    }
}

//mostar modal actualizar
function ftnEditInstructor(instructor_id) {

    document.querySelector('#titleModal').innerHTML = "Actualizar Ficha";
    document.querySelector('.modal-header').classList.replace("headerRegister", "headerUpdate");
    document.querySelector('#btnActionForm').classList.replace("btn-primary", "btn-info");
    document.querySelector('#btnText').innerHTML = "Actualizar";

    let Instructor_id = instructor_id;
    let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    let ajaxUrl = '/Instructor/'+Instructor_id+'/edit';
    request.open("GET",ajaxUrl,true);
    request.send();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            let objData = JSON.parse(request.responseText);
            if(objData.status){
                document.querySelector('#idInstructor').value = objData.data.instructor_id;
                document.querySelector('#file_id').value = objData.data.file_id;
                document.querySelector('#instructor_names').value = objData.data.instructor_names;
                document.querySelector('#surnames_instructor').value = objData.data.surnames_instructor;
                document.querySelector('#document_number').value = objData.data.document_number;
                document.querySelector('#status_instructor').value = objData.data.status_instructor;
            }
        }
        $('#modalFormInstructor').modal('show');
    }
}

//in file
function ftnInInstuctor(instructor_id) {
    let Instructor_id= instructor_id;

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
            let ajaxUrl = '/Instructor/'+Instructor_id;
            let jsonData = {"instructor_id ":Instructor_id,'_token': $('input[name=_token]').val()};
            request.open("DELETE",ajaxUrl,true);
            request.setRequestHeader("Content-Type", "application/json");
            request.send(JSON.stringify(jsonData));
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    let objData = JSON.parse(request.responseText);
                    if (objData.status) {
                        Swal.fire("Desactivar", objData.msg, "success");
                        tableInstructor.api().ajax.reload();
                    } else {
                        Swal.fire("Atención", objData.msg, "error");
                    }
                }
            }
        }
    });
}
$('#tableInstructor').DataTable();

window.addEventListener('load', function (){
    ftnFiles();
},false);

function ftnFiles() {
    let ajaxUrl = '/Files';
    let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    request.open("GET",ajaxUrl,true);
    request.send();

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            let objData = JSON.parse(request.responseText);
            let $select = $('#file_id');
            $.each(objData,function (file_id, name) {
                $select.append('<option value="'+name.file_id+'">'+name.file_name+'</option>');
            });
        }
    }
}


function openModalInstructor() {

    document.querySelector('#idInstructor').value = "";
    document.querySelector('.modal-header').classList.replace("headerUpdate", "headerRegister");
    document.querySelector('#btnActionForm').classList.replace("btn-info", "btn-primary");
    document.querySelector('#btnText').innerHTML = "Guardar";
    document.querySelector('#titleModal').innerHTML = "Nuevo instructor";
    document.querySelector('#formInstructor').reset();

    $('#modalFormInstructor').modal('show');
}
