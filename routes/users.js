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
router.get("/recuperarComprador",userController.recuperarComprador);
router.post("/recuperarComprador",userController.recuperandoComprador);
router.get("/recuperarVendedor", userController.recuperarVendedor);
router.post("/recuperarVendedor",userController.recuperandoVendedor);


/***********************productos****************************/
router.get("/reviewProducts",userController.reviewProducts)
router.get('/createReviewProducts',userController.createReviewProduts);
router.post('/createReviewProducts',userController.insertReviewProducts);
/***********************tips*************************/
router.get("/tips",userController.tips);
router.get("/createTips",userController.createTips);
router.post("/createTips",userController.insertTips);
router.get("/misTips",userController.misTips);
router.post("/eliminarTips/:id",userController.eliminarTips);
/***********************servicio(testimonio)*************************/
router.get("/reviewService",userController.reviewService);
router.get("/createReviewService",userController.createReviewService);
router.post("/createReviewService",userController.insertReviewService);

module.exports = router;
