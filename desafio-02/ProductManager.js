const fs = require("fs")

class ProductManager {
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
      return console.log("producto agregado de forma correcta")
    }
  }

  getProductById = async (id) => {
    const listProducts = await this.getProducts()
    const product = listProducts.find((p) => p.id === id)
    return product === undefined ? "Not Found" : product
  }

  updateProduct = async (id, dato) => {
    const product = await this.getProductById(id)
    if (product) {
      let productUpdate = await Object.assign(product, dato)
      await this.deleteProduct(id)
      const listProducts = await this.getProducts()
      listProducts.push(productUpdate)
      await fs.promises.writeFile(this.path, JSON.stringify(listProducts))
      return console.log("producto actualizado")
    } return "Not Found ID"
  }

  deleteProduct = async (id) => {
    const listProducts = await this.getProducts()
    const newListProduct = await listProducts.filter((p) => p.id !== id)
    await fs.promises.writeFile(this.path, JSON.stringify(newListProduct))
  }
}

/* const managerProd = async () => {
  const manager = new ProductManager('localDB.json')
  await manager.addProduct('pepas', 'galletitas dulces', 20, 'nueva foto', 80, 12)
  await manager.addProduct('sonrisas', 'galletitas dulces', 20, 'nueva foto', 560, 12)
  manager.deleteProduct(2)
  manager.updateProduct(3, { title: 'pitusas' })
}

managerProd() */