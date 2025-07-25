


let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
let editando = null;

function mostrarMensaje(mensaje, tipo = 'success') {
  const msgDiv = document.getElementById('mensaje-tarea');
  msgDiv.textContent = mensaje;
  msgDiv.style.color = tipo === 'success' ? '#2eb94c' : '#d9534f';
  msgDiv.style.fontWeight = '500';
  setTimeout(() => { msgDiv.textContent = ''; }, 1500);
}

function agregarTarea() {
  const input = document.getElementById('input-tarea');
  const texto = input.value.trim();
  if (!texto) return;
  if (editando !== null) {
    tareas[editando].texto = texto;
    mostrarMensaje('Tarea actualizada');
    editando = null;
  } else {
    tareas.push({ texto, realizada: false });
    mostrarMensaje('Tarea creada');
  }
  localStorage.setItem('tareas', JSON.stringify(tareas));
  input.value = '';
  verTareas();
}



function verTareas() {
  const lista = document.getElementById('lista-tareas');
  let tareasPendientes = tareas.filter(t => !t.realizada);
  let tareasRealizadas = tareas.filter(t => t.realizada);

  // Mostrar tareas pendientes
  lista.innerHTML = '';
  if (tareasPendientes.length === 0) {
    lista.innerHTML = '<li style="text-align:center; color:#aaa;">No hay tareas pendientes.</li>';
  } else {
    tareasPendientes.forEach((tarea, i) => {
      // El índice real en el array original
      const idx = tareas.findIndex((t, j) => t === tarea && !t.realizada && tareas.slice(0, j+1).filter(x => !x.realizada).length === tareasPendientes.slice(0, i+1).length);
      const li = document.createElement('li');
      li.className = 'todo-item';

      // Checkbox
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = false;
      checkbox.onclick = () => marcarRealizada(idx);
      li.appendChild(checkbox);

      // Texto tarea
      const span = document.createElement('span');
      span.className = 'tarea-text';
      span.textContent = tarea.texto;
      li.appendChild(span);

      // Acciones (editar, eliminar)
      const actions = document.createElement('div');
      actions.className = 'todo-actions';

      // Editar
      const btnEdit = document.createElement('button');
      btnEdit.title = 'Editar';
      btnEdit.innerHTML = '✏️';
      btnEdit.onclick = () => editarTarea(idx);
      actions.appendChild(btnEdit);

      // Eliminar
      const btnDelete = document.createElement('button');
      btnDelete.title = 'Eliminar';
      btnDelete.innerHTML = '🗑️';
      btnDelete.onclick = () => eliminarTarea(idx);
      actions.appendChild(btnDelete);

      li.appendChild(actions);
      lista.appendChild(li);
    });
  }

  // Mostrar historial de tareas realizadas en el div aparte
  let historial = document.getElementById('historial-tareas');
  if (historial) {
    historial.innerHTML = '';
    if (tareasRealizadas.length > 0) {
      tareasRealizadas.forEach((tarea, i) => {
        // El índice real en el array original
        const idx = tareas.findIndex((t, j) => t === tarea && t.realizada && tareas.slice(0, j+1).filter(x => x.realizada).length === tareasRealizadas.slice(0, i+1).length);
        const li = document.createElement('li');
        li.className = 'todo-item tarea-realizada';

        // Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = true;
        checkbox.onclick = () => marcarRealizada(idx);
        li.appendChild(checkbox);

        // Texto tarea
        const span = document.createElement('span');
        span.className = 'tarea-text tarea-realizada';
        span.textContent = tarea.texto;
        li.appendChild(span);

        // Acciones (eliminar)
        const actions = document.createElement('div');
        actions.className = 'todo-actions';

        // Eliminar
        const btnDelete = document.createElement('button');
        btnDelete.title = 'Eliminar';
        btnDelete.innerHTML = '🗑️';
        btnDelete.onclick = () => eliminarTarea(idx);
        actions.appendChild(btnDelete);

        li.appendChild(actions);
        historial.appendChild(li);
      });
    } else {
      historial.innerHTML = '<li style="text-align:center; color:#aaa;">No hay tareas realizadas.</li>';
    }
  }
}
// Función para mostrar/ocultar historial
function toggleHistorial() {
  const wrapper = document.getElementById('historial-wrapper');
  const btn = document.getElementById('toggle-historial');
  if (wrapper.style.display === 'none' || wrapper.style.display === '') {
    wrapper.style.display = 'block';
    btn.textContent = 'Ocultar historial ▲';
  } else {
    wrapper.style.display = 'none';
    btn.textContent = 'Ver historial ▼';
  }
}

function marcarRealizada(index) {
  tareas[index].realizada = !tareas[index].realizada;
  localStorage.setItem('tareas', JSON.stringify(tareas));
  verTareas();
}

function eliminarTarea(index) {
  tareas.splice(index, 1);
  localStorage.setItem('tareas', JSON.stringify(tareas));
  verTareas();
  mostrarMensaje('Tarea eliminada', 'error');
}

function editarTarea(index) {
  const input = document.getElementById('input-tarea');
  input.value = tareas[index].texto;
  input.focus();
  editando = index;
}

function deleteHistory() {
  tareas = [];
  localStorage.removeItem('tareas');
  verTareas();
  mostrarMensaje('Historial eliminado', 'error');
}

// Enter para agregar/editar tarea
document.getElementById('input-tarea').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    agregarTarea();
  }
});

// Mostrar tareas al cargar la página
window.onload = verTareas;
