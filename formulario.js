
//Formulario para Lista de Participantes
document.getElementById('agregar-participante').addEventListener('click', () => {
    const nombre = document.getElementById('participante-nombre').value.trim();
    const documento = document.getElementById('documento-participante').value.trim();

    if (nombre && documento) {
        const participante = { nombre, documento };

        // Guardar en localStorage (como ejemplo para mostrar)
        const participantes = JSON.parse(localStorage.getItem('participantes')) || [];
        const existe = participantes.some(p => p.documento === documento);

        if (!existe) {
            participantes.push(participante);
            localStorage.setItem('participantes', JSON.stringify(participantes));
            alert('Registro exitoso.');
            //Cierra la Página una ves que el registro fue exitoso
            window.close();        
        } else {
            alert('Registro inválido. Ya existe un participante con este documento.');
        }
    } else {
        alert('Por favor, completa todos los campos.');
    }
});
