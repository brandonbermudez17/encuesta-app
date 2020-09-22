const { ipcRenderer } = require("electron")

const containerQuestions = document.getElementById('containerQuestions');

// let respuestas = {};

document.addEventListener('DOMContentLoaded', (e) => {
    ipcRenderer.invoke('getRespuestas')
    .then(res => {
        containerQuestions.innerHTML += generateDynamicForm(res.respuestas);
    })
})


const generateDynamicForm = (data) => {
    return `
    <form>
        <div class="field">
            <label for="one" class="label">¿has hecho uso de alguna herramienta tecnológica en tu universidad?</label>
            <div class="select is-rounded is-success">
                <select>
                    ${createDynamicSelect(data.resp_uso_herramienta)}
                </select>
            </div>
        </div>
        <div class="field">
            <label for="two" class="label">¿Con qué frecuencia utilizas este tipo de herramientas en tus clases?</label>
            <div class="select is-rounded is-success">
                <select>
                    ${createDynamicSelect(data.resp_frecuencia_uso_herramienta)}
                </select>
            </div>
        </div>
        <div class="field">
            <label for="three" class="label">¿Estás de acuerdo con el uso de estas herramientas?</label>
            <div class="select is-rounded is-success">
                <select>
                    ${createDynamicSelect(data.resp_opinion_uso_herramienta)}
                </select>
            </div>
        </div>
        <div class="field">
            <label for="four" class="label">De las herramientas que se exponen a continuación, ¿con cuál está más
                familiarizado? </label>
            ${createDynamicCheckBoxes(data.resp_herramienta_tecnologica)}
        </div>
        <div class="field">
            <label for="five" class="label">Según su criterio, en un rango del 1 al 10 ¿qué tan efectiva es la enseñanza
                cuando se usan herramientas tecnológicas?</label>
            <div class="select is-rounded is-success">
                <select>
                ${createDynamicSelect(data.resp_efectividad_ensenianza)}
                </select>
            </div>
        </div>
        <div class="field">
            <label for="six" class="label">¿Ha logrado aprobar alguna clase utilizando este tipo de herramientas? </label>
            <div class="select is-rounded is-success">
                <select>
                ${createDynamicSelect(data.resp_aprobacion_clase)}
                </select>
            </div>
        </div>
        <div class="field">
            <label for="seven" class="label">¿que tipo de conexión utiliza para hacer uso de las herramientas
                tecnológicas?</label>
            <div class="select is-rounded is-success">
                <select>
                ${createDynamicSelect(data.resp_tipo_conexion)}
                </select>
            </div>
        </div>
        <div class="field">
            <label for="eight" class="label">¿Crees que el uso de estas herramientas es realmente importante para el avance
                de la educación universitaria?</label>
            <div class="select is-rounded is-success">
                <select>
                    ${createDynamicSelect(data.resp_importancia_herramientas)}
                </select>
            </div>
        </div>
        <div class="field">
            <label for="nine" class="label">¿qué tanto conocimiento posees acerca del uso de herramientas tecnológicas?</label>
            <div class="select is-rounded is-success">
                <select>
                    ${createDynamicSelect(data.resp_conocimiento_herramientas)}
                </select>
            </div>
        </div>
    </form>
    `
}

const createDynamicSelect = (data) => {
    let responses = '';
    data.forEach(item => {
        responses += `<option value="${item.id}">${item.content}</option>`
    })
    return responses;
}

const createDynamicCheckBoxes = (data) => {
    let responses = '';
    data.forEach(item => {
        responses += `
        <label class="checkbox">
            <input type="checkbox" value="${item.id}">
            ${item.content}
        </label>
        `
    })
    return responses;
}