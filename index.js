document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const formulario = document.getElementById('sorteo-form');
    const listaParticipantes = document.getElementById('lista-participantes');
    const agregarParticipanteBtn = document.getElementById('agregar-participante');
    const reiniciarSorteoBtn = document.getElementById('reiniciar-sorteo');
    const cantidadGanadoresInput = document.getElementById('cantidad-ganadores');
    const premiosContainer = document.getElementById('premios-container');
    const abrirQrBtn = document.getElementById('abrir-qr');
    const overlayQr = document.querySelector('.overlay-qr');
    const cerrarQrBtn = document.getElementById('cerrar-qr');
    const overlayResultados = document.querySelector('.overlay-resultados');

    let participantes = [];

    // === Sorteo ===

    formulario.addEventListener('submit', (event) => {
        event.preventDefault();

        const nombreSorteo = document.getElementById('sorteo-nombre').value.trim();
        const cantidadGanadores = parseInt(cantidadGanadoresInput.value);
        const premios = Array.from(document.querySelectorAll('.premio-input')).map(input => input.value);

        // Validaciones
        if (participantes.length === 0) {
            alert('No hay participantes para realizar el sorteo.');
            return;
        }

        if (cantidadGanadores > participantes.length) {
            alert('Hay menos participantes que premios. No se puede realizar el sorteo.');
            return;
        }

        if (premios.some(premio => !premio)) {
            alert('Todos los premios deben estar llenos.');
            return;
        }

        const ganadores = seleccionarGanadores(participantes, cantidadGanadores);
        mostrarResultados(nombreSorteo, ganadores, premios);
    });

    function seleccionarGanadores(participantes, cantidad) {
        const ganadores = [];
        const indicesSeleccionados = new Set();
    
        while (ganadores.length < cantidad && ganadores.length < participantes.length) {
            const indiceGanador = Math.floor(Math.random() * participantes.length);
            if (!indicesSeleccionados.has(indiceGanador)) {
                ganadores.push(participantes[indiceGanador]); // Asegúrate de que esto devuelva el objeto completo
                indicesSeleccionados.add(indiceGanador);
            }
        }
    
        return ganadores;
    }
    

    function mostrarResultados(nombreSorteo, ganadores, premios) {
        const resultadosDiv = overlayResultados.querySelector('#resultados-overlay');
        resultadosDiv.innerHTML = `<h3> Evento : "${nombreSorteo}":</h3>`;
        const listaGanadores = document.createElement('ul');

        ganadores.forEach((ganador, index) => {
            const premio = premios[index] || 'Sin premio';
            const li = document.createElement('li');
            li.textContent = `${index + 1}: ${ganador.nombre} (Doc: ${ganador.documento}) - ${premio}`; // Mostrar nombre y documento
            listaGanadores.appendChild(li);
        });
        
        

        resultadosDiv.appendChild(listaGanadores);
        overlayResultados.style.display = 'flex';
    }

    reiniciarSorteoBtn.addEventListener('click', () => {
        participantes = [];
        listaParticipantes.innerHTML = '';
        document.getElementById('resultados').innerHTML = '<h3>No hay sorteos realizados aún.</h3>';
        overlayResultados.style.display = 'none'; // Cerrar el overlay
        document.getElementById('sorteo-nombre').value = '';
        cantidadGanadoresInput.value = 1;
        premiosContainer.innerHTML = ''; // Limpiar premios
        generarInputsPremios(1); // O el número que desees por defecto
    });

    // === Premios ===

    cantidadGanadoresInput.addEventListener('input', () => {
        const cantidadGanadores = parseInt(cantidadGanadoresInput.value);
        generarInputsPremios(cantidadGanadores);
    });

    function generarInputsPremios(cantidad) {
        premiosContainer.innerHTML = ''; // Limpiar inputs anteriores

        for (let i = 0; i < cantidad; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = `Premio N° ${i + 1}`;
            input.className = 'premio-input';
            premiosContainer.appendChild(input);
        }
    }

    generarInputsPremios(1);

    // === QR ===

    abrirQrBtn.addEventListener('click', () => {
        const qrCodeContainer = overlayQr.querySelector('.qr-code-container');
        qrCodeContainer.innerHTML = ''; // Limpiar contenido
    
        // Generar el nuevo QR
        $(qrCodeContainer).qrcode({
            text: 'Texto para agregar participante',
            width: 256,
            height: 256
        });
    
        overlayQr.style.display = 'block';
    });

    // Cerrar overlay del QR
    cerrarQrBtn.addEventListener('click', () => {
        overlayQr.style.display = 'none'; // Ocultar el overlay
    });

    // === Lista Participantes ===

    agregarParticipanteBtn.addEventListener('click', () => {
        const participanteInput = document.getElementById('participante-nombre');
        const documentoInput = document.getElementById('documento-participante'); // Captura el input de documento
        let nombreParticipante = participanteInput.value.trim();
        let documentoParticipante = documentoInput.value.trim();
    
        if (nombreParticipante && documentoParticipante) {
            const nombreNormalizado = nombreParticipante.toLowerCase();
            const existe = participantes.some(participante => participante.nombre.toLowerCase() === nombreNormalizado && participante.documento === documentoParticipante);
    
            if (existe) {
                alert('El participante ya está en la lista con ese documento.');
                return;
            }
    
            // Agrega el participante con nombre y documento
            participantes.push({ nombre: nombreParticipante, documento: documentoParticipante });
            agregarParticipanteALaLista(nombreParticipante, documentoParticipante); // Pasa también el documento
            participanteInput.value = '';
            documentoInput.value = ''; // Limpia el campo de documento
        } else {
            alert('Por favor, ingresa un nombre y apellido, así como el documento.');
        }
    });
    
    //  agregar el participante a la lista
    function agregarParticipanteALaLista(nombreParticipante, documentoParticipante) {
        const li = document.createElement('li');
        li.textContent = `${nombreParticipante} (Doc: ${documentoParticipante})`; // Muestra el documento junto al nombre
    
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = '❌';
        botonEliminar.style.marginLeft = '10px';
        botonEliminar.addEventListener('click', () => borrarParticipante(nombreParticipante, documentoParticipante, li)); // Pasa el documento también
    
        li.appendChild(botonEliminar);
        listaParticipantes.appendChild(li);
    }
    
    // borrar un participante
    function borrarParticipante(nombreParticipante, documentoParticipante, elementoLi) {
        participantes = participantes.filter(participante => !(participante.nombre === nombreParticipante && participante.documento === documentoParticipante));
        listaParticipantes.removeChild(elementoLi);
    }
    

});
