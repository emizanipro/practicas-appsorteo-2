
//Formulario para Lista de Participantes
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

            // Notificar al administrador (opcional, puedes implementarlo)
            notificarAdministradorNuevoParticipante();

            // Limpiar campos después del registro
            document.getElementById('participante-nombre').value = '';
            document.getElementById('documento-participante').value = '';
        } else {
            alert('Registro inválido. Ya existe un participante con este documento.');
        }
    } else {
        alert('Por favor, completa todos los campos.');
    }
});

// Función para notificar al administrador de nuevos participantes (puedes ajustar la lógica según tu aplicación)
function notificarAdministradorNuevoParticipante() {
    // Aquí puedes agregar la lógica para notificar al administrador, por ejemplo:
    // Puedes enviar una señal al administrador para que actualice la lista de participantes
    // Puedes utilizar WebSockets, polling, o cualquier otro método que prefieras.
    // Ejemplo básico:
    // window.opener.postMessage('nuevo-participante', '*');
}

