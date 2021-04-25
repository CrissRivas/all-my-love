import {Router} from 'express'
import *as paperCtrl from "../controllers/paper.controller";
import {authJwt, verifySignup} from "../middlewares";
import upload from "../libs/multer";



const router = Router()

router.post('/', upload.single('image') ,paperCtrl.createPaper)

router.get('/', paperCtrl.getPapers)

router.get('/:id', paperCtrl.getPaper)

router.put('/:id', paperCtrl.putPaper)

router.delete('/:id', paperCtrl.deletePaper)


export default router;