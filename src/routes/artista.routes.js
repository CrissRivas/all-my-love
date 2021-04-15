import {Router} from 'express'
import *as artistaCtrl from "../controllers/artista.controller";
//import {authJwt, verifySignup} from "../middlewares";

const router = Router()

router.post('/', artistaCtrl.createArtista)
router.get('/', artistaCtrl.getArtistas)
router.get('/:nombre', artistaCtrl.getArtista)
router.put('/:artistaId', artistaCtrl.putArtista)
router.delete('/:artistaId', artistaCtrl.deleteArtista)
export default router;