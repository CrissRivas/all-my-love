import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";
import nodemailer from "nodemailer";
import { token } from "morgan";


export const signUp = async(req, res) => {
    const { username, email, password } = req.body;

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password),
        verify: false
    })
    const role = await Role.findOne({ name: 'comprador' })
    newUser.roles = [role.id];


    const savedUser = await newUser.save()
    console.log(savedUser);

    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
        expiresIn: 86400
    })


    const transporter = nodemailer.createTransport({
        host: config.HOST_CORREO,
        port: config.PORT_CORREO,
        secure: false,
        auth: {
            user: 'hola@automataerrante.com',
            pass: config.PASS_CORREO
        },
        tls: {
            rejectUnautorized: false
        }
    });

    const info = await transporter.sendMail({
        from: "'Autómata errante' <hola@automataerrante.com>",
        to: email,
        subject: "verificacion de correo",
        text: "http://localhost:4000/api/auth/signup/" + savedUser._id
    })


    res.status(200).json({ message: "Todo cool" })
}

export const signIn = async(req, res) => {
    const { username, email, password, roles } = req.body;
    const userFound = await User.findOne({ email: req.body.email }).populate("roles");
    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    if (!matchPassword) return res.status(401).json({ token: null, message: "Contraseña invalida" })
    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 86400
    })
    res.json({ token })
}

export const verifyEmail = async(req, res) => {
    try {
        const token = req.params.userPass;
        const user = await User.findById(token)
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })
        else {
            user.verify = true
            await User.findByIdAndUpdate(token, user, { new: true })
            res.status(200).json({ message: "Usuario verificado con exito" })
        }
    } catch (error) {
        return res.status(400).json({ message: 'Sucedio algo paranormal, consulte con soporte' })
    }


}

export const verifyTokenTime = async(req, res) => {
    try {
        const token = req.headers["authorization"];
        if (!token) return res.status(403).json({ "validToken": false })
        else {
            const Btoken = token.slice(7, 999)
            const decoded = jwt.verify(Btoken, config.SECRET)
            if (!decoded) return res.status(403).json({ "validToken": false })
            else {
                res.status(200).json({ "validToken": true })
            }
        }


    } catch (error) {
        return res.status(403).json({ "validToken": false })
    }
}