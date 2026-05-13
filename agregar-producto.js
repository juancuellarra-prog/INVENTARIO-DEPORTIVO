function initAgregarProducto() {
    const addForm = document.getElementById('add-form');
    const title = document.querySelector('h1');
    const submitBtn = addForm.querySelector('button[type="submit"]');
    let isEdit = false;
    let editId = null;

    // Verificar si es edición
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('id')) {
        isEdit = true;
        editId = urlParams.get('id');
        title.textContent = 'Editar Producto';
        submitBtn.textContent = 'Actualizar Producto';
        loadProductoForEdit(editId);
    }

    // Manejar submit del formulario
    addForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const categoria = document.getElementById('categoria').value;
        const stock = parseInt(document.getElementById('stock').value);
        const precio = parseFloat(document.getElementById('precio').value);

        if (isEdit) {
            // Actualizar
            try {
                const response = await fetch(`${API_BASE}/productos/${editId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre, precio, stock, categoria })
                });
                if (!response.ok) throw new Error('Error al actualizar producto');
                alert('Producto actualizado exitosamente');
                window.location.href = 'productos.html';
            } catch (error) {
                console.error('Error:', error);
                alert('Error al actualizar producto');
            }
        } else {
            // Crear
            try {
                const response = await fetch(`${API_BASE}/productos`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre, precio, stock, categoria })
                });
                if (!response.ok) throw new Error('Error al crear producto');
                alert('Producto creado exitosamente');
                window.location.href = 'productos.html';
            } catch (error) {
                console.error('Error:', error);
                alert('Error al crear producto');
            }
        }
    });

    // Cargar producto para editar
    async function loadProductoForEdit(id) {
        try {
            const response = await fetch(`${API_BASE}/productos/${id}`);
            if (!response.ok) throw new Error('Error al cargar producto');
            const producto = await response.json();
            document.getElementById('nombre').value = producto.nombre;
            document.getElementById('categoria').value = producto.categoria;
            document.getElementById('stock').value = producto.stock;
            document.getElementById('precio').value = producto.precio;
        } catch (error) {
            console.error('Error:', error);
            alert('Error al cargar producto para editar');
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAgregarProducto);
} else {
    initAgregarProducto();
}