import { Schema, model } from 'mongoose'


const originSchema = new Schema({
    sender: String,
    nameSender: String,
    lastNameSender: String,
    emailSender: String,
    phoneSender: String,
    addressOrigin: String,
    numberOrigin: String,
    codePostalOrigin: String,
    country: String,
}, {
    versionKey: false
})

export default model('Origin', originSchema);