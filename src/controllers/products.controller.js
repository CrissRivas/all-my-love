import  Product from "../models/Produc"


export const createProduct = async (req,res)=>{
    const { nombre,alto,ancho,profundo,descripcion,precio,imgUrl,inventario,proveedor} = req.body

    const newProduct = new Product({nombre,alto,ancho,profundo,descripcion,precio,imgUrl,inventario,proveedor});
    
    const productSaved = await newProduct.save()

    res.status(201).json(productSaved)
}

export const getProducts = async (req,res)=>{
    
    const products = await Product.find()

    res.json(products)
}
export const getProductById = async (req,res)=>{
    
    const producto = await Product.findById(req.params.productId)

    res.status(201).json(producto)
}


export const updateProductById = async (req,res)=>{
    
    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body,{new:true})

    res.status(200).json(updatedProduct)
}
export const deleteProductById = async (req,res)=>{
    
    await Product.findByIdAndDelete(req.params.productId)

    res.status(204).json()
}