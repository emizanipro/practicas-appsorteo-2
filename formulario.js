document.getElementById('agregar-participante').addEventListener('click', () => {
    const nombre = document.getElementById('participante-nombre').value.trim();
    const documento = document.getElementById('documento-participante').value.trim();

    if (nombre && documento) {
        const participante = { nombre, documento };

        // Guardar en localStorage
        const participantes = JSON.parse(localStorage.getItem('participantes')) || [];
        const existe = participantes.some(p => p.documento === documento);

        if (!existe) {
            participantes.push(participante);
            localStorage.setItem('participantes', JSON.stringify(participantes));
            alert('Registro exitoso.');
            window.location.href = 'https://emizanipro.github.io/practicas-appsorteo-2/index.html'; // Redirigir a index.html
        } else {
            alert('Registro inválido. Ya existe un participante con este documento.');
        }
    } else {
        alert('Por favor, completa todos los campos.');
    }
});


