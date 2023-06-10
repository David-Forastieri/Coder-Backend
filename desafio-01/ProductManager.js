class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct = (title, description, price, thumbnail, code, stock) => {
    const existingProduct = this.products.some((p) => p.code === code)
    const totalProd = this.products.length
    const nextID = totalProd > 0 ? this.products[totalProd - 1].id + 1 : 1

    if (!title || !description || !price || !thumbnail || !code || !stock) console.log('Se deben completar todos los campos')
    else if (existingProduct) {
      console.log('Codigo de producto existente')
    } else {
      const product = {
        id: nextID,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      }
      this.products.push(product);
    }
  }

  getProducts = () => this.products;

  getProductById = (id) => {
    const product = this.products.find((p) => p.id === id)
    return product === undefined ? "Not Found" : product
  }

}
/* 
const elem = new ProductManager()
elem.addProducts('pepas', 'galletitas dulces', 20, 'nueva foto', 45, 12)
console.log(elem.getProducts()) */