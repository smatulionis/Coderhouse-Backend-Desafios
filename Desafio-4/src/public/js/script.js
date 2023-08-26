const socket = io();
const form = document.getElementById('idForm')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const datForm = new FormData(e.target)
    const prod = Object.fromEntries(datForm)
    console.log(prod)
    socket.emit('nuevoProducto', prod)
    e.target.reset()
})

socket.on('prods', (newProds) => {
    parrafosProductos.innerHTML = ""
    newProds.forEach(prod => {
        parrafosProductos.innerHTML += `<p>Title: ${prod.title} Descripción: ${prod.description} Price: ${prod.price} Code: ${prod.code} Stock: ${prod.stock} Category: ${prod.category} Status: ${prod.status} Id: ${prod.id}</p>`
    })
})


