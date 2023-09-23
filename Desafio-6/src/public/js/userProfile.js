const logoutButton = document.getElementById("logoutButton");

logoutButton.addEventListener("click", function() {
    fetch("/api/sessions/logout", {
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        if (data.response === 'Usuario deslogueado') {
            window.location.href = '/userlogin';
        }
    })
    .catch(error => {
        console.error("Error al cerrar sesión:", error);
    });
});