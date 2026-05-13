function initProductos() {
    const tbody = document.getElementById('productos-tbody');

    // Cargar productos al cargar la página
    loadProductos();

    // Función para cargar productos
    async function loadProductos() {
        try {
            const response = await fetch(`${API_BASE}/productos`);
            if (!response.ok) throw new Error('Error al cargar productos');
            const productos = await response.json();
            renderProductos(productos);
        } catch (error) {
            console.error('Error:', error);
            alert('Error al cargar productos');
        }
    }

    // Renderizar productos en la tabla
    function renderProductos(productos) {
        tbody.innerHTML = '';
        productos.forEach(producto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.categoria}</td>
                <td>${producto.stock}</td>
                <td>$${producto.precio.toFixed(2)}</td>
                <td>
                    <a class="btn-edit" data-id="${producto.id}">editar</a>
                    <a class="btn-delete" data-id="${producto.id}">eliminar</a>
                </td>
            `;
            tbody.appendChild(row);
        });

        // Agregar event listeners a los botones
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const id = e.target.dataset.id;
                window.location.href = `agregar-producto.html?id=${id}`;
            });
        });

        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const id = e.target.dataset.id;
                deleteProducto(id);
            });
        });
    }

    // Eliminar producto
    async function deleteProducto(id) {
        if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) return;
        try {
            const response = await fetch(`${API_BASE}/productos/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Error al eliminar producto');
            loadProductos(); // Recargar lista
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar producto');
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductos);
} else {
    initProductos();
}