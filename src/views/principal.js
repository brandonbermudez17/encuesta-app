const { fetchEncuestas, getRespuestas } = require("../database");
const { remote, ipcRenderer } = require('electron');
const BrowserWindow = remote.BrowserWindow

let encuestas = [];

const encuestaContainer = document.getElementById('encuesta_container');
const filtros = document.getElementsByName('answer');
const searchInput = document.getElementById('searchEncuesta');
const btnCrearEncuesta = document.getElementById('btnCrearEncuesta');
const btnIngresoEstudiante = document.getElementById('btnIngresoEstudiante');

document.addEventListener('DOMContentLoaded', (e) => {
    fetchEncuestas()
    .then(res => {
        res.forEach(item => {
            encuestaContainer.innerHTML += createEncuestaItem(item)
            encuestas.push(item)
        })
    })
    console.log(encuestas)
})

searchInput.addEventListener('keydown', (e) => {
    if (e.code.toString() === 'Enter' && searchInput.value.length > 0) {
        filtrarEncuestas()
    }
})

btnCrearEncuesta.addEventListener('click', (e) => {
    e.preventDefault()
    const modalPath = "src/views/ingresoEncuesta.html"
    let win = new BrowserWindow(
        { 
            width: 800, 
            height: 600,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true,
            },
        }
    )
    win.on('close', function () { win = null })
    win.loadFile(modalPath)
    win.show()
})

btnIngresoEstudiante.addEventListener('click', (e) => {
    e.preventDefault()
    const modalPath = "src/views/ingresoEstudiante.html"
    let win = new BrowserWindow(
        { 
            width: 800, 
            height: 600,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true,
            },
        }
    )
    win.on('close', function () { win = null })
    win.loadFile(modalPath)
    win.show()
})

function createEncuestaItem(encuesta) {
    return `
    <div id="item_encuesta" class="box has-background-grey-dark has-text-info-light mb-1">
        <div class="is-block">
        <span class="is-size-6 ">Encuestador:</span>
        <span>${encuesta.nombre_encuestador}</span>
        </div>
        <div class="is-block">
        <span class="is-size-6">Numero de Encuesta:</span>
        <span>${encuesta.numero_encuesta}</span>
        </div> 
        <div class="is-block">
        <span class="is-size-6">Fecha:</span>
        <span>${encuesta.fecha.toDateString()}</span>
        </div> 
        <div class="is-block">
        <span class="is-size-6">Estudiante:</span>
        <span>${encuesta.nombre_estudiante}</span>
        </div> 
        <div class="buttons mt-1">
        <button class="button is-primary is-rounded" onclick="verEncuesta(event, '${encuesta.id}')">Ver</button>
        <button class="button is-warning is-rounded" onclick="editarEncuesta(event, '${encuesta.id}')">Editar</button>
        <button class="button is-danger is-rounded" onclick="eliminarEncuesta(event, '${encuesta.id}')">Eliminar</button>
        </div>
    </div>
    `;
}

const filtrarEncuestas = () => {
    encuestaContainer.innerHTML = null;
    if (filtros[0].checked === true) {
        var encuestaFiltrada = encuestas.filter(item => item.nombre_encuestador.includes(searchInput.value));
    } else if (filtros[1].checked === true) {
        var encuestaFiltrada = encuestas.filter(item => item.numero_encuesta == searchInput.value);
    } else if (filtros[2].checked === true) {
        var encuestaFiltrada = encuestas.filter(item => item.nombre_estudiante.includes(searchInput.value));
    }

    encuestaFiltrada.forEach(item => {
        encuestaContainer.innerHTML += createEncuestaItem(item)
    })
}

const verEncuesta = (e, id) => {
    ipcRenderer.send('setIdSeleccionado', id)
    const modalPath = "src/views/encuesta.html"
    let win = new BrowserWindow(
        { 
            width: 800, 
            height: 600,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true,
            },
        }
    )
    win.on('close', function () { win = null })
    win.loadFile(modalPath)
    win.show()
}

const editarEncuesta = (e, id) => {
    console.log('editar');
    console.log(id);
}

const eliminarEncuesta = (e, id) => {
    console.log('eliminar');
    console.log(id);
}