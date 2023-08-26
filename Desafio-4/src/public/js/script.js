const socket = io();
const form = document.getElementById('idForm')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const datForm = new FormData(e.target)
    const prod = Object.fromEntries(datForm)
    console.log(prod)
    socket.emit('newProduct', prod)
    e.target.reset()
})

socket.on('prods', (newProds) => {
    parrafosProductos.innerHTML = ""
    newProds.forEach(prod => {
        parrafosProductos.innerHTML += `<p>Título: ${prod.title} Descripción: ${prod.description} Precio: ${prod.price} Código: ${prod.code} Stock: ${prod.stock} Categoría: ${prod.category} Estado: ${prod.status} Id: ${prod.id}</p>`
    })
})


