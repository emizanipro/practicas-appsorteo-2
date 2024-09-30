document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('sorteo-form');
    const listaParticipantes = document.getElementById('lista-participantes');
    const agregarParticipanteBtn = document.getElementById('agregar-participante');
    const resultadosDiv = document.getElementById('resultados');
    const reiniciarSorteoBtn = document.getElementById('reiniciar-sorteo');

    let participantes = [];

    agregarParticipanteBtn.addEventListener('click', () => {
        const participanteInput = document.getElementById('participante-nombre');
        let nombreParticipante = participanteInput.value.trim();

        if (nombreParticipante) {
            // Convertir el nombre a minúsculas para evitar duplicados sin importar las mayúsculas
            const nombreNormalizado = nombreParticipante.toLowerCase();

            // Verificar si el nombre ya está en la lista
            const existe = participantes.some(participante => participante.toLowerCase() === nombreNormalizado);

            if (existe) {
                alert('El participante ya está en la lista.');
                return;
            }

            // Agregar el participante a la lista si no existe
            participantes.push(nombreParticipante);
            agregarParticipanteALaLista(nombreParticipante);
            participanteInput.value = ''; // Limpiar el campo
        } else {
            alert('Por favor, ingresa un nombre y apellido.');
        }
    });

    formulario.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevenir el envío del formulario

        const nombreSorteo = document.getElementById('sorteo-nombre').value.trim();
        const cantidadGanadores = parseInt(document.getElementById('cantidad-ganadores').value);

        // Verifica que haya participantes
        if (participantes.length === 0) {
            alert('No hay participantes para realizar el sorteo.');
            return;
        }

        const ganadores = seleccionarGanadores(participantes, cantidadGanadores);
        mostrarResultados(nombreSorteo, ganadores);
    });

    function agregarParticipanteALaLista(nombreParticipante) {
        const li = document.createElement('li');
        li.textContent = nombreParticipante;

        // Crear el botón para eliminar participante
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = '❌';
        botonEliminar.style.marginLeft = '10px';
        botonEliminar.addEventListener('click', () => borrarParticipante(nombreParticipante, li));

        li.appendChild(botonEliminar);
        listaParticipantes.appendChild(li);
    }

    function borrarParticipante(nombreParticipante, elementoLi) {
        // Remover el participante de la lista de nombres
        participantes = participantes.filter(participante => participante !== nombreParticipante);
        // Eliminar el elemento <li> de la lista visual
        listaParticipantes.removeChild(elementoLi);
    }

    function mostrarResultados(nombreSorteo, ganadores) {
        resultadosDiv.innerHTML = `<h3> Evento : "${nombreSorteo}":</h3>`;
        const listaGanadores = document.createElement('ul');

        ganadores.forEach((ganador, index) => {
            const li = document.createElement('p');
            li.textContent = `${index + 1}: ${ganador}`; // Enumerar la lista
            listaGanadores.appendChild(li);
        });

        resultadosDiv.appendChild(listaGanadores);
        reiniciarSorteoBtn.style.display = 'block'; // Mostrar botón de reinicio
    }

    function seleccionarGanadores(participantes, cantidad) {
        const ganadores = [];
        const indicesSeleccionados = new Set();

        while (ganadores.length < cantidad && ganadores.length < participantes.length) {
            const indiceGanador = Math.floor(Math.random() * participantes.length);
            if (!indicesSeleccionados.has(indiceGanador)) {
                ganadores.push(participantes[indiceGanador]);
                indicesSeleccionados.add(indiceGanador);
            }
        }

        return ganadores;
    }

    reiniciarSorteoBtn.addEventListener('click', () => {
        participantes = [];
        listaParticipantes.innerHTML = ''; // Limpiar la lista de participantes
        resultadosDiv.innerHTML = '<p>No hay sorteos realizados aún.</p>'; // Restablecer resultados
        reiniciarSorteoBtn.style.display = 'none'; // Ocultar botón de reinicio
        document.getElementById('sorteo-nombre').value = ''; // Limpiar nombre del sorteo
        document.getElementById('cantidad-ganadores').value = 1; // Reiniciar cantidad de ganadores
    });
});
