document.getElementById('agregar-participante').addEventListener('click', () => {
    const nombre = document.getElementById('participante-nombre').value.trim();
    const documento = document.getElementById('documento-participante').value.trim();

    if (nombre && documento) {
        const participante = { nombre, documento };
        window.opener.postMessage(participante, '*'); // Enviar el participante al parent
        alert('Registro exitoso.');
        window.close(); // Cerrar el formulario
    } else {
        alert('Por favor, completa todos los campos.');
    }
});

