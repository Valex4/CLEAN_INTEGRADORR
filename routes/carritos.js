var express = require('express');
var router = express.Router();


const carritoController=require("../controllers/carritoController");
router.get("/",carritoController.index);
router.post("/",carritoController.insertProductos);
router.get("/cremas",carritoController.cremas);
router.get("/jabones",carritoController.jabones);
router.get("/serums",carritoController.serums);
router.get("/cart/:id_comprador",carritoController.cart);
module.exports = router;
