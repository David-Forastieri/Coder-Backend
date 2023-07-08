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

  addProduct = async (title, description, code, price, stock, category, thumbnails) => {
    try {
      const listProducts = await this.getProducts()
      const existingProduct = listProducts.some((p) => p.code === code)
      const nextID = await this.idGenerator(listProducts)
      if (!title || !description || !price || !thumbnails || !code || !stock || !category) console.log('Se deben completar todos los campos')
      else if (existingProduct) {
        return console.log('Codigo de producto existente')
      } else {
        const product = { id: nextID, title, description, code, price, stock, category, thumbnails, status: true }
        listProducts.push(product)
        await fs.promises.writeFile(this.path, JSON.stringify(listProducts))
        return console.log("Product added correctly")
      }
    } catch (error) {
      console.log(error)
    }
  }

  getProductById = async (id) => {
    try {
      const listProducts = await this.getProducts()
      const product = listProducts.find((p) => p.id === id)
      return product || "Not Found"
    } catch (error) {
      console.log(error)
    }
  }

  updateProduct = async (id, dato) => {
    try {
      const listProducts = await this.getProducts()
      for (let i in listProducts) {
        if (listProducts[i].id === id) {
          listProducts[i] = { ...listProducts[i], ...dato }
          await fs.promises.writeFile(this.path, JSON.stringify(listProducts))
          return console.log("Updated product")
        }
      }
      return console.log("Not Found ID")
    } catch (error) {
      console.log(error)
    }
  }

  deleteProduct = async (id) => {
    try {
      const listProducts = await this.getProducts()
      const newListProduct = await listProducts.filter((p) => p.id !== id)
      await fs.promises.writeFile(this.path, JSON.stringify(newListProduct))
      return console.log("Deleted product")
    } catch (error) {
      console.log(error)
    }
  }
}
