import { Schema, model } from 'mongoose'

const artistaSchema = new Schema({
    nombre: {
        type: String,
        unique: true
    },
    imgPerfil: String,
    descripcion: String,
    descripcionCorta: String,
    frase: String,
    liston: String,
    premio: String,
    posicion: Number,
    estado: String,
    redes: [String],
    imgPortada: String,
    imgFondo: String,
    comics: [String],
    tags: [String],
    seguidores: Number,
    casa: String,
    rango: String,
    artRecomendado: [String],
    comicRecomendado: [String],


}, {
    timestamps: true,
    versionKey: false
})

export default model('Artista', artistaSchema)