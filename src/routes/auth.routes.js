import {Router} from 'express'
const router = Router()

import * as authCtrl from "../controllers/auth.controller";
import { verifySignup } from "../middlewares";



router.post('/signin', authCtrl.signIn)
router.post('/signup',[verifySignup.checkDuplicatedUsernameOrEmail, verifySignup.checRolesExisted] , authCtrl.signUp)
export default router;