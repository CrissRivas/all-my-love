import {Schema, model} from 'mongoose'

const inicioSchema = new Schema({
   news: [String],
   banner: String,
   bannerLink: String,
   banner2: String,
   banner2Link: String
},{
    timestamps: true,
    versionKey: false
})

export default model('Inicio', inicioSchema)