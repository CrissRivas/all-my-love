"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var authCtrl = _interopRequireWildcard(require("../controllers/auth.controller"));

var _middlewares = require("../middlewares");

var router = (0, _express.Router)();
router.post('/signin', authCtrl.signIn);
router.post('/signup', [_middlewares.verifySignup.checkDuplicatedUsernameOrEmail, _middlewares.verifySignup.checRolesExisted, _middlewares.verifySignup.checRolesIsNot], authCtrl.signUp);
var _default = router;
exports["default"] = _default;