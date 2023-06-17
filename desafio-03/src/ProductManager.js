import fs from 'fs'

export default class ProductManager {
  constructor(path) {
    this.path = path
  }

  getProducts = async () => {
    try {
      const response = await fs.promises.readFile(this.path, 'utf-8')
      const data = JSON.parse(response)
      return data
    } catch (error) {
      return []
    }
  }

  idGenerator = async (listProducts) => {
    let numeroMasAlto = 0
    for (let numero of listProducts) {
      if (numero.id > numeroMasAlto) {
        numeroMasAlto = numero.id;
      }
    }
    return numeroMasAlto + 1;
  }

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    const listProducts = await this.getProducts()
    const existingProduct = listProducts.some((p) => p.code === code)
    const nextID = await this.idGenerator(listProducts)
    if (!title || !description || !price || !thumbnail || !code || !stock) console.log('Se deben completar todos los campos')
    else if (existingProduct) {
      console.log('Codigo de producto existente')
    } else {
      const product = { id: nextID, title, description, price, thumbnail, code, stock }
      listProducts.push(product)
      await fs.promises.writeFile(this.path, JSON.stringify(listProducts))
      return console.log("Product added correctly")
    }
  }

  getProductById = async (id) => {
    const listProducts = await this.getProducts()
    const product = listProducts.find((p) => p.id === id)
    return product || "Not Found"
  }

  updateProduct = async (id, dato) => {
    const listProducts = await this.getProducts()
    for (let i in listProducts) {
      if (listProducts[i].id == id) {
        listProducts[i] = { ...listProducts[i], ...dato }
        await fs.promises.writeFile(this.path, JSON.stringify(listProducts))
        return console.log("Updated product")
      } return "Not Found ID"
    }
  }

  deleteProduct = async (id) => {
    const listProducts = await this.getProducts()
    const newListProduct = await listProducts.filter((p) => p.id !== id)
    await fs.promises.writeFile(this.path, JSON.stringify(newListProduct))
    return "Deleted product"
  }
}
