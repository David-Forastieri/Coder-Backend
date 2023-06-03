class ProductManager {
  constructor() {
    this.products = [];
  }

  addProducts = (title, description, price, thumbnail, code, stock) => {
    const search = this.products.some((p) => p.code === code)
    const totalProd = this.products.length
    const addID = totalProd > 0 ? this.products[totalProd - 1].id + 1 : 1

    if (!title || !description || !price || !thumbnail || !code || !stock) console.log('Se deben completar todos los campos')
    else if (search) {
      console.log('Codigo de producto existente')
    } else {
      const product = {
        id: addID,
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

  getProductsById = (id) => {
    const product = this.products.find((p) => p.id === id)
    return product === undefined ? "Not Found" : product
  }

}
