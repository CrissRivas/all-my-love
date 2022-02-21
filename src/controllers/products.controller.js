import Product from "../models/Produc"
import User from "../models/User"
import Artista from "../models/Artista"

export const createProduct = async(req, res) => {

    try {
        const user = await User.findById(req.userId, { password: 0 })

        const artista = await Artista.findById(user.artista)

        const newProduct = new Product(req.body);

        const productSaved = await newProduct.save()

        artista.comics.push(newProduct._id)

        const newArtista = await Artista.findByIdAndUpdate(user.artista, artista, { new: true })

        return res.status(201).json(productSaved)

    } catch (error) {
        return res.status(401).json(error)
    }
}

export const getProducts = async(req, res) => {
    try {

        const products = await Product.find()

        return res.status(200).json(products)

    } catch (error) {
        return res.status(401).json({ message: "sucedio algo inesperado, intente despues." })
    }
}
export const getProductByName = async(req, res) => {
    try {

        const producto = await Product.findOne({ nombreId: req.params.productName })
        if (producto == null) {
            return res.status(404).json({ message: "El cómic ha sido eliminado de la faz de la tierra o nunca existio." })
        } else {
            return res.status(201).json(producto)
        }


    } catch (error) {
        return res.status(400).json(error)

    }
}


export const updateProductById = async(req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true })

        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(401).json({ message: " sucedio algo inesperado, intente despues." })
    }
}



export const deleteProductById = async(req, res) => {
    try {

        const user = await User.findById(req.userId, { password: 0 })

        const artista = await Artista.findById(user.artista)


        if (artista.comics.includes(req.params.productId)) {
            artista.comics.forEach((element, index) => {
                if (element == req.params.productId) {
                    artista.comics.splice(index, 1)
                }
            });
            await Artista.findByIdAndUpdate(artista._id, artista, { new: true })
            await Product.findByIdAndDelete(req.params.productId)
            res.status(201).json({ message: "All OK" })
        } else {
            res.status(201).json({ message: "Ya no esta en la lista" })
        }

    } catch (error) {
        res.status(401).json({ message: " sucedio algo inesperado, intente despues." })
    }
}