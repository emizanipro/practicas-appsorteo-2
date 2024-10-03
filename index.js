document.addEventListener('DOMContentLoaded', () => {

    const formulario = document.getElementById('sorteo-form');
    const cantidadGanadoresInput = document.getElementById('cantidad-ganadores');
    const premiosContainer = document.getElementById('premios-container');
    const abrirQrBtn = document.getElementById('abrir-qr');
    const overlayQr = document.querySelector('.overlay-qr');
    const cerrarQrBtn = document.getElementById('cerrar-qr');
    const overlayResultados = document.querySelector('.overlay-resultados');
    const reiniciarSorteoBtn = document.getElementById('reiniciar-sorteo');
    const listaParticipantes = document.getElementById('lista-participantes');

    let participantes = [];

    // Escuchar el mensaje del formulario
    window.addEventListener('message', (event) => {
        const participante = event.data;
    
        if (participante) {
            const existe = participantes.some(p => p.documento === participante.documento);
            if (!existe) {
                agregarParticipanteALaLista(participante.nombre, participante.documento);
                alert('Registro exitoso.');
            } else {
                alert('Registro inválido. Ya existe un participante con este documento.');
            }
        }
    });
    

    // Cargar participantes desde localStorage al iniciar
    function cargarParticipantes() {
        const participantes = JSON.parse(localStorage.getItem('participantes')) || [];
        participantes.forEach(participante => {
            agregarParticipanteALaLista(participante.nombre, participante.documento);
        });
    }
    cargarParticipantes();




//agregar participante a la lista
function agregarParticipanteALaLista(nombreParticipante, documentoParticipante) {
    const li = document.createElement('li');
    li.textContent = `${nombreParticipante} (Doc: ${documentoParticipante})`;

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = '❌';
    botonEliminar.style.marginLeft = '10px';
    botonEliminar.addEventListener('click', () => {
        borrarParticipante(nombreParticipante, documentoParticipante, li);
    });

    li.appendChild(botonEliminar);
    listaParticipantes.appendChild(li);
}





    //borrar participante de la lista
    function borrarParticipante(nombreParticipante, documentoParticipante, elementoLi) {
        let participantes = JSON.parse(localStorage.getItem('participantes')) || [];
        participantes = participantes.filter(participante => !(participante.nombre === nombreParticipante && participante.documento === documentoParticipante));
        
        localStorage.setItem('participantes', JSON.stringify(participantes));
        listaParticipantes.removeChild(elementoLi);
    }

    //Manejo del nombre del Evento 
    formulario.addEventListener('submit', (event) => {
        event.preventDefault();
        const nombreSorteo = document.getElementById('sorteo-nombre').value.trim();
        const cantidadGanadores = parseInt(cantidadGanadoresInput.value);

        if (participantes.length === 0) {
            alert('No hay participantes para realizar el sorteo.');
            return;
        }

        if (cantidadGanadores > participantes.length) {
            alert('Hay menos participantes que premios. No se puede realizar el sorteo.');
            return;
        }

        const ganadores = seleccionarGanadores(participantes, cantidadGanadores);
        mostrarResultados(nombreSorteo, ganadores);
    });




    //Seleccionar los ganadores de la lista
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



    //Resultados de Ganadores y Premios
    function mostrarResultados(nombreSorteo, ganadores) {
        const resultadosDiv = overlayResultados.querySelector('#resultados-overlay');
        resultadosDiv.innerHTML = `<h3> Evento : "${nombreSorteo}":</h3>`;
        const listaGanadores = document.createElement('ul');

        ganadores.forEach((ganador, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}: ${ganador.nombre} (Doc: ${ganador.documento})`;
            listaGanadores.appendChild(li);
        });

        resultadosDiv.appendChild(listaGanadores);
        overlayResultados.style.display = 'flex';
    }

    //Reiniicar el Sorteo
    reiniciarSorteoBtn.addEventListener('click', () => {
        participantes = [];
        listaParticipantes.innerHTML = '';
        document.getElementById('resultados').innerHTML = '<h3>No hay sorteos realizados aún.</h3>';
        overlayResultados.style.display = 'none';
        document.getElementById('sorteo-nombre').value = '';
        cantidadGanadoresInput.value = 1;
        premiosContainer.innerHTML = '';
        generarInputsPremios(1);
    });




    //Manejo de Cantidad de Ganadores del Sorteo
    cantidadGanadoresInput.addEventListener('input', () => {
        const cantidadGanadores = parseInt(cantidadGanadoresInput.value);
        generarInputsPremios(cantidadGanadores);
    });



    //Manejo de Premios y Auspiciantes del Sorteo
    function generarInputsPremios(cantidad) {
        premiosContainer.innerHTML = '';
        for (let i = 0; i < cantidad; i++) {
            const divPremio = document.createElement('div');
            divPremio.classList.add('contenedor-premio');

            const inputPremio = document.createElement('input');
            inputPremio.type = 'text';
            inputPremio.placeholder = `Premio N° ${i + 1}`;
            divPremio.appendChild(inputPremio);

            const inputAuspiciante = document.createElement('input');
            inputAuspiciante.type = 'text';
            inputAuspiciante.placeholder = `Auspiciante N° ${i + 1}`;
            divPremio.appendChild(inputAuspiciante);

            premiosContainer.appendChild(divPremio);
        }
    }

    generarInputsPremios(1);




    //ABRIR QR
    abrirQrBtn.addEventListener('click', () => {
        const qrCodeContainer = overlayQr.querySelector('.qr-code-container');
        qrCodeContainer.innerHTML = '';

        const urlAgregarParticipante = 'https://emizanipro.github.io/practicas-appsorteo-2/formulario.html';
        $(qrCodeContainer).qrcode({
            text: urlAgregarParticipante,
            width: 256,
            height: 256
        });

        overlayQr.style.display = 'block';
    });

    cerrarQrBtn.addEventListener('click', () => {
        overlayQr.style.display = 'none';
    });
});





