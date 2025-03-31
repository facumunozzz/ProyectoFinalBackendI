import { Router } from "express";
import { CarritoModel } from "./../models/carrito.model.js";
import { CarritoDao } from "../models/dao/carrito.dao.js";

const route = Router();
const CarritoService = new CarritoDao(CarritoModel);

route.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    const result = await CarritoService.getById(cid).populate('productos.productoId'); 
    
    if (!result) return res.status(500).json({ mensaje: 'Error en la consulta a la BBDD' });

    res.status(200).json({ mensaje: 'get by id with populate', payload: result });
});

route.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    
    const carrito = await CarritoService.getById(cid);
    if (!carrito) return res.status(404).json({ mensaje: 'Carrito no encontrado' });

    carrito.productos = carrito.productos.filter(p => p.productoId.toString() !== pid);
    const result = await carrito.save();

    if (!result) return res.status(500).json({ mensaje: 'Error al eliminar el producto del carrito' });
    res.status(200).json({ mensaje: 'Producto eliminado del carrito', payload: result });
});

route.put('/:cid', async (req, res) => {
    const { cid } = req.params;
    const { productos } = req.body; 

    const carrito = await CarritoService.getById(cid);
    if (!carrito) return res.status(404).json({ mensaje: 'Carrito no encontrado' });

    carrito.productos = productos; 
    const result = await carrito.save();

    if (!result) return res.status(500).json({ mensaje: 'Error al actualizar el carrito' });
    res.status(200).json({ mensaje: 'Carrito actualizado', payload: result });
});

route.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { cantidad } = req.body; 

    const carrito = await CarritoService.getById(cid);
    if (!carrito) return res.status(404).json({ mensaje: 'Carrito no encontrado' });

    const productoIndex = carrito.productos.findIndex(p => p.productoId.toString() === pid);
    if (productoIndex === -1) return res.status(404).json({ mensaje: 'Producto no encontrado en el carrito' });

    carrito.productos[productoIndex].cantidad = cantidad; 
    const result = await carrito.save();

    if (!result) return res.status(500).json({ mensaje: 'Error al actualizar la cantidad del producto' });
    res.status(200).json({ mensaje: 'Cantidad del producto actualizada', payload: result });
});

route.delete('/:cid', async (req, res) => {
    const { cid } = req.params;

    const carrito = await CarritoService.getById(cid);
    if (!carrito) return res.status(404).json({ mensaje: 'Carrito no encontrado' });

    carrito.productos = []; 
    const result = await carrito.save();

    if (!result) return res.status(500).json({ mensaje: 'Error al eliminar los productos del carrito' });
    res.status(200).json({ mensaje: 'Todos los productos eliminados del carrito', payload: result });
});

export default route;
