import { Schema, model } from 'mongoose'

const shotSchema = new Schema({
    artistaId: {
        type: String,
        unique: true
    },
    titulo: String,
    descripcion: String,
    imagen: String,
    link: String

}, {
    timestamps: true,
    versionKey: false
})

export default model('Shot', shotSchema)