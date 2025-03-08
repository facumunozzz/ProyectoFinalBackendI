import express from 'express'
import handlebars from 'express-handlebars'
import path from 'node:path'
import VistaRoute from './routes/vista.route.js'
import ProductsRoute from './routes/products.route.js'
import CarritoRoute from './routes/carts.route.js'
import { connectToMongo } from './connections/mongo.js'

const app = express()

app.engine('handlebars', handlebars.engine())
app.set('views', path.join(process.cwd(),'src','views'))
app.set('view engine', 'handlebars')

app.use(express.static(path.join(process.cwd(),'src','public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/products',ProductsRoute)
app.use('/api/carrito',CarritoRoute)
app.use('/', VistaRoute)

connectToMongo()

app.listen(8080, () => {
    console.log('Servidor ON')
})