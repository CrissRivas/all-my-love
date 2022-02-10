import { Router } from 'express'
import * as artistaCtrl from "../controllers/artista.controller";
import { authJwt } from "../middlewares";

const router = Router()

router.post('/', [authJwt.verifyToken, authJwt.isNotVendedor], artistaCtrl.createArtista)
router.get('/', artistaCtrl.getArtistas)
router.get('/:nombre', artistaCtrl.getArtista)
router.get('/id/:id', artistaCtrl.getArtistaById)
router.put('/:artistaId', [authJwt.verifyToken, authJwt.isVendedor], artistaCtrl.putArtista)
router.delete('/:artistaId', [authJwt.verifyToken, authJwt.isVendedor], artistaCtrl.deleteArtista)
export default router;