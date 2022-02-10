import Origin from "../models/Origin"
import User from "../models/User"
import Artista from "../models/Artista"


export const nuevoOrigin = async(req, res) => {
    try {
        const newOrigin = new Origin(req.body)
        const originSaved = await newOrigin.save()
        const user = await User.findById(req.userId, { password: 0 })
        const artista = await Artista.findById(user.artista)
        artista.origin = originSaved._id
        const newArtista = await Artista.findByIdAndUpdate(artista._id, artista, { new: true })
        res.status(200).json(originSaved)

    } catch (error) {
        console.log(error);
        res.status(401).json({ message: " sucedio algo inesperado, intente despues." })
    }
}

export const miOrigin = async(req, res) => {
    try {
        const user = await User.findById(req.userId, { password: 0 })
        const artista = await Artista.findById(user.artista)
        const origin = await Origin.findById(artista.origin)

        res.status(200).json(origin)
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: " sucedio algo inesperado, intente despues." })
    }
}

export const changeOrigin = async(req, res) => {
    try {
        const user = await User.findById(req.userId, { password: 0 })
        const artista = await Artista.findById(user.artista)
        const origin = await Origin.findByIdAndUpdate(artista.origin, req.body, { new: true })
        res.status(200).json(origin)
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: " sucedio algo inesperado, intente despues." })
    }
}