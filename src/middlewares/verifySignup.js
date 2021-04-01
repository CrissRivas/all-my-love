import { ROLES } from "../models/Role";
import User from "../models/User";


export const checkDuplicatedUsernameOrEmail = async ( req,res,next)=>{
    const user = await User.findOne({username: req.body.username})

    if(user) return res.status(400).json({message: "el usuario ya existe"})

    const email = await User.findOne({email: req.body.email})

    if(email) return res.status(400).json({message: "el correo ya existe"})

    next();

}

export const checRolesIsNot = (req,res,next) =>{
    if(req.body.roles == "soporte"|| req.body.roles == "ConejoCyberpunk" ){
return res.status(400).json({message: "Espero que seas de sombrero blanco"})}
    next();
}




export const checRolesExisted = (req,res,next) =>{
    if(req.body.roles){
        for(let i= 0; i < req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])){
                return res.status(400).json({
                    message: ` Rol de ${req.body.roles[i]}, no existe, favor de no hacer cosas ilegales aqui `})
            }
        }
    }
    next();
}
