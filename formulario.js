document.getElementById('agregar-participante').addEventListener('click', () => {
    const nombre = document.getElementById('participante-nombre').value.trim();
    const documento = document.getElementById('documento-participante').value.trim();

    if (nombre && documento) {
        const participante = { nombre, documento };

        if (window.opener) {
            window.opener.postMessage(participante, '*');
            alert('Registro exitoso.');
            window.close();
        } else {
            alert('Error: El formulario no se abrió correctamente.');
        }
    } else {
        alert('Por favor, completa todos los campos.');
    }
});
