import { Router } from "express";

import * as envCtrl from "./../controllers/envios.controller";

const router = Router();

router.post('/pedido', envCtrl.pedido)

router.post('/cotizacion', envCtrl.cotizar)

export default router;