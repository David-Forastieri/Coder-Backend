import express from 'express'
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js'
import ProductManager from './controller/ProductManager.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//app.use('/static', express.static('src/public/'))

app.use('/', viewsRouter)

app.engine('handlebars', handlebars.engine())
app.set('views', 'src/views')
app.set('view engine', 'handlebars');

const manager = new ProductManager('src/productos.json')
const httpServer = app.listen(8080, () => console.log("#--Listening port 8080--#"))

const io = new Server(httpServer)

io.on('connection', socket => {
  socket.on('new-product', async data => {
    const { title, description, code, price, stock, category, thumbnails } = data
    await manager.addProduct(
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnails
    )
    const allProducts = await manager.getProducts()

    io.emit('reload-table', allProducts)

  })

  socket.on('delete-product', async id => {
    await manager.deleteProduct(id)
    const allProducts = await manager.getProducts()

    io.emit('reload-table', allProducts)

  })
})