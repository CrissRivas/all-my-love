import { Schema, model } from 'mongoose'

const productSchema = new Schema({
    nombre: {
        type: String,
        unique: true
    },
    nombreId: {
        type: String,
        unique: true
    },
    envio: {
        weight: Number,
        width: Number,
        depth: Number,
        height: Number
    },
    descripcion: String,
    descripcionCorta: String,
    engranes: Number,
    tags: [String],
    precio: Number,
    imgUrl: [String],
    inventario: Number,
    proveedor: String,
    casa: String,
    origin: {
        ref: "Origin",
        type: Schema.Types.ObjectId,
        required: false
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model('Product', productSchema)