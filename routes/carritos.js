var express = require('express');
var router = express.Router();


const carritoController=require("../controllers/carritoController");
router.get("/",carritoController.index);
router.post("/",carritoController.insertProductos);
router.get("/cremas",carritoController.cremas);
router.post("/cremas", carritoController.insertProductos);
router.get("/jabones",carritoController.jabones);
router.post("/jabones", carritoController.insertProductos);
router.get("/serums",carritoController.serums);
router.post("/serums", carritoController.insertProductos);
router.get("/cart/:id_comprador",carritoController.cart);
module.exports = router;
