import { Router } from 'express'
import ProductManager from '../controller/ProductManager.js';
const router = Router()

const manager = new ProductManager('src/productos.json')

router.get('/', async (req, res) => {
  //traer todos los productos
  let limit = parseInt(req.query.limit);
  const products = await manager.getProducts();
  limit ? res.send(products.slice(0, limit)) : res.send(products)
})

router.get('/:pid', async (req, res) => {
  //obtenemos el id del producto a buscar
  const productId = parseInt(req.params.pid);
  if (!productId || isNaN(productId)) return res.send({ msg: "Valor ingresado, no valido" })
  const products = await manager.getProductById(productId);
  res.send(products)
})

router.post('/', async (req, res) => {
  //crear un nuevo producto con los datos enviados
  const { title, description, code, price, stock, category, thumbnails } = req.body
  if (!title || !description || !price || !thumbnails || !code || !stock || !category) return res.status(400).send("Todos los datos son obligatorios")
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
      console.log(error)
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
    console.log(error)
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
    console.log(error)
  }
})

export default router