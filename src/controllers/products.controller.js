import Product from "../models/Produc"


export const createProduct = async(req, res) => {

    try {
        const newProduct = new Product(req.body);

        const productSaved = await newProduct.save()

        res.status(201).json(productSaved)

    } catch (error) {
        res.status(401).json({ message: " sucedio algo inesperado, intente despues." })
    }
}

export const getProducts = async(req, res) => {
    try {

        const products = await Product.find()

        res.json(products)

    } catch (error) {
        res.status(401).json({ message: "sucedio algo inesperado, intente despues." })
    }
}
export const getProductById = async(req, res) => {
    try {

        const producto = await Product.findById(req.params.productId)

        res.status(201).json(producto)

    } catch (error) {
        res.status(401).json({ message: " sucedio algo inesperado, intente despues." })

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
        await Product.findByIdAndDelete(req.params.productId)

        res.status(204).json()
    } catch (error) {
        res.status(401).json({ message: " sucedio algo inesperado, intente despues." })
    }
}