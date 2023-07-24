import { Router } from 'express'
import ProductManager from '../controller/ProductManager.js';
const router = Router()

const manager = new ProductManager('src/productos.json')

router.get('/', async (req, res) => {
  //traer todos los productos
  let limit = parseInt(req.query.limit);
  try {
    const products = await manager.getProducts();
    limit ? res.send(products.slice(0, limit)) : res.send(products)
  } catch (error) {
    res.status(500).send({ mesagge: `Internal server error. ${error}` })
  }
})

router.get('/:pid', async (req, res) => {
  //obtenemos el id del producto a buscar
  const productId = parseInt(req.params.pid);
  try {
    if (!productId || isNaN(productId)) return res.send({ msg: "Valor ingresado, no valido" })
    const products = await manager.getProductById(productId);
    res.send(products)
  } catch (error) {
    res.status(500).send({ mesagge: `Internal server error. ${error}` })
  }
})

router.post('/', async (req, res) => {
  //crear un nuevo producto con los datos enviados
  const { title, description, code, price, stock, category, thumbnails } = req.body
  if (!title || !description || !price || !thumbnails || !Array.isArray(thumbnails) || !code || !stock || !category) return res.status(400).send("Todos los datos son obligatorios")
  else {
    try {
      await manager.addProduct(
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails
      )
      res.status(200).send({ msg: "Product added correctly" })
    } catch (error) {
      res.status(500).send({ mesagge: `Internal server error. ${error}` })
    }
  }
})

router.put('/:pid', async (req, res) => {
  //actualizar un producto
  const productId = parseInt(req.params.pid);
  const data = req.body
  if (!productId || isNaN(productId)) return res.send({ msg: "Valor ingresado, no valido" })
  try {
    await manager.updateProduct(productId, data)
    res.status(200).send({ msg: "Updated product" })
  } catch (error) {
    res.status(500).send({ mesagge: `Internal server error. ${error}` })
  }
})

router.delete('/:pid', async (req, res) => {
  //eliminar un producto
  const productId = parseInt(req.params.pid);
  if (!productId || isNaN(productId)) return res.send({ msg: "Valor ingresado, no valido" })
  try {
    await manager.deleteProduct(productId)
    res.status(200).send({ msg: "Deleted product" })
  } catch (error) {
    res.status(500).send({ mesagge: `Internal server error. ${error}` })
  }
})

export default router