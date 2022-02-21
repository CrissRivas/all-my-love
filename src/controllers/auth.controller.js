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
        text: "http://localhost:4200/correo/" + savedUser._id
    })


    res.status(200).json({ message: "Se ha enviado un mensaje a tu correo" })
}

export const signIn = async(req, res) => {
    try {

        const { username, email, password, roles } = req.body;
        const userFound = await User.findOne({ email: req.body.email }).populate("roles");

        if (!!userFound) {
            const matchPassword = await User.comparePassword(req.body.password, userFound.password)

            if (!matchPassword) { return res.status(400).json({ token: null, message: "Contraseña invalida" }) } else {
                const token = jwt.sign({ id: userFound._id }, config.SECRET, {
                    expiresIn: 86400
                })
                return res.status(200).json({ token })
            }
        } else {
            return res.status(400).json({ token: null, message: "Correo invalido" })
        }


    } catch (error) {

        res.status(401).json({ token: null, message: "Algo extraño sucedio" })
    }
}

export const verifyEmail = async(req, res) => {
    try {
        const id = req.params.userPass;
        console.log(id);
        const user = await User.findById(id, { password: 0 })
        console.log(user);
        if (!user) { return res.status(404).json({ msg: 'Usuario no encontrado', go: false }) } else {
            user.verify = true
            await User.findByIdAndUpdate(id, user, { new: true })
            res.status(200).json({ msg: "Usuario verificado con exito", go: true })
        }
    } catch (error) {
        return res.status(400).json({ msg: 'Sucedio algo paranormal, consulte con soporte', go: false })
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