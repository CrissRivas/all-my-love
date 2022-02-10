import { Schema, model } from 'mongoose'

const artistaSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: true
    },
    nombreId: {
        type: String,
        unique: true,
        required: true
    },
    imgPerfil: String,
    descripcion: String,
    descripcionCorta: String,
    frase: String,
    liston: String,
    premio: String,
    posicion: Number,
    estado: String,
    redes: { instagram: String, facebook: String, twitter: String, devianArt: String },
    imgPortada: String,
    imgFondo: String,
    comics: [{
        ref: "Product",
        type: Schema.Types.ObjectId
    }],
    tags: [String],
    seguidores: Number,
    casa: String,
    rango: String,
    artRecomendado: [String],
    comicRecomendado: [String],
    verifyArtist: Boolean,
    origin: {
        ref: "Origin",
        type: Schema.Types.ObjectId,
        required: false
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model('Artista', artistaSchema)