import Artista from "../models/Artista"


export const createArtista = async(req, res) => {

    try {

        const newArtista = new Artista(req.body);
        const artistaSaved = await newArtista.save()
        res.status(201).json(artistaSaved)
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: " sucedio algo inesperado, intente despues." })
    }
}

export const getArtistas = async(req, res) => {
    try {
        const artistas = await Artista.find()
        res.json(artistas)

    } catch (error) {
        console.log(error);
        res.status(401).json({ message: " sucedio algo inesperado, intente despues." })
    }
}

export const getArtista = async(req, res) => {
    try {
        const artista = await Artista.findOne({ nombre: req.params.nombre });
        res.json(artista)
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