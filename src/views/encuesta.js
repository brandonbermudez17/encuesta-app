// const { ipcRenderer } = require("electron");
const { remote,ipcRenderer } = require("electron");
const body = document.getElementsByTagName("body")[0];
let encuesta = {};

document.addEventListener('DOMContentLoaded', (e) => {
  ipcRenderer.invoke('getEncuestaFromId')
  .then(res => {
    body.innerHTML += questionsWithData(res)
  })
})

const questionsWithData = (data) => {
  return `
    <div class="container mb-2 mt-3 px-3 py-1 is-8 is-offset-4">
        <h1 class="title is-4 has-text-black has-text-centered">Encuesta #${
          data.numero_encuesta
        }</h1>
        <div class="content">
            <strong class="has-text-black is-block">
                Encuestador: ${data.nombre_encuestador}
            </strong>
            <strong class="has-text-success has-text-weight-bold ">
                Fecha: ${data.fecha}
            </strong>
        </div>
    </div>
    <div id="questionContainer" class="container px-2 py-2 is-8 is-offset-4">
        <div class="card">
            <div class="card-content">
                <em class="is-block has-text-danger-dark">1. ¿has hecho uso de alguna herramienta tecnológica en tu universidad?</em>
                <span class="has-text-black has-text-weight-bold">${
                  data.resp_uso_herramienta
                }</span>
                <em class="is-block has-text-danger-dark">2. ¿Con qué frecuencia utilizas este tipo de herramientas en tus clases?</em>
                <span class="has-text-black has-text-weight-bold">${
                  data.resp_uso_herramienta
                }</span>
                <em class="is-block has-text-danger-dark">3. ¿Estás de acuerdo con el uso de estas herramientas?</em>
                <span class="has-text-black has-text-weight-bold">${
                  data.resp_uso_herramienta
                }</span>
                <em class="is-block has-text-danger-dark">4. De las herramientas que se exponen a continuación, ¿con cuál está más familiarizado?</em>
                <div class="content mb-0"> 
                    ${GenerateFromMultiAnswers(
                      data.resp_herramienta_tecnologica
                    )}
                </div>
                <em class="is-block has-text-danger-dark">5. Según su criterio, en un rango del 1 al 10 ¿qué tan efectiva es la enseñanza cuando se usan herramientas tecnológicas?</em>
                <span class="has-text-black has-text-weight-bold">${
                  data.resp_efectividad_ensenianza
                }</span>
                <em class="is-block has-text-danger-dark">6. ¿Ha logrado aprobar alguna clase utilizando este tipo de herramientas?</em>
                <span class="has-text-black has-text-weight-bold">${
                  data.resp_aprobacion_clase
                }</span>
                <em class="is-block has-text-danger-dark">7. ¿que tipo de conexión utiliza para hacer uso de las herramientas tecnológicas?</em>
                <span class="has-text-black has-text-weight-bold">${
                  data.resp_tipo_conexion
                }</span>
                <em class="is-block has-text-danger-dark">8. Crees que el uso de estas herramientas es realmente importante para el avance de la educación universitaria?</em>
                <span class="has-text-black has-text-weight-bold">${
                  data.resp_importancia_herramientas
                }</span>
                <em class="is-block has-text-danger-dark">9. ¿qué tanto conocimiento posees acerca del uso de herramientas tecnológicas?</em>
                <span class="has-text-black has-text-weight-bold">${
                  data.resp_conocimiento_herramientas
                }</span>
            </div>
        </div>
    </div>

    <div class="container is-8 is-offset-4 mt-1" >
        <div class="buttons is-right">
            <button class="button is-info is-outlined">ver estudiante</button>
            <button class="button is-success is-outlined">Editar</button>
            <button class="button is-danger is-outlined">Eliminar</button>
        </div>
    </div>
    `;
};

function GenerateFromMultiAnswers(answer) {
  let answers = answer.split("#");
  let cadena = "";
  answers.forEach((element) => {
    cadena += `<span class="has-text-black has-text-weight-bold is-block">${element}</span>`;
  });
  return cadena;
}
