const { remote, ipcRenderer } = require("electron")

// botones
const btnEnviar = document.getElementById('btnEnviar')
const btnCancel = document.getElementById('btnCancel')

//elementos del formulario
const nombreEstudiante = document.getElementById('nombreEstudiante');
const apellidoEstudiante = document.getElementById('apellidoEstudiante');
const sexoMasculino = document.getElementById('sexoMasculino');
const sexoFemenino = document.getElementById('sexoFemenino');
const departamento = document.getElementById('departamento');
const ciudad = document.getElementById('ciudad');
const celular = document.getElementById('celular');
const facultad = document.getElementById('facultad');
const carnet = document.getElementById('carnet');
const anioEstudioSelect = document.getElementById('anioEstudio')

btnCancel.addEventListener('click', e => {
    e.preventDefault()
    const closeNotify = new Notification('ingreso cancelado',{
        body: 'haz cancelado el ingreso de estudiante con exito'
    })
    closeNotify.onclose = () => {
        remote.getCurrentWindow().close()
    }
    closeNotify.show()
})

btnEnviar.addEventListener('click',e => {
    e.preventDefault()

    let estudiante = {};

    estudiante.nombre = nombreEstudiante.value;
    estudiante.apellido = apellidoEstudiante.value;
    estudiante.sexo = sexoFemenino.checked === true ? sexoFemenino.value : sexoMasculino.value
    estudiante.departamento = departamento.value;
    estudiante.ciudad = ciudad.value;
    estudiante.celular = celular.value;
    estudiante.facultad = facultad.value;
    estudiante.carnet = carnet.value;
    estudiante.anioEstudio = anioEstudioSelect.options[anioEstudioSelect.selectedIndex].value;
    estudiante.anioEstudio = parseInt(estudiante.anioEstudio, 10)

    ipcRenderer.send('insertar_estudiante', estudiante);
})

