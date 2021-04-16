import {Router} from 'express'
import *as inicioCtrl from "../controllers/inicio.controller";
//import {authJwt, verifySignup} from "../middlewares";

const router = Router()

router.post('/', inicioCtrl.nuevoInicio)
router.get('/', inicioCtrl.getInicio)
router.get('/old', inicioCtrl.getInicios)
router.put('/', inicioCtrl.putInicio)
router.delete('/', inicioCtrl.deleteInicio)
export default router;