var express = require('express');
var router = express.Router();


const carritoController=require("../controllers/carritoController");
router.get("/",carritoController.index);
router.post("/",carritoController.insertProductos);
router.get("/cremas",carritoController.cremas);
router.post("/cremas", carritoController.insertProductos2);
router.get("/jabones",carritoController.jabones);
router.post("/jabones", carritoController.insertProductos3);
router.get("/serums",carritoController.serums);
router.post("/serums", carritoController.insertProductos4);
router.get("/cart/:id_comprador",carritoController.cart);
router.post("/cart/:id_carrito",carritoController.eliminarPcarrito);
router.get("/seguimientoComprador",carritoController.seguimientoComprador);
router.get("/seguimientoVendedor",carritoController.seguimientoVendedor);
router.get("/pagos",carritoController.pagar);
router.get("/vistaSeguimientoC",carritoController.vistaSeguimientoC);
router.get("/actualizarEstado/:objeto",carritoController.actualizarEstado);
router.post("/actualizarEstado",carritoController.update);
module.exports = router;
