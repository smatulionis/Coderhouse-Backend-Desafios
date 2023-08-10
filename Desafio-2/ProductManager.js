import fs from "fs"

export default class ProductManager {
    constructor() {
        this.path = "./productos.json";
    }

    addProduct(product) {

        if (!product.title || !product.description|| !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.log("Debe ingresar todos los campos");
            return;
        }

        const prods = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        const producto = prods.find(prod => prod.code === product.code);

        if (producto) {
            console.log("Producto ya agregado");
        } else {
            prods.push(product);
            fs.writeFileSync(this.path, JSON.stringify(prods));
        }
    }

    getProducts() {
        const prods = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        return prods;
    }

    getProductById(id) {
        const prods = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        const producto = prods.find(prod => prod.id === id);

        if (producto)
            console.log(producto);
        else
            console.log("Producto no encontrado");
    }

    updateProduct (id, product) {
        const prods = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        const indice = prods.findIndex(prod => prod.id === id);

        if (indice != -1) {
            const updatedProduct = { ...prods[indice], ...product };
            prods[indice] = updatedProduct;
            fs.writeFileSync(this.path, JSON.stringify(prods));
        } else {
            console.log("Producto no encontrado")
        }
    }

    deleteProduct (id) {
        const prods = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        const producto = prods.find(prod => prod.id === id);
    
        if (producto) {
            fs.writeFileSync(this.path, JSON.stringify(prods.filter(prod => prod.id != id)));
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

// const producto1 = new Product("Producto 1", "Descripcion producto 1", 500, "123", 200, []);
// const producto2 = new Product("Producto 2", "Descripcion producto 2", 1000, "12345", 100, []);
// const producto3 = new Product("Producto 3", "Descripcion producto 3", 200, "789", 50, []);
// const producto4 = new Product("Producto 4", "Descripcion producto 4", 800, "900", 300, []);


// const productManager = new ProductManager();

// productManager.addProduct(producto1);
// productManager.addProduct(producto2);
// productManager.addProduct(producto3);
// productManager.addProduct(producto4);

// productManager.getProductById(1);
// productManager.updateProduct(3, { title: "asdasd" });
// productManager.deleteProduct(1)