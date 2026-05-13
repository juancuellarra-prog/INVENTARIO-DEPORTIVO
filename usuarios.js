function initUsuarios() {
    const tbodyUsuarios = document.getElementById('usuarios-tbody');

    // Cargar usuarios al cargar la página
    loadUsuarios();

    // Función para cargar usuarios
    async function loadUsuarios() {
        try {
            const response = await fetch(`${API_BASE}/usuarios`);
            if (!response.ok) throw new Error('Error al cargar usuarios');
            const usuarios = await response.json();
            renderUsuarios(usuarios);
        } catch (error) {
            console.error('Error:', error);
            alert('Error al cargar usuarios');
        }
    }

    // Renderizar usuarios en la tabla
    function renderUsuarios(usuarios) {
        tbodyUsuarios.innerHTML = '';
        usuarios.forEach(usuario => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.correo}</td>
                <td>${usuario.rol}</td>
                <td>${usuario.estado ? 'Activo' : 'Inactivo'}</td>
                <td>
                    <a class="btn-edit" data-id="${usuario.id}">Editar</a>
                    <a class="btn-delete" data-id="${usuario.id}">Eliminar</a>
                </td>
            `;
            tbodyUsuarios.appendChild(row);
        });

        // Agregar event listeners a los botones
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const id = e.target.dataset.id;
                window.location.href = `agregar-usuario.html?id=${id}`;
            });
        });

        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const id = e.target.dataset.id;
                deleteUsuario(id);
            });
        });
    }

    // Eliminar usuario
    async function deleteUsuario(id) {
        if (!confirm('¿Estás seguro de que quieres eliminar este usuario?')) return;
        try {
            const response = await fetch(`${API_BASE}/usuarios/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Error al eliminar usuario');
            loadUsuarios(); // Recargar lista
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar usuario');
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUsuarios);
} else {
    initUsuarios();
}