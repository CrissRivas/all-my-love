import { Schema, model } from 'mongoose'
import Product from "../models/Produc"
import bcrypt from "bcryptjs"

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }],
    verify: Boolean,
    Kart: [String],
    artista: {
        ref: "Artista",
        type: Schema.Types.ObjectId,
        required: false
    }
}, {
    timestamps: true,
    versionKey: false
});

userSchema.statics.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}


userSchema.statics.comparePassword = async(password, recivedPassword) => {
    return await bcrypt.compare(password, recivedPassword)
}

export default model('User', userSchema);