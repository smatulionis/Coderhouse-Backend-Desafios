const regForm = document.getElementById('registryForm');

regForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const datForm = new FormData(e.target);
    const userData = Object.fromEntries(datForm);

    fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.response === 'Usuario creado con éxito') {
            window.location.href = '/userlogin';
        }
    })
    .catch(error => {
        console.error('Error al crear el usuario:', error);
    });
      
    e.target.reset();
});

