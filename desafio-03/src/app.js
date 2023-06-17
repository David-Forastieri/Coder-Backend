import express from "express";
import ProductManager from "./ProductManager.js";

const app = express()

const manager = new ProductManager('src/localDB.json');

app.get('/products', async (req, res) => {
  let limit = parseInt(req.query.limit);
  const products = await manager.getProducts();
  limit ? res.send(products.slice(0, limit)) : res.send(products)
})

app.get('/products/:pid', async (req, res) => {
  const pid = parseInt(req.params.pid);
  const products = await manager.getProductById(pid);
  res.send(products)
})

app.listen(8080, () => console.log("#listen port 8080#"))