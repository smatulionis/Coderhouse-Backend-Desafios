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
    .then(response => {
        if (response.status === 200) {
            window.location.href = '/home';
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error en login:', error);
    });
      
    e.target.reset();
});
