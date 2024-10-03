document.getElementById('agregar-participante').addEventListener('click', () => {
    const nombre = document.getElementById('participante-nombre').value.trim();
    const documento = document.getElementById('documento-participante').value.trim();

    if (nombre && documento) {
        const participante = { nombre, documento };
        window.opener.postMessage(participante, '*'); // Enviar el participante al parent
        alert('Registro exitoso.'); // Muestra el mensaje de éxito antes de cerrar
        window.close(); // Cerrar el formulario
    } else {
        alert('Por favor, completa todos los campos.');
    }
});



document.getElementById('abrir-qr').addEventListener('click', () => {
    const urlAgregarParticipante = 'https://emizanipro.github.io/practicas-appsorteo-2/formulario.html';
    window.open(urlAgregarParticipante, '_blank');
});
