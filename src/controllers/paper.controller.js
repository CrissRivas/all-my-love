import Paper from "../models/Paper"

export const createPaper = async(req, res) => {
    try {
        const newPaper = new Paper(req.body)
        const paperSalvado = await newPaper.save()
        return res.status(201).json(paperSalvado)
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: " sucedio algo inesperado, intente despues." })
    }
}

export const getPapers = async(req, res) => {
    try {
        const papers = await Paper.find({}).sort({ "createdAt": -1 })
        return res.status(201).json(papers)
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: " sucedio algo inesperado, intente despues." })
    }
}

export const getPaper = async(req, res) => {
    try {
        const paper = await Paper.findOne({ _id: req.params.id })
        return res.status(201).json(paper)

    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: " sucedio algo inesperado, intente despues." })
    }
}

export const putPaper = async(req, res) => {
    try {
        const paper = await Paper.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        return res.status(201).json(paper)

    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: " sucedio algo inesperado, intente despues." })
    }
}

export const deletePaper = async(req, res) => {
    try {
        await Paper.findOneAndDelete({ _id: req.params.id })
        return res.status(201).json({ messaje: "Paper borrado" })

    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: " sucedio algo inesperado, intente despues." })
    }
}