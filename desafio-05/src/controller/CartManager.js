import fs from 'fs'

export default class CartManager {
  constructor(path) {
    this.path = path
  }

  idGenerator = async (listCart) => {
    let numeroMasAlto = 0
    for (let numero of listCart) {
      if (numero.id > numeroMasAlto) {
        numeroMasAlto = numero.id;
      }
    }
    return numeroMasAlto + 1;
  }

  getAllCarts = async () => {
    try {
      const response = await fs.promises.readFile(this.path, 'utf-8')
      const data = JSON.parse(response)
      return data
    } catch (error) {
      return []
    }
  }

  createNewCart = async (products) => {
    try {
      const listCart = await this.getAllCarts()
      const nextID = await this.idGenerator(listCart)
      const cart = { id: nextID, products: products }
      listCart.push(cart)
      await fs.promises.writeFile(this.path, JSON.stringify(listCart))
      return console.log("Cart created Successfully")
    } catch (error) {
      console.log(error)
    }
  }

  getCartById = async (id) => {
    try {
      const listCart = await this.getAllCarts()
      const cart = listCart.find((p) => p.id === id)
      return cart || "Not Found"
    } catch (error) {
      console.log(error)
    }
  }

  addProductInCart = async (cartId, productId) => {
    try {
      const listCart = await this.getAllCarts()
      const cart = listCart.find((p) => p.id === cartId)
      if (!cart) throw new Error('Cart not found!')
      if (cart) {
        for (const product of cart.products) {
          if (product.id === productId) {
            product.quantity = product.quantity + 1 || 1
            await fs.promises.writeFile(this.path, JSON.stringify(listCart))
            return console.log("Updated product")
          }
        }
        cart.products.push({ id: productId, quantity: 1 })
        await fs.promises.writeFile(this.path, JSON.stringify(listCart))
        return console.log("Added product")
      }
    } catch (error) {
      console.log(error)
    }
  }

}