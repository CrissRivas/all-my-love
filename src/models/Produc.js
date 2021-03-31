import {Schema, model} from 'mongoose'

const productSchema = new Schema({
    nombre: String,
    alto: Number,
    ancho: Number,
    profundo: Number,
    descripcion: String,
    precio: Number,
    imgUrl: [String],
    inventario: Number,
    proveedor: String
},{
    timestamps: true,
    versionKey: false
})

export default model('Product', productSchema)