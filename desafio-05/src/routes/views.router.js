import { Router } from "express";
import ProductManager from "../controller/ProductManager.js";

const router = Router()
const manager = new ProductManager('src/productos.json')

router.get('/', async (req, res) => {
  const AllProducts = await manager.getProducts()
  res.render('home', { AllProducts })
})

router.get('/realtimeproducts', async (req, res) => {
  const AllProducts = await manager.getProducts()
  res.render('realTimeProducts', { AllProducts })
})

router.get('/form', async (req, res) => {
  res.render('form', {})
})

router.post('/form', async (req, res) => {
  const { title, description, code, price, stock, category, thumbnails } = req.body
  await manager.addProduct(title, description, code, price, stock, category, thumbnails)
  res.redirect('/')
})

export default router