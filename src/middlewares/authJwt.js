import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Role from "../models/Role";

export const verifyToken = async (req,res, next) => {
    try {
        
    const token = req.headers[ "x-access-token"];

    console.log(token);
    if(!token) return res.status(403).json({message: "Se necesita un token"})
    const decoded =  jwt.verify(token,config.SECRET)
    req.userId = decoded.id;
    const user = await User.findById(req.userId,{password: 0} )
    if(!user) return res.status(404).json({ message: 'Usuario no encontrado'})
    if(!user.verify) return res.status(404).json({ message: 'Necesitas verificar tu correo'})
    next()
    } catch (error) {
        return res.status(401).json({message: 'No pasaras!'})
    }
}

export const isVendedor = async (req,res,next) =>{
   const user =  await User.findById(req.userId)
   const roles  = await Role.find({_id: {$in:user.roles}})
    for(let i = 0; i< roles.length; i++){
        if(roles[i].name === "vendedor"){
            next()
            return;
        }
       
    }
   
   return res.status(403).json({message: "No eres tan poderoso para hacer esto"})
}
export const isSoporte = async (req,res,next) =>{
    const user =  await User.findById(req.userId)
    const roles  = await Role.find({_id: {$in:user.roles}})
     for(let i = 0; i< roles.length; i++){
         if(roles[i].name === "soporte"){
             next()
             return;
         }
        
     }
    
    return res.status(403).json({message: "busca a alguien de soporte"}) 
}


export const isConejo = async (req,res,next) =>{

    const user =  await User.findById(req.userId)
    const roles  = await Role.find({_id: {$in:user.roles}})
     for(let i = 0; i< roles.length; i++){
         if(roles[i].name === "ConejoCyberpunk"){
             next()
             return;
         }
     }
    
    return res.status(403).json({message: "Sólo el elegido poderoso puede hacer esto"})
 
}


export const verificado = async(req,res,next)=>{

    const email = await User.findOne({email: req.body.email},{password: 0})
    if(!email.verify) return res.status(400).json({message: "el correo no esta verificado"})

    next();

}