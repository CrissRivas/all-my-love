import {Schema, model} from 'mongoose'

const paperSchema = new Schema({
   encabezado: String,
   descripcion: String,
   img: [String],
   texto: String,
   tags: [String],
   stars: Number,
   votos: Number
},{
    timestamps: true,
    versionKey: false
})

export default model('Paper', paperSchema)