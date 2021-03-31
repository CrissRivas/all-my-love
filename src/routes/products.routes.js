import {Router} from 'express'
const router = Router()
import * as productsCtrl from '../controllers/products.controller'
import {authJwt} from "../middlewares"
//import { isSoporte } from '../middlewares/authJwt'

router.get('/', productsCtrl.getProducts)

router.post('/',[authJwt.verifyToken, authJwt.isVendedor] , productsCtrl.createProduct)

router.get('/:productId', productsCtrl.getProductById)

router.put('/:productId',[authJwt.verifyToken, authJwt.isVendedor] , productsCtrl.updateProductById)

router.delete('/:productId',[authJwt.verifyToken, authJwt.isVendedor], productsCtrl.deleteProductById)

export default router;