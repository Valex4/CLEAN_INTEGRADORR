var conexion=require("../config/conexion");
let product=require("../model/product");
let borrar= require("fs");
module.exports={

    index:function(req,res){

      console.log("recibiendo el id en index");
      console.log(req.params.id);
    /* product.obtenerProductos(conexion,req.params.id,function(err, products){
        console.log(products)
        res.render('products/index', { title: 'CleanSkin', products:products, vendedor: req.params.id });
      });*/

     /*product.obtener(conexion,(err,datos)=>{
        console.log(datos)
        res.render('products/index', { title: 'CleanSkin', products:datos, vendedor: 1 });
      });*/
      product.obtenerProductos2(conexion,req.params.id,function(err, products){
        console.log(products)
        res.render('products/index', { title: 'CleanSkin', products:products, vendedor: req.params.id });
      })

    },
    crear:function(req,res){
      product.retornarVendedorID(conexion,req.params.id,function(err, vendedor){

        res.render('products/crear', {product:vendedor[0]});
        
      });
    },
    guardar:function(req,res){
      console.log("guardar informacion:  funcion guardar");
      console.log(req.body);
      console.log(req.body.id_vendedor);
      console.log(req.file.filename);
      product.insertar(conexion,req.body,req.file,(err,datos)=>{
        //res.redirect('/products');

        product.obtenerProductos2(conexion,req.body.id_vendedor,function(err, products){
          console.log(products)
          res.render('products/index', { title: 'CleanSkin', products:products, vendedor: req.body.id_vendedor });
        })
        


        //res.render('/products',{ products: req.body, vendedor: req.body.id_vendedor});
      });
    },
    catalogo:function(req,res){
      /*res.render('products/catalogo');*/

      product.mostrarCatalogo(conexion,(err,datos)=>{
        res.render('products/catalogo', {productos:datos });
      });
    },
    seguimiento:function(req,res){
      res.render('products/seguimiento');
    },
    seguimientoproductos:function(req,res){
      res.render('products/seguimientoProducto');
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
            console.log(products)
            res.render('products/index', { title: 'CleanSkin', products:products, vendedor: registros[0].id_vendedor });
          })
          //res.redirect('/products');
        })

      });
    },
    editar:function(req,res){
      product.retornarDatosID(conexion,req.params.id,function(err,registros){
        console.log(registros[0]);
        res.render('products/editar', {product:registros[0]});
      });
      
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
        console.log(products)
        res.render('products/index', { title: 'CleanSkin', products:products, vendedor: registros[0].id_vendedor });
      })
    }); 



   /* product.obtenerProductos2(conexion,registros[0].id_vendedor,function(err, products){
      console.log(products)
      res.render('products/index', { title: 'CleanSkin', products:products, vendedor: registros[0].id_vendedor });
    })*/
    //res.redirect('/products');
      
    },
    jabones:function(req,res){
      product.categoriaJabon(conexion,(err,datos)=>{
        res.render("products/jabones",{products:datos });
      });
    },
    cremas:function(req,res){
      product.categoriaCrema(conexion,(err,datos)=>{
       res.render("products/cremas",{products:datos });
      });
     },
     serum:function(req,res){
      product.categoriaSerum(conexion,(err,datos)=>{
        res.render("products/serum",{products:datos });
      });
      }
    
}