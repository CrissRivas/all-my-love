import Artista from "../models/Artista"
import User from "../models/User";
import Role from "../models/Role";

export const createArtista = async(req, res) => {
    try {
        const newArtista = new Artista(req.body);
        const artistaSaved = await newArtista.save()
        const user = await User.findById(req.userId, { password: 0 })
        user.artista = artistaSaved._id
        const role = await Role.findOne({ name: 'vendedor' })
        user.roles.push(role._id)
        await User.findByIdAndUpdate(req.userId, user, { new: true })
        res.status(201).json(artistaSaved)

    } catch (error) {
        console.log(error);
        res.status(401).json({ message: " sucedio algo inesperado, intente despues." })
    }
}

export const getArtistas = async(req, res) => {
    try {
        const artistas = await Artista.find()
        res.status(200).json(artistas)

    } catch (error) {
        console.log(error);
        res.status(401).json({ message: " sucedio algo inesperado, intente despues." })
    }
}

export const getArtista = async(req, res) => {
    try {
        const artista = await Artista.findOne({ nombreId: req.params.nombre });
        if (artista == null) return res.status(404).json({ message: "Artista no encontrado" })
        else { res.status(200).json(artista) }
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: " sucedio algo inesperado, intente despues." })
    }
}


export const getArtistaById = async(req, res) => {
    try {
        const artista = await Artista.findById(req.params.id);
        if (artista == null) return res.status(404).json({ message: "Artista no encontrado" })
        else { res.status(200).json(artista) }
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: " sucedio algo inesperado, intente despues." })
    }
}

export const putArtista = async(req, res) => {
    try {
        const encontrado = await Artista.findById(req.params.artistaId)
        if (!encontrado) res.status(401).json({ messaje: "no encontrado" })
        const artista = await Artista.findByIdAndUpdate(req.params.artistaId, req.body, { new: true });

        res.json(artista)
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "sucedio algo inesperado, intente despues." })
    }
}

export const deleteArtista = async(req, res) => {
    try {
        const encontrado = await Artista.findById(req.params.artistaId)
        if (!encontrado) res.status(401).json({ messaje: "no encontrado" })
        await Artista.findOneAndDelete(req.params.artistaId)
        res.status(204).json()
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: " sucedio algo inesperado, intente despues." })
    }
}