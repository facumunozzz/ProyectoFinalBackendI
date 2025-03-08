import { model, Schema } from "mongoose";

const carritoCollections = 'carrito';

const carritoSchema = new Schema({
    descripcion: {
        type: String,
        require: true
    },
    productos: {
        type: Number,
        default: 0
    }
})

export const CarritoModel = model(carritoCollections, carritoSchema)
