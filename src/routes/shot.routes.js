import { Router } from 'express'
import { authJwt, verifySignup } from "../middlewares";
import upload from "../libs/multer";
import * as shotCtrl from '../controllers/shot.controller';

const router = Router()

router.post('/', upload.single('image'), shotCtrl.nuevoShot)

router.get('/', shotCtrl.getShots)


export default router;