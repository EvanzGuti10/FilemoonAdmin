var inombre = document.getElementById('nombre');
var iimagen = document.getElementById('imagen');
var icodigo = document.getElementById('codigo');
var ienlaces = document.getElementById('enlaces');
const dataArray = [];

const urlante = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSKuuCNbkpOGNDcVetXOCcJ_I-WVUKeKqyeFNge61-xZyVeLTakn57b_sGtQESpX5RjTpcJtw0bTtC1/pubhtml?gid=0&single=true';
const urlfile = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQcHf31D-1ci81iVfKNpa_Bu-DxgA0I6FsL1QZswGwJXYmyjM0uQRkJHchb7R2JwedjAlBO_sHR-nfF/pubhtml?gid=0&single=true';

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
}

function btnActualizar() {
    fetch(urlfile)
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
    var urlc = 'https://filemoon.sx/api/folder/create?key=18056hkzovzjvogmav4qb&name=' + nombre;
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
            var url = 'https://filemoon.sx/api/remote/add?key=18056hkzovzjvogmav4qb&fld_id=' + codigo + "&url=";
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
