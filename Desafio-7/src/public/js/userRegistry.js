const regForm = document.getElementById('registryForm');

regForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const datForm = new FormData(e.target);
    const userData = Object.fromEntries(datForm);

    fetch('/api/sessions/register', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.message === 'Usuario creado con éxito') {
            window.location.href = '/userlogin';
        }
    })
    .catch(error => {
        console.error('Error al crear el usuario:', error);
    });
      
    e.target.reset();
});

