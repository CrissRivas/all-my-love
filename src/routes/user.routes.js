import { Router } from 'express'
import * as userCtrl from "../controllers/user.controller";
import { authJwt, verifySignup } from "../middlewares";

const router = Router()

router.post('/kart/:comicId', authJwt.verifyToken, userCtrl.addKartUser)

router.delete('/kart/:comicId', authJwt.verifyToken, userCtrl.deleteKartUser)


router.get('/', [authJwt.verifyToken], userCtrl.getUser)

export default router;