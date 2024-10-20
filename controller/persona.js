function LoadData(){
    $.ajax({
        url: 'http://localhost:9000/v1/api/persona',
        type: 'GET',
        success: function(response) {
            var html = '';
            response.forEach(function(persona) {
                html += '<tr>' +
                        '<td>' + persona.nombre + '</td>' +
                        '<td>' + persona.celular + '</td>' +
                        '<td>' + persona.correo + '</td>' +
                        '<td><button id="guardar" class="btn btn-primary" onclick="FindById('+persona.id+')">Editar</button></td>'+
                        '<td><button id="guardar" class="btn btn-danger" onclick="DeleteById('+persona.id+')">Eliminar</button></td>'+
                        '</tr>';
            });
            $('#loadData').html(html);
        },
        error: function(error) {
            console.log('Error:', error);
        }
    });
}
function FindById(id){
    $.ajax({
        url: 'http://localhost:9000/v1/api/persona/'+id,
        type: 'GET',
        success: function(response) {
            $('#id').val(response.id);
            $('#nombre').val(response.nombre);
            $('#celular').val(response.celular);
            $('#correo').val(response.correo);
            
            
            $('#guardar').attr('onclick', 'Update()');
            $('#guardar').text('Actualizar');
        },
        error: function(error) {
            console.log('Error:', error);
        }
    });
}


function Save(){
    $.ajax({
        url: 'http://localhost:9000/v1/api/persona',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            nombre: $("#nombre").val(),
            celular: $("#celular").val(),
            correo: $("#correo").val(),

        }),
        success: function(response) {
                  
            ClearData();
            LoadData();
        },
        error: function(error) {
            console.log('Error:', error);
        }
    });    
}

function DeleteById(id){
    $.ajax({
        url: 'http://localhost:9000/v1/api/persona/' + id,
        type: 'DELETE',
        contentType: 'application/json',
        data: JSON.stringify({
            id: parseInt($("#id").val())
        }),
        success: function(response) {
            LoadData();
        },
        error: function(error) {
            console.log('Error:', error);
        }
    });    
}
function Update(){
    $.ajax({
        url: 'http://localhost:9000/v1/api/persona/' + $("#id").val(),
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({
            id: parseInt($("#id").val()),
            nombre: $("#nombre").val(),
            celular: $("#celular").val(),
            correo: $("#correo").val()
        }),
        success: function(response) {
                  
            ClearData();
            LoadData();
        },
        error: function(error) {
            console.log('Error:', error);
        }
    });    
}

function ClearData(){
    $('#id').val('');
    $('#nombre').val('');
    $('#celular').val('');
    $('#correo').val('');
    // Cambiar el botón para que use el método Update y mostrar 'Actualizar'
    $('#guardar').attr('onclick', 'Save()');
    $('#guardar').text('Guardar');
}
