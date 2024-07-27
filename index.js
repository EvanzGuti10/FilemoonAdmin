var inombre = document.getElementById('nombre');
var iimagen = document.getElementById('imagen');
var icodigo = document.getElementById('codigo');
var ienlaces = document.getElementById('enlaces');
var boton = document.getElementById("btnenviar");
const dataArray = [];

const urlfile = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQcHf31D-1ci81iVfKNpa_Bu-DxgA0I6FsL1QZswGwJXYmyjM0uQRkJHchb7R2JwedjAlBO_sHR-nfF/pubhtml?gid=0&single=true';

function btnLimpiar() {
    //Cuando se presione el boton limpiar se mandara al enlace del servidor
    var codigo = icodigo.value;    
    var cos = 'https://filemoon.sx/folder/' + codigo;
    //Enviando
    var urlMensaje = 'https://api.telegram.org/bot7077402329:AAH_eOLI9IjhanJ6698CCiWz42ZlH6Ij_vU/sendMessage?chat_id=-1002204285060&text=' + cos;
    fetch(urlMensaje)
        .then(response => response.json())
        .then(data => {
            console.log('Exitoso');
            inombre.value = '';
            iimagen.value = '';
            icodigo.value = '';
            ienlaces.value = '';
        })
        .catch(error => console.error(error));
}

function btnCrear() {
    var n_i = inombre.value;
    //var nombre_imagen = encodeURIComponent(n);
    var codigo = '';

    //Obteniendo el nombre y la imagen
    var datos = n_i.split('→');
    var nombre = encodeURIComponent(datos[0]);
    var urlImagen = datos[1];

    //Url para crear la carpeta
    var urlc = 'https://filemoonapi.com/api/folder/create?key=54340gjpnv8a0abxcv6s4&name=' + nombre;

    //Mandando el nombre al campo imagen
    imagen.value = urlImagen;
    var imagenSubir = imagen.value;

    fetch(urlc)
        .then(response => response.json())
        .then(data => {
            codigo = data.result.fld_id;
            icodigo.value = '' + codigo;

            var urle = 'https://script.google.com/macros/s/AKfycbweUyIoRlZXsrDL95366BoYbPMmkozy0n6sglQf8lhGI2zIL4Wug3qIHb3Cctu6nSvW/exec?';

            fetch(urle + 'nombre=' + nombre + '&imagen=' + urlImagen + '&codigo=' + codigo)
                .then(response => response.json())
                .then(data => {
                    console.log('Exitoso');
                })
                .catch(error => console.error(error));
        })
        .catch(error => console.error(error));
}

function btnEnviar() {
    var contenido = ienlaces.value;
    var codigo = icodigo.value;

    var lineas = contenido.split("\n");

    for (var i = 0; i < lineas.length; i++) {
        if (lineas[i][0] == 'h') {
            var url = 'https://filemoonapi.com/api/remote/add?key=54340gjpnv8a0abxcv6s4&fld_id=' + codigo + "&url=";
            var subir = url + lineas[i];

            fetch(subir)
                .then(response => response.json())
                .then(data => {
                    console.log('Exitoso');
                    ienlaces.value = '';
                })
                .catch(error => console.error(error));
        }
    }

}
