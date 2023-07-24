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

export default router