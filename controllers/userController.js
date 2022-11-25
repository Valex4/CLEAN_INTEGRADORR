var conexion=require("../config/conexion");
let user=require("../model/user");

module.exports={

    index:function(req,res){
      
      res.render('users/index', { title: 'CleanSkin'});

    },
    comprador:function(req, res){
      user.obtener(conexion,(err,datos)=>{
        console.log(datos);
        res.render('users/comprador');
      });
     
    },
    vendedor:function(req, res){

        user.obtenerVendedor(conexion,(err,datos)=>{
            console.log("Vendedores: ");
            console.log(datos);
            res.render('users/vendedor');
        });
    },logincomprador:function(req, res){
      /*user.obtener(conexion,(err,datos)=>{
        console.log("Compradores: ")
        console.log(datos);
        
      });*/
      res.render("users/loginComprador");
     
    },
    loginVendedor:function(req, res){
      //console.log("inicio de Sesion datos: ");
      //console.log(req.body);
      res.render("users/loginVendedor");
    },
    registroComprador:function(req, res){

      const datos = JSON.parse(JSON.stringify(req.body));
      console.log("haciendo prueba haber si jala");
      

      if(req.body.Usuario == '' || req.body.correo1 == '' || req.body.contra1 == '' || req.body.ap_paterno == '' || req.body.ap_materno == '' || req.body.direccion ==''){
        console.log("Complete todos los campos porfavor")
        res.render('users/comprador', { cadena: '¡¡ Complete el formulario !!'});
      }else{
        console.log(req.body);
        console.log(req.body.correo1);
        user.validarRegistroComprador(conexion,req.body,(err, userdata)=>{
          console.log(userdata.length);
          if(userdata.length > 0){
            res.render('users/comprador', { cadena: '¡¡ 𝘾𝙤𝙧𝙧𝙚𝙤 𝙚𝙭𝙞𝙨𝙩𝙚𝙣𝙩𝙚 !!'});
            //console.log(" HAY UNA CUENTA CON EL CORREO INGRESADO");
            
          }else{
            console.log("datos ingresados a BD: ");
            user.insertarComprador(conexion,datos,(err, datos) =>{
              res.redirect('./loginComprador');
           
        });
            
          }
        });
      }
    },validarComprador:function(req,res){
      const data = JSON.parse(JSON.stringify(req.body));
      console.log("Datos del comprador ingresados por el login del comprador: ");
      console.log(data);

      if(data.correo1 == "" || data.contra1 == ""){
        res.render('users/loginComprador', { cadena: '¡¡ Complete el formulario !!'});
      }else{
        user.validarRegistroComprador(conexion,data,(err, registro)=>{
        console.log("id del comprador: ");
        const prueba = JSON.parse(JSON.stringify(registro));
        console.log("imprimiendo si existe o no: ")
        console.log(registro.length)
        if(registro.length > 0){ //esto es para evaluar el correo
            if(data.contra1 == prueba[0].contrasena){
              let ids = require("../public/javascripts/id");
              ids.push(registro[0].id_comprador);

              user.obtenerProduct(conexion, (err, productos)=>{
                res.render('./carritos/', {comprador:registro[0].id_comprador, productos: productos}) 
              })

            }else{
              res.render('users/loginComprador', { cadena: '¡¡ Contraseña incorrecta !!'});
            }
        }else{
          
          res.render('users/loginComprador', { cadena: '¡¡ Usuario no encontrado !!'});
        }
      });
     }
    },
    registroVendedor:function(req,res){
      const datos = JSON.parse(JSON.stringify(req.body));
      console.log("Vendedores registro: ");
      console.log(datos);
      console.log(datos.nombreUsuario);
      if(datos.nombreUsuario == '' || datos.correo == '' ||datos.contraseña == '' || datos.ap_paterno == '' || datos.ap_materno == '') {
        res.render('users/vendedor', { cadena: '¡¡ Complete el formulario !!'});

      }else{
        user.validarRegistroVendedor(conexion,datos,(err, userdata)=>{
          if(userdata.length > 0){
            res.render('users/vendedor', { cadena: '¡¡ 𝘾𝙤𝙧𝙧𝙚𝙤 𝙚𝙭𝙞𝙨𝙩𝙚𝙣𝙩𝙚 !!'});
            //console.log(" HAY UNA CUENTA CON EL CORREO INGRESADO");
            
          }else{
            console.log("datos ingresados a BD: ");
            user.insertarVendedor(conexion,datos,(err, datos) =>{
              res.redirect('/users/loginVendedor');
           
        });
            
          }
        });
      }

     
  },
  validarVendedor:function(req,res){
    const data = JSON.parse(JSON.stringify(req.body));
    console.log(data);
   
    user.validarRegistroVendedor(conexion,data,(err, registro)=>{
      console.log(registro.length);
      const prueba = JSON.parse(JSON.stringify(registro));
      console.log(prueba);
      if(registro.length > 0){ //esto es para evaluar el correo
        if(data.contraseña == prueba[0].contrasena){
          console.log("Recibiendo prueba: ")
          console.log(prueba)

          user.obtenerProductos(conexion, prueba,(err, productos)=>{
            let idVendedor = require("../public/javascripts/idVendedor");
            idVendedor.push(prueba[0].id_vendedor)
            console.log("Guardado id del vendedor: "+ idVendedor[idVendedor.length-1]);
            let id_v =idVendedor[idVendedor.length-1];
            //console.log("Recibiendo productos: ");
            //console.log(productos);
            console.log("id_vendedor de prueba");
            console.log(prueba[0].id_vendedor);
           res.render('./products/', { title: 'CleanSkin', products:productos, vendedor: id_v });
          });
        }else{
          res.render('users/loginVendedor', { cadena: '¡¡ Contraseña incorrecta !!'});
        }
        //(data.contraseña == prueba[0].contrasena) ? res.redirect('/products/catalogo') : res.render('users/loginVendedor', { cadena: '¡¡ Contraseña incorrecta !!'});
      }else{
        console.log("Usuario no encontrado");
        res.render('users/loginVendedor', { cadena: '¡¡ Usuario no encontrado !!'});
      }
    });
  }

}