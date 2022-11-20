var express = require('express');
var router = express.Router();

const userController=require("../controllers/userController");

router.get('/',userController.index);
router.get('/comprador',userController.comprador);
router.post('/comprador',userController.registroComprador);
router.get('/loginComprador',userController.logincomprador);
router.post('/loginComprador',userController.validarComprador);
router.get('/vendedor',userController.vendedor);
router.post('/vendedor',userController.registroVendedor);
router.get('/loginVendedor',userController.loginVendedor);
router.post('/loginVendedor',userController.validarVendedor);
module.exports = router;
