const regForm = document.getElementById('registerForm');

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
    .then(response => {
        if (response.status === 201) {
            window.location.href = '/userlogin';
        }
        return response.json();
    }) 
    .then(data => {
        console.log(data);
    })   
    .catch(error => {
        console.error('Error al crear el usuario:', error);
    });
      
    e.target.reset();
});
