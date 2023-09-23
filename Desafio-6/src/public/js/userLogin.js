const logForm = document.getElementById('loginForm');

logForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const datForm = new FormData(e.target);
    const userData = Object.fromEntries(datForm);

    fetch('/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.response === 'Login válido') {
            window.location.href = '/home';
        }
    })
    .catch(error => {
        console.error('Error en login:', error);
    });
      
    e.target.reset();
});

