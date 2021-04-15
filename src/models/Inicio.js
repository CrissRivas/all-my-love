import {Schema, model} from 'mongoose'

const inicioSchema = new Schema({
   news: [String],
   banner: [String],
   historias: [String],
   banner2: [String],
   papers: [String]
},{
    timestamps: true,
    versionKey: false
})

export default model('Inicio', inicioSchema)