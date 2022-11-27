var express = require('express');
var router = express.Router();

const productController=require("../controllers/productController");
var multer=require("multer");
var fecha=Date.now();


var rutaAlmacen=multer.diskStorage(
    {
        destination:function(request,file,callback){

            callback(null,"./public/images/");
        },
        filename:function(request,file,callback){
            console.log(file);
            callback(null,fecha+"_"+file.originalname);
        }
    }
);

var cargar=multer({storage:rutaAlmacen});


/* GET home page. */
router.get('/:id',productController.index);
router.get('/crear/:id',productController.crear);
router.post("/",cargar.single("imagen"),productController.guardar);
router.get('/editar/:id',productController.editar);
router.post("/eliminar/:id",productController.eliminar);
router.post("/actualizar",cargar.single("imagen"),productController.actualizar);

module.exports = router;