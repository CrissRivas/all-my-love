import { Router } from 'express'
import * as userCtrl from "../controllers/user.controller";
import { authJwt, verifySignup } from "../middlewares";

const router = Router()

router.post('/kart/:comicId', authJwt.verifyToken, userCtrl.addKartUser)

router.delete('/kart/:comicId', authJwt.verifyToken, userCtrl.deleteKartUser)

router.post('/', [authJwt.verifyToken], userCtrl.getUser)

router.post('/love/:comicId', [authJwt.verifyToken], userCtrl.giveLove)

router.delete('/love/:comicId', authJwt.verifyToken, userCtrl.takeLove)


export default router;