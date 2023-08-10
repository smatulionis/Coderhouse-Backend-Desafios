class ProductManager {
    constructor() {
        this.products = []
        this.id = 1;
    }
    
    addProduct(product) {

        if (!product.title || !product.description|| !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.log("Debe ingresar todos los campos");
            return;
        }
        
        const prod = this.products.find(prod => prod.code === product.code)

        if (prod) {
            console.log("El código del producto ya existe");
        } else {
            product.id = this.id++;
            this.products.push(product);
        }
    }
    
    getProducts() {
        console.log(this.products)
    }

    getProductById(id) {
        const product = this.products.find(prod => prod.id === id);
        if (product) {
            console.log(product);
        } else {
            console.log("Product not found");
        }    
    }         
}
  
const productManager = new ProductManager();
  
  productManager.addProduct({
    title: "Producto 1",
    description: "Descripción producto 1",
    price: 500,
    thumbnail: "ruta/imagen1.jpg",
    code: "456",
    stock: 200,
  });

  productManager.addProduct({
    title: "Producto 2",
    description: "Descripción producto 2",
    price: 1000,
    thumbnail: "ruta/imagen2.jpg",
    code: "987",
    stock: 100,
  });

  productManager.addProduct({
    title: "Producto 3",
    description: "Descripción producto 3",
    price: 2000,
    thumbnail: "ruta/imagen3.jpg",
    code: "698",
    stock: 300,
  });

productManager.getProducts();
productManager.getProductById(3);


