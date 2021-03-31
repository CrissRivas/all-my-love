import {Schema, model} from 'mongoose'

export const ROLES = ["comprador", "vendedor","soporte", "ConejoCyberpunk"]

const roleSchema = new Schema({
    name: String
},{
    versionKey : false
})

export default model('Role', roleSchema);