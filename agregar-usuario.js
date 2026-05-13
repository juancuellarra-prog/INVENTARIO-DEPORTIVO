function initAgregarUsuario() {
    const addForm = document.getElementById('add-form-usuarios');
    const title = document.querySelector('h1');
    const submitBtn = addForm.querySelector('button[type="submit"]');
    let isEdit = false;
    let editId = null;

    // Verificar si es edición
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('id')) {
        isEdit = true;
        editId = urlParams.get('id');
        title.textContent = 'Editar Usuario';
        submitBtn.textContent = 'Actualizar Usuario';
        loadUsuarioForEdit(editId);
    }

    // Manejar submit del formulario
    addForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const edad = parseInt(document.getElementById('edad').value);
        const rol = document.getElementById('rol').value;
        const estado = document.getElementById('estado').value === 'true';
        const contraseña = document.getElementById('contraseña').value;

        const data = { nombre, correo, edad, rol, estado };
        if (contraseña) data.contraseña = contraseña;

        if (isEdit) {
            // Actualizar
            try {
                const response = await fetch(`${API_BASE}/usuarios/${editId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (!response.ok) throw new Error('Error al actualizar usuario');
                alert('Usuario actualizado exitosamente');
                window.location.href = 'usuarios.html';
            } catch (error) {
                console.error('Error:', error);
                alert('Error al actualizar usuario');
            }
        } else {
            // Crear
            try {
                const response = await fetch(`${API_BASE}/usuarios`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (!response.ok) throw new Error('Error al crear usuario');
                alert('Usuario creado exitosamente');
                window.location.href = 'usuarios.html';
            } catch (error) {
                console.error('Error:', error);
                alert('Error al crear usuario');
            }
        }
    });

    // Cargar usuario para editar
    async function loadUsuarioForEdit(id) {
        try {
            const response = await fetch(`${API_BASE}/usuarios/${id}`);
            if (!response.ok) throw new Error('Error al cargar usuario');
            const usuario = await response.json();
            document.getElementById('nombre').value = usuario.nombre;
            document.getElementById('correo').value = usuario.correo;
            document.getElementById('edad').value = usuario.edad;
            document.getElementById('rol').value = usuario.rol;
            document.getElementById('estado').value = usuario.estado ? 'true' : 'false';
            // No cargar contraseña por seguridad
        } catch (error) {
            console.error('Error:', error);
            alert('Error al cargar usuario para editar');
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAgregarUsuario);
} else {
    initAgregarUsuario();
}