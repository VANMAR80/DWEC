document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('datosForm');
    const tablaContainer = document.getElementById('tabla-container');
    const cambiarColorBtn = document.getElementById('cambiar-color');
    const listaNombres = document.getElementById('lista-nombres');
    const cambiarIframeBtn = document.getElementById('cambiar-iframe');
    let usuarios = [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const fecha = document.getElementById('fecha').value;
        const fechaActual = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual en formato YYYY-MM-DD

        if (nombre && email && fecha) {
            if (fecha < fechaActual) {
                alert('La fecha de disponibilidad no puede ser anterior a la fecha actual.');
                return;
            }
            agregarFilaTabla(nombre, email, fecha);
            usuarios.push(nombre);
            actualizarListaNombres();
            form.reset();
        } else {
            alert('Todos los campos son obligatorios.');
        }
    });

    function agregarFilaTabla(nombre, email, fecha) {
        let tabla = tablaContainer.querySelector('table');
        if (!tabla) {
            tabla = document.createElement('table');
            tabla.innerHTML = `
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Fecha de Disponibilidad</th>
                    </tr>
                </thead>
                <tbody></tbody>
            `;
            tablaContainer.appendChild(tabla);
        }
        const tbody = tabla.querySelector('tbody');
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${nombre}</td>
            <td>${email}</td>
            <td>${fecha}</td>
        `;
        tbody.appendChild(fila);
    }

    function actualizarListaNombres() {
        listaNombres.innerHTML = '<h3>Nombres Ingresados:</h3><ul>' + usuarios.map(nombre => `<li>${nombre}</li>`).join('') + '</ul>';
    }

    cambiarColorBtn.addEventListener('click', () => {
        const confirmacion = confirm('¿Quieres cambiar el color de fondo de la tabla?');
        if (confirmacion) {
            const tabla = tablaContainer.querySelector('table');
            if (tabla) {
                tabla.style.backgroundColor = tabla.style.backgroundColor === 'lightblue' ? 'white' : 'lightblue';
            }
        }
    });

    cambiarIframeBtn.addEventListener('click', () => {
        const iframe = document.getElementById('miIframe');
        iframe.src = 'https://www.ejemplo.com';
    });
});
