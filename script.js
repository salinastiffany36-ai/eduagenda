const formulario = document.getElementById('form-tarea');
const listaTareas = document.getElementById('lista-tareas');

// Cargar tareas guardadas en el navegador o iniciar lista vacía
let tareas = JSON.parse(localStorage.getItem('eduagenda_tareas')) || [];

// Mostrar tareas al cargar la página
document.addEventListener('DOMContentLoaded', mostrarTareas);

// Evento para guardar nueva tarea
formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const materia = document.getElementById('materia').value;
    const fecha = document.getElementById('fecha').value;

    const nuevaTarea = {
        id: Date.now(),
        titulo: titulo,
        materia: materia,
        fecha: fecha,
        completada: false
    };

    tareas.push(nuevaTarea);
    guardarYActualizar();
    formulario.reset();
});

// Función para dibujar las tareas en pantalla
function mostrarTareas() {
    listaTareas.innerHTML = '';

    if (tareas.length === 0) {
        listaTareas.innerHTML = '<p style="color: #64748b;">No tienes tareas pendientes. ¡Agrega una!</p>';
        return;
    }

    tareas.forEach(tarea => {
        const div = document.createElement('div');
        div.className = `item-tarea ${tarea.completada ? 'completada' : ''}`;

        div.innerHTML = `
            <div class="info">
                <h3>${tarea.titulo}</h3>
                <span>📘 ${tarea.materia}</span>
                <span>📅 Entrega: ${tarea.fecha}</span>
            </div>
            <div class="acciones">
                <button class="btn-estado" onclick="cambiarEstado(${tarea.id})">
                    ${tarea.completada ? '↩ Pendiente' : '✔ Completar'}
                </button>
                <button class="btn-eliminar" onclick="eliminarTarea(${tarea.id})">🗑</button>
            </div>
        `;
        listaTareas.appendChild(div);
    });
}

// Cambiar estado entre pendiente y completada
function cambiarEstado(id) {
    tareas = tareas.map(tarea => {
        if (tarea.id === id) {
            tarea.completada = !tarea.completada;
        }
        return tarea;
    });
    guardarYActualizar();
}

// Eliminar una tarea
function eliminarTarea(id) {
    tareas = tareas.filter(tarea => tarea.id !== id);
    guardarYActualizar();
}

// Guardar en localStorage y refrescar pantalla
function guardarYActualizar() {
    localStorage.setItem('eduagenda_tareas', JSON.stringify(tareas));
    mostrarTareas();
}