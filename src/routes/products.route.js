import { Router } from "express";
import {ProductosModel} from "../models/productos.model.js";

const route = Router()

const ProductosService = new ProductosDao(ProductosModel)

route.get('/', async (req, res) => {
    const result = await ProductosService.getAll()
    res.status(200).json({mensaje: 'get products', payload: result})
})

route.get('/:id', async (req, res) => {
    const { id } = req.params
    const result = await ProductosService.getById(id)
    res.status(200).json({mensaje: 'get by id', payload: result})
})

route.post('/', async (req, res) => {
    const { nombre, categoria, precio, stock } = req.body
    const result = await ProductosService.create({
        nombre,
        categoria,
        precio,
        stock
    })

    res.status(201).json({mensaje: 'se creo el producto', payload: result})

})

route.post('/:aid/asignar/:mid', async (req, res) => {
    const { aid, mid } = req.params
    const product = await ProductosService.getById(aid)
    product.materias.push({carritoId: mid})
    const productoActualizado = await ProductosService.update({_id: aid}, producto)
    res.json({mensaje: 'se agregó al carrito', payload: productoActualizado}) 
})

route.put('/:id', async (req, res) => {
    const newProducto = req.body
    const { id } = req.params
    const result = await ProductosService.update(id, newProducto)
    res.status(200).json({mensaje: 'se actualizo un producto', payload: result})
})

route.delete('/:id', async (req, res) => {
    const { id } = req.params
    await ProductosService.delete({ _id: id })
    res.status(200).json({mensaje: 'se elimino un producto'})
})


export default route

