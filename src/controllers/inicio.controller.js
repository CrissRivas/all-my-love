import  Inicio from "../models/Inicio"


export const nuevoInicio = async(req,res) => {
    try {
        const newInicio = new Inicio(req.body)
        const inicioSalvado = await newInicio.save()
        res.status(201).json(inicioSalvado)
    } catch (error) {
        console.log(error);
        res.status(401).json({message : " sucedio algo inesperado, intente despues."})
    }
} 

export const getInicio = async (req,res) => {
    try {
        const inicio = await Inicio.findOne({}).sort({"createdAt": -1})
        res.status(201).json(inicio)
    } catch (error) {
        console.log(error);
        res.status(401).json({message : " sucedio algo inesperado, intente despues."})
    }
}

export const getInicios = async (req,res) => {
    try {
        const inicio = await Inicio.find({}).sort({"createdAt": -1})
        res.status(201).json(inicio)
    } catch (error) {
        console.log(error);
        res.status(401).json({message : " sucedio algo inesperado, intente despues."})
    }
}

export const putInicio = async (req,res) => {
    try {
        const inicio = await Inicio.findOneAndUpdate({},req.body,{new:true}).sort({"createdAt": -1})
        res.status(201).json(inicio)
    } catch (error) {
        console.log(error);
        res.status(401).json({message : " sucedio algo inesperado, intente despues."})
    }
}

export const deleteInicio = async (req,res) => {
    try {
        await Inicio.findOneAndDelete({}).sort({"createdAt": -1})
        res.status(201).json({message: "Inicio eliminado"})
    } catch (error) {
        console.log(error);
        res.status(401).json({message : " sucedio algo inesperado, intente despues."})
    }
}