import { promises as fs } from "fs";

export default class ProductManager {
    constructor() {
        this.path = "./src/models/productos.json";
    }

    async addProduct(product) {
        if (!product.title || !product.description|| !product.price || !product.code || !product.stock || !product.category) {
            console.log("Debe ingresar todos los campos");
            return true;
        }

        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        const findedProduct = prods.find(prod => prod.code === product.code);

        if (findedProduct) {
            console.log("El producto ya existe");
            return true;
        } else {
            const lastProductId = prods.length > 0 ? prods[prods.length - 1].id : 0;
            const newProduct = { ...product, status: true, id: lastProductId + 1 };
            prods.push(newProduct);
            await fs.writeFile(this.path, JSON.stringify(prods));
        }
    }

    async getProducts() {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        return prods;
    }

    async getProductById(id) {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        const findedProduct = prods.find(prod => prod.id === id);

        if (findedProduct) {
            console.log(findedProduct);
            return findedProduct;
        } else {
            console.log("Producto no encontrado");
        }
    }

    async updateProduct (id, product) {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        const index = prods.findIndex(prod => prod.id === id);

        if (index != -1) {
            const updatedProduct = { ...prods[index], ...product };
            prods[index] = updatedProduct;
            await fs.writeFile(this.path, JSON.stringify(prods));
        } else {
            console.log("Producto no encontrado")
        }
    }

    async deleteProduct (id) {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        const findedProduct = prods.find(prod => prod.id === id);
    
        if (findedProduct) {
            await fs.writeFile(this.path, JSON.stringify(prods.filter(prod => prod.id != id)));
        } else {
            console.log("Producto no encontrado");
        }
    }
}
