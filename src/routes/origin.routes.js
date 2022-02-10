import { Router } from 'express'
import * as originCtrl from "../controllers/origin.controller";
import { authJwt, verifySignup } from "../middlewares";


const router = Router()

router.post('/', authJwt.verifyToken, originCtrl.nuevoOrigin)
router.get('/', authJwt.verifyToken, originCtrl.miOrigin)
router.put('/', authJwt.verifyToken, originCtrl.changeOrigin)


export default router;