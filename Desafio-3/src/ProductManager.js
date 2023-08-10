import { promises as fs } from "fs";

export default class ProductManager {
    constructor() {
        this.path = "./productos.json";
    }

    async addProduct(product) {

        if (!product.title || !product.description|| !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.log("Debe ingresar todos los campos");
            return;
        }

        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        const producto = prods.find(prod => prod.code === product.code);

        if (producto) {
            console.log("Producto ya agregado");
        } else {
            prods.push(product);
            await fs.writeFile(this.path, JSON.stringify(prods));
        }
    }

    async getProducts() {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        return prods;
    }

    async getProductById(id) {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        const producto = prods.find(prod => prod.id === id);

        if (producto)
            console.log(producto);
        else
            console.log("Producto no encontrado");
    }

    async updateProduct (id, product) {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        const indice = prods.findIndex(prod => prod.id === id);

        if (indice != -1) {
            const updatedProduct = { ...prods[indice], ...product };
            prods[indice] = updatedProduct;
            await fs.writeFile(this.path, JSON.stringify(prods));
        } else {
            console.log("Producto no encontrado")
        }
    }

    async deleteProduct (id) {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        const producto = prods.find(prod => prod.id === id);
    
        if (producto) {
            await fs.writeFile(this.path, JSON.stringify(prods.filter(prod => prod.id != id)));
        } else {
            console.log("Producto no encontrado");
        }
    }
}

class Product {
    constructor(title, description, price, code, stock, thumbnail) {
        this.title = title;;
        this.description = description;
        this.price = price;
        this.code = code;
        this.stock = stock;
        this.thumbnail = thumbnail;
        this.id = Product.incrementarId();
    }

    static incrementarId() {
        if (this.idIncrement) {
            this.idIncrement++;
        } else {
            this.idIncrement = 1;
        }
        return this.idIncrement;
    }
}



