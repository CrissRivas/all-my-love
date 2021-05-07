import Shot from "../models/Shot"


export const nuevoShot = async(req, res) => {
    try {
        const newShot = new Shot(req.body)
        const shotSalvado = await newShot.save()
        res.status(201).json(shotSalvado)
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: " sucedio algo inesperado, intente despues." })
    }
}

export const getShots = async(req, res) => {
    try {
        const shots = await Shot.find().sort({ "createdAt": -1 })
        res.status(201).json(shots)
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: " sucedio algo inesperado, intente despues." })
    }
}