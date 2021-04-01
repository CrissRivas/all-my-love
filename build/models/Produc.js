"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var productSchema = new _mongoose.Schema({
  nombre: String,
  alto: Number,
  ancho: Number,
  profundo: Number,
  descripcion: String,
  precio: Number,
  imgUrl: [String],
  inventario: Number,
  proveedor: String
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)('Product', productSchema);

exports["default"] = _default;