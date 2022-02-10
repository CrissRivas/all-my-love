import { Router } from 'express'
const router = Router()

import * as authCtrl from "../controllers/auth.controller";
import { verifySignup } from "../middlewares";
import { authJwt } from "../middlewares"



router.post('/signin', authJwt.verificado, authCtrl.signIn)

router.post('/signup', [verifySignup.checkDuplicatedUsernameOrEmail, verifySignup.checRolesExisted, verifySignup.checRolesIsNot], authCtrl.signUp)

router.get('/signup/:userPass', authCtrl.verifyEmail)

router.get('/token', authCtrl.verifyTokenTime)

export default router;