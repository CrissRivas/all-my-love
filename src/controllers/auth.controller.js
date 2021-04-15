import  User  from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";
import nodemailer from "nodemailer";
import { token } from "morgan";

export const signUp = async (req,res) => {
    const{username, email, password}=req.body;
    
    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password),
        roles: '605fa4d617f3bf37305b7ad9',
        verify: false
    })
   

    // if(roles){
    //    const foundRoles = await Role.find({name: {$in: roles} })
    //    newUser.roles = foundRoles.map(role => role._id)
    // }else{
    //     const role = await Role.findOne({name: 'comprador'})
    //     newUser.roles = [role.id];
    // }

   
    const savedUser = await newUser.save()
    console.log(savedUser);

    const token = jwt.sign({id: savedUser._id}, config.SECRET,{
        expiresIn: 86400
    })


    const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.mx',
        port: 587,
        secure: false,
        auth: {
            user: 'hola@conejo-cyberpunk.xyz',
            pass: 'c8P>=yH3A#'
        },
        tls: {
            rejectUnautorized: false
        }
    });

    const info = await transporter.sendMail({
        from: "'Autómata errante' <hola@conejo-cyberpunk.xyz>",
        to: email,
        subject: "verificacion de correo",
        text: "http://localhost:4000/api/auth/signup/"+token
    })


    res.status(200).json({message: "Todo cool" })
}

export const signIn = async (req,res) => { 
    const{ username, email, password, roles}=req.body;
    const userFound = await User.findOne({email: req.body.email}).populate("roles");
    if(!userFound) return res.status(400).json({message: 'Usuario no encontrado'})

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)
    
    if(!matchPassword) return res.status(401).json({ token: null, message: "Contraseña invalida"})
    const token = jwt.sign({id: userFound._id},config.SECRET,{
        expiresIn: 86400
    })
    res.json({token})
}

export const verifyEmail = async (req,res) => { 
try {
    const token = req.params.userPass;
    const decoded =  jwt.verify(token,config.SECRET)
    console.log(decoded);    
    req.userId = decoded.id;
    const user = await User.findById(req.userId,{password: 0} )
    if(!user) return res.status(404).json({ message: 'Usuario no encontrado'})
    user.verify = true
    await User.findByIdAndUpdate(req.userId, user)
    res.status(200).json({message: "usuario verificado con exito"})
} catch (error) {
    
}

}