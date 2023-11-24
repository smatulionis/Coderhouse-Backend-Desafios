const logoutButton = document.getElementById('logoutButton');

logoutButton.addEventListener('click', function() {
    fetch('/api/sessions/logout', {
        method: 'GET'
    })
    .then(response => {
        if (response.status === 200) {
            window.location.href = '/userlogin';
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error al cerrar sesión:', error);
    });
});