import {Router} from 'express'
import *as paperCtrl from "../controllers/paper.controller";
//import {authJwt, verifySignup} from "../middlewares";

const router = Router()

router.post('/', paperCtrl.createPaper)

router.get('/', paperCtrl.getPapers)

router.get('/:id', paperCtrl.getPaper)

router.put('/:id', paperCtrl.putPaper)

router.delete('/:id', paperCtrl.deletePaper)


export default router;