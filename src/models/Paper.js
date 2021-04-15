import {Schema, model} from 'mongoose'

const inicioSchema = new Schema({
   encabezado: String,
   img: [String],
   texto: String,
   tags: [String],
   stars: number,
   votos: number
},{
    timestamps: true,
    versionKey: false
})

export default model('Inicio', inicioSchema)