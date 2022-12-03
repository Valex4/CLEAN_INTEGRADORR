var conexion=require("../config/conexion");
let product=require("../model/product");
let borrar= require("fs");
module.exports={

    index:function(req,res){
      let id_ven= require("../public/javascripts/idVendedor");
      let id_vendedor = id_ven[id_ven.length-1];
      if (id_vendedor == undefined){
        console.log("Indefinido en index Products");
        res.redirect("/users/loginVendedor");
      }else{
      console.log("recibiendo el id en index");
      console.log(req.params.id);
      console.log("Haciendo pruebas matematicas para el porcentaje");
      let precio = 350;
      let porcentaje = 10;
      let valorPorcentaje = (100-porcentaje)/100
      let precioConDescuento = precio * valorPorcentaje;
      console.log("Precio con descuento es: "+ precioConDescuento);
    /* product.obtenerProductos(conexion,req.params.id,function(err, products){
        console.log(products)
        res.render('products/index', { title: 'CleanSkin', products:products, vendedor: req.params.id });
      });*/

     /*product.obtener(conexion,(err,datos)=>{
        console.log(datos)
        res.render('products/index', { title: 'CleanSkin', products:datos, vendedor: 1 });
      });*/
      product.obtenerProductos2(conexion,id_vendedor,function(err, products){
        console.log(products)
        res.render('products/index', { title: 'CleanSkin', products:products, vendedor: id_vendedor });
      })
     }
    },
    crear:function(req,res){
      let id_ven= require("../public/javascripts/idVendedor");
      let id_vendedor = id_ven[id_ven.length-1];
      if (id_vendedor == undefined){
        console.log("Indefinido en crear products");
        res.redirect("/users/loginVendedor");
      }else{
      product.retornarVendedorID(conexion,req.params.id,function(err, vendedor){

        res.render('products/crear', {product:vendedor[0], vendedor:id_vendedor});
        
      });
      }
    },
    guardar:function(req,res){
      console.log("guardar informacion:  funcion guardar");
      console.log(req.body);
      console.log(req.body.id_vendedor);
      console.log(req.file.filename);
      product.insertar(conexion,req.body,req.file,(err,datos)=>{
        //res.redirect('/products');
        
        product.obtenerProductos2(conexion,req.body.id_vendedor,function(err, products){
          console.log("redireccionando a la pantalla principal del index");
          res.redirect("products/:"+req.body.id_vendedor);
          //res.render('products/index', { title: 'CleanSkin', products:products, vendedor: req.body.id_vendedor });
        })
        


        //res.render('/products',{ products: req.body, vendedor: req.body.id_vendedor});
      });
    },
    eliminar:function(req,res){
      console.log("resepcion de datos");
      console.log(req.params.id);
      product.retornarDatosID(conexion,req.params.id,function(err,registros){
        console.log("impresion de la variable registros en borrar");
        console.log(registros[0].id_vendedor);
        var nombreImagen="public/images/"+(registros[0].imagen);

        

        if(borrar.existsSync(nombreImagen)){
          borrar.unlinkSync(nombreImagen);
        }
        product.borrar(conexion,req.params.id,function(err){
         
         product.obtenerProductos2(conexion,registros[0].id_vendedor,function(err, products){
          console.log("redireccionando a la pantalla principal del index despues de borrar");
           res.redirect("../:"+registros[0].id_vendedor);
            //res.render('products/index', { title: 'CleanSkin', products:products, vendedor: registros[0].id_vendedor });
          })
          //res.redirect('/products');
        })

      });
    },
    editar:function(req,res){
      let id_ven= require("../public/javascripts/idVendedor");
      let id_vendedor = id_ven[id_ven.length-1];
      if (id_vendedor == undefined){
        console.log("Indefinido en editar products");
        res.redirect("/users/loginVendedor");
      }else{
      product.retornarDatosID(conexion,req.params.id,function(err,registros){
        console.log(registros[0]);
        res.render('products/editar', {product:registros[0], vendedor: id_vendedor});
      });
      }
    },
    actualizar:function(req,res){
      console.log(req.body);
      console.log(req.body.nombre);
      console.log(req.body.id);

      if(req.file){
        if(req.file.filename){

            product.retornarDatosID(conexion,req.body.id,function(err,registros){
              var nombreImagen="public/images/"+(registros[0].imagen);
              if(borrar.existsSync(nombreImagen)){
                borrar.unlinkSync(nombreImagen);
              }

              product.actualizarArchivo(conexion,req.body,req.file,function(err){
                
              });
            
    
            });
        }

      }

      if(req.body.nombre){
      product.actualizar(conexion,req.body,function (err) { });
    }

    product.retornarDatosID(conexion,req.body.id,function(err,registros){
      console.log("imprimiendo registros");
      console.log(registros[0].id_vendedor);

      product.obtenerProductos2(conexion,registros[0].id_vendedor,function(err, products){
        console.log(products);
        res.redirect("../:"+registros[0].id_vendedor);
        //res.render('products/index', { title: 'CleanSkin', products:products, vendedor: registros[0].id_vendedor });
      })
    }); 



   /* product.obtenerProductos2(conexion,registros[0].id_vendedor,function(err, products){
      console.log(products)
      res.render('products/index', { title: 'CleanSkin', products:products, vendedor: registros[0].id_vendedor });
    })*/
    //res.redirect('/products');
      
    }
}