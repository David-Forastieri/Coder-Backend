import express from 'express'
import cartsRouter from './routes/carts.router.js'
import productsRouter from './routes/products.router.js'

const app = express()
app.use(express.json())

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)


app.listen(8080, () => console.log("#--listen port 8080--#"))