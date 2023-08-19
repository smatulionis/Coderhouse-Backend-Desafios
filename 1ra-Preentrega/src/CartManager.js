import { promises as fs } from "fs";

export default class CartsManager {
    constructor() {
        this.path = "./src/models/carts.json";
    }

    async addCart() {
        const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        const lastCartId = carts.length > 0 ? carts[carts.length - 1].id : 0;
        const newCart = { id: lastCartId + 1, products: [] };
        carts.push(newCart);
        await fs.writeFile(this.path, JSON.stringify(carts));
    }

    async getCartById(id) {
        const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        const findedCart = carts.find(cart => cart.id === id);

        if (findedCart) {
            return findedCart.products;
        } else {
            console.log("Carrito no encontrado");
        }
    }

    async addProduct(cid, pid) {
        const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        const indice = carts.findIndex(cart => cart.id === cid);

        if (indice !== -1) {
            const findedCart = carts[indice];
            const productIndex = findedCart.products.findIndex((prod)=> prod.product === pid);

            if (productIndex !== -1){
                findedCart.products[productIndex].quantity++;
            } else{
                findedCart.products.push({product: pid, quantity: 1})
            }
            
            await fs.writeFile(this.path, JSON.stringify(carts)); 
            return true;
        } else {
            console.log("Carrito no encontrado");
        }
    }
}
