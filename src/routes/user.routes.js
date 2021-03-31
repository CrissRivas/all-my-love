import {Router} from 'express'
import *as userCtrl from "../controllers/user.controller";
import {authJwt, verifySignup} from "../middlewares";

const router = Router()

router.post('/',[
    authJwt.verifyToken,
    authJwt.isSoporte,
    verifySignup.checRolesExisted
], userCtrl.createUser)

export default router;