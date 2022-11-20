var conexion=require("../config/conexion");
let carrito=require("../model/carrito");
const ids = require("../views/carritos/id");
const { cremas } = require("./productController");

module.exports={

    index:function(req,res){
      let id_comprador = require("../views/carritos/id");
      console.log("id_comprador en cremas");
      console.log(id_comprador[id_comprador.length - 1]);
      let id_c =id_comprador[id_comprador.length - 1];

      carrito.obtener(conexion, (err, datos) =>{

        res.render('carritos/index', { title: 'CleanSkin', productos: datos, comprador: id_c});
      });
    },
    cremas:function(req, res){
      let id_comprador = require("../views/carritos/id");
      console.log("id_comprador en cremas");
      console.log(id_comprador[id_comprador.length - 1]);
      let id_c =id_comprador[id_comprador.length - 1];
      carrito.categoriaCrema(conexion, (err, datos) =>{
        res.render('carritos/cremas', { title: 'CleanSkin', products: datos, comprador: id_c});
      })
    },
    jabones:function(req, res){
      let id_comprador = require("../views/carritos/id");
      console.log("id_comprador en jabones");
      console.log(id_comprador[id_comprador.length - 1]);
      let id_c =id_comprador[id_comprador.length - 1];
      carrito.categoriaJabon(conexion, (err, datos) =>{
        res.render('carritos/jabones',{ title: 'CleanSkin', products: datos, comprador: id_c})
      });
    },
    serums:function(req, res){
      let id_comprador = require("../views/carritos/id");
      console.log("id_comprador en serums");
      console.log(id_comprador[id_comprador.length - 1]);
      let id_c =id_comprador[id_comprador.length - 1];
      carrito.categoriaSerum(conexion, (err, datos)=>{
        res.render('carritos/serums',{products:datos, comprador: id_c});
      });
    },
    cart:function(req, res){
      let id_comprador = require("../views/carritos/id");
      console.log("id_comprador en serums");
      console.log(id_comprador[id_comprador.length - 1]);
      let id_c =id_comprador[id_comprador.length - 1];



      /*console.log("Recibiendo el id del comprador en carrito")
      console.log(req.params.id_comprador);
      const id_comprador = req.params.id_comprador;*/
      carrito.obtenerCarrito(conexion, id_c,(err, productosC)=>{
        console.log("El comprador tiene: "+ productosC.length + " productos");
        let suma = 0;
        for(let i=0; i<productosC.length; i++) {
          suma += productosC[i].precioProducto;
          
        }
        console.log("Monto total: " + suma);


        res.render('carritos/cart',{products:productosC, total:suma});
      });
      //res.render('carritos/cart');
    },
    insertProductos:function(req,res){
    console.log('Datos para guardar en la BD de carrito');
    console.log(req.body);
    carrito.insertarCarrito(conexion, req.body,(err, datos)=>{
      console.log("datos guardados exitosamente en la BD de carrito");
      carrito.obtener(conexion, (err, datos) =>{
        console.log(datos);

        res.render('carritos/index', { title: 'CleanSkin', productos: datos, comprador:req.body.id_comprador});
      });
    });
    }
    
}