import { model, Schema } from "mongoose";

const productosCollections = 'productos';

const productoSchema = new Schema({
    nombre: {
        type: String,
        require: true
    },
    categoria: {
        type: String,
        require: true,
    },
    precio: {
        type: Number,
        require:true
    },
    stock: {
        type: Number,
        Require: true
    }
})

export const ProductosModel = model(productosCollections, productoSchema)
