var inombre = document.getElementById('nombre');
var iimagen = document.getElementById('imagen');
var icodigo = document.getElementById('codigo');
var ienlaces = document.getElementById('enlaces');
var boton = document.getElementById("btnenviar");
const dataArray = [];

const urlante = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSKuuCNbkpOGNDcVetXOCcJ_I-WVUKeKqyeFNge61-xZyVeLTakn57b_sGtQESpX5RjTpcJtw0bTtC1/pubhtml?gid=0&single=true';
const urlfile = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQcHf31D-1ci81iVfKNpa_Bu-DxgA0I6FsL1QZswGwJXYmyjM0uQRkJHchb7R2JwedjAlBO_sHR-nfF/pubhtml?gid=0&single=true';
//const urlwish = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRKxE5fsOIBX0XEq-Fd-noZL9O6KTSb4hwT_TuaoTM-3DpKXe2W1owqPa0ph30wfyCLEBjcDWF_3Csj/pubhtml?gid=0&single=true';

fetch(urlante)
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        const table = doc.querySelector('table');
        const rows = table.querySelectorAll('tr');
        let rowIndex = 0;
        rows.forEach(row => {
            if (rowIndex >= 2) {
                const rowData = [];
                row.querySelectorAll('td').forEach(cell => {
                    rowData.push(cell.innerText);
                });
                dataArray.push(rowData);
            }

            rowIndex++;
        });
    })
    .catch(error => {
        console.log('Error al obtener los datos:', error);
    });

function btnLimpiar() {
    inombre.value = '';
    iimagen.value = '';
    icodigo.value = '';
    ienlaces.value = '';
    h5Element.innerHTML = 'Enlace Servidor';
}

function btnActualizar() {
    fetch(urlfile)
    //fetch(urlwish)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const table = doc.querySelector('table');
            const rows = table.querySelectorAll('tr');

            const cantidadFilas = rows.length - 1;

            inombre.value = '' + dataArray[cantidadFilas][0];
            iimagen.value = '' + dataArray[cantidadFilas][1];
        })
        .catch(error => {
            console.log('Error al obtener los datos:', error);
        });
}

function btnCrear() {
    var n = inombre.value;
    var imagen = iimagen.value;
    var nombre = encodeURIComponent(n);
    var codigo = '';
    var urlc = 'https://filemoonapi.com/api/folder/create?key=54340gjpnv8a0abxcv6s4&name=' + nombre;
    //var urlc = 'https://api.streamwish.com/api/folder/create?key=3609fo97wn3tj97h60t5&name=' + nombre;
    fetch(urlc)
        .then(response => response.json())
        .then(data => {
            codigo = data.result.fld_id;
            icodigo.value = '' + codigo;

            var urle = 'https://script.google.com/macros/s/AKfycbweUyIoRlZXsrDL95366BoYbPMmkozy0n6sglQf8lhGI2zIL4Wug3qIHb3Cctu6nSvW/exec?';

            fetch(urle + 'nombre=' + nombre + '&imagen=' + imagen + '&codigo=' + codigo)
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
            //var url = 'https://api.streamwish.com/api/upload/url?key=3609fo97wn3tj97h60t5&fld_id=' + codigo + "&url=";
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
