"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var productsCtrl = _interopRequireWildcard(require("../controllers/products.controller"));

var _middlewares = require("../middlewares");

var router = (0, _express.Router)();
//import { isSoporte } from '../middlewares/authJwt'
router.get('/', productsCtrl.getProducts);
router.post('/', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isVendedor], productsCtrl.createProduct);
router.get('/:productId', productsCtrl.getProductById);
router.put('/:productId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isVendedor], productsCtrl.updateProductById);
router["delete"]('/:productId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isVendedor], productsCtrl.deleteProductById);
var _default = router;
exports["default"] = _default;