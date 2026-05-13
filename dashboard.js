function initDashboard() {
    loadTotals();
}

async function loadTotals() {
    try {
        // Cargar productos
        const productosResponse = await fetch(`${API_BASE}/productos`);
        if (productosResponse.ok) {
            const productos = await productosResponse.json();
            document.getElementById('total-productos').textContent = productos.length;
        } else {
            document.getElementById('total-productos').textContent = 'Error';
        }

        // Cargar usuarios
        const usuariosResponse = await fetch(`${API_BASE}/usuarios`);
        if (usuariosResponse.ok) {
            const usuarios = await usuariosResponse.json();
            document.getElementById('total-usuarios').textContent = usuarios.length;
        } else {
            document.getElementById('total-usuarios').textContent = 'Error';
        }
    } catch (error) {
        console.error('Error al cargar totales:', error);
        document.getElementById('total-productos').textContent = 'Error';
        document.getElementById('total-usuarios').textContent = 'Error';
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboard);
} else {
    initDashboard();
}