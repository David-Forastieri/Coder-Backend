import { Router } from 'express'
import CartManager from './../controller/CartManager.js';

const router = Router()

const manager = new CartManager('src/carts.json')

router.post('/', async (req, res) => {
  const products = req.body
  try {
    await manager.createNewCart(products)
    res.status(200).send({ msg: 'Cart created Successfully' })
  } catch (error) {
    console.log(error)
  }
})

router.get('/:cid', async (req, res) => {
  const cartId = parseInt(req.params.cid);
  if (!cartId || isNaN(cartId)) return res.send({ msg: "Valor ingresado, no valido" })
  const cart = await manager.getCartById(cartId);
  res.send(cart)

})

router.post('/:cid/product/:pid', async (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);
  try {
    await manager.addProductInCart(cartId, productId)
    res.status(200).send({ msg: "Added product" })
  } catch (error) {
    console.log(error)
  }
})

export default router