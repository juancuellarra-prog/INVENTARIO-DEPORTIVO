function initLogin() {
    const loginForm = document.getElementById('login-form');

    // Manejar submit del formulario
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const correo = document.getElementById('correo').value;
        const contraseña = document.getElementById('contraseña').value;

        try {
            const response = await fetch(`${API_BASE}/usuarios/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ correo, contraseña })
            });

            if (response.ok) {
                // Login exitoso, redirigir al dashboard
                window.location.href = 'dashboard.html';
            } else {
                // Login fallido
                alert('Credenciales incorrectas. Inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al conectar con el servidor. Inténtalo más tarde.');
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLogin);
} else {
    initLogin();
}