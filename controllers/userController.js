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
              let alerta = "";

              user.obtenerProduct(conexion, (err, productos)=>{
                res.render('./carritos/', {comprador:registro[0].id_comprador, productos: productos, alert:alerta}) 
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

      }else{
        console.log("Usuario no encontrado");
        res.render('users/loginVendedor', { cadena: '¡¡ Usuario no encontrado !!'});
      }
    });
  },
  recuperarComprador:function(req, res){
    let alerta = "";
    let password = "";
    res.render('users/recuperarComprador',{contra:password , alerta : alerta});
  },
  recuperarVendedor:function(req, res){
    let alerta = "";
    let password = "";
    console.log("Estas en recuperarVendedor")
    res.render('users/recuperarVendedor', {contra:password , alerta : alerta});
  },
  recuperandoComprador:function(req, res){
    console.log('recuperandoComprador');
    console.log(req.body);
    if(req.body.correo ==""){
      let password = "";
        let alerta = "Complete el formulario";
        res.render('users/recuperarComprador',{contra:password , alerta : alerta});
    }else{
    user.retornarComprador(conexion, req.body.correo,(err, existe)=>{
      console.log("Comprobando si existe");
      console.log(existe.length);

      if(existe.length > 0){
        let alerta = "";
        console.log("La contraseña es: " + existe[0].contrasena);
        let password = "La contraseña es: " + existe[0].contrasena;
        res.render('users/recuperarComprador',{contra:password, alerta : alerta});
      }else{
        let password = "";
        let alerta = "Usuario no encontrado";
        console.log("Usuario no encontrado");
        res.render('users/recuperarComprador',{contra:password , alerta : alerta});
      }
    });
  }
  },
  recuperandoVendedor: function (req, res) {
    console.log('recuperando vendedor');
    console.log(req.body);
    if(req.body.correo ==""){
      let password = "";
        let alerta = "Complete el formulario";
        res.render('users/recuperarVendedor',{contra:password , alerta : alerta});
    }else{
    user.retornarDatosID(conexion, req.body.correo,(err, existe)=>{
      console.log("Comprobando si existe");
      console.log(existe.length);

      if(existe.length > 0){
        let alerta = "";
        console.log("La contraseña es: " + existe[0].contrasena);
        let password = "La contraseña es: " + existe[0].contrasena;
        res.render('users/recuperarVendedor',{contra:password, alerta : alerta});
      }else{
        let password = "";
        let alerta = "Usuario no encontrado";
        console.log("Usuario no encontrado");
        res.render('users/recuperarVendedor',{contra:password , alerta : alerta});
      }
    });
  }
  },



  createReviewProduts: function (req, res) {
    let id_comprador = require("../public/javascripts/id");
    let idC = id_comprador[id_comprador.length -1];
    console.log("Imprimiendo id del comprador");
    console.log(idC);    
    user.obtenerSeguimientoComprador(conexion,idC,(err,datos) => {
      console.log("imprimiendo el id del comprador despues de comentar: " + idC)
      console.log("estamos creando una review");
      console.log(datos);
      res.render("users/createReview",{productoCliente: datos});
    });
  },
  reviewProducts: function (req, res) {
    user.obtenerReview(conexion,(err,datos)=>{
      res.render("users/review",{review:datos});
    });
  },
  insertReviewProducts: function (req, res) {
    let id_compra = require("../public/javascripts/id");
    let idC = id_compra[id_compra.length -1];
    user.obtenerDatosComprador(conexion,idC,(err,datos)=>{
    let nombre=datos[0].nombre;
    let fecha = new Date();
    let fechaActual =  fecha.getDate() + "/" + fecha.getMonth() + "/" + fecha.getFullYear();
    console.log("impriminedo la fecha antes de agregar a la bd de reviews productos: " + fechaActual);
console.log("imprimiendo calificacion")
    console.log(req.body.calificacion);
    user.insertarReviewProducts(conexion,idC,nombre,req.body, fechaActual,(err,datos)=>{
      user.obtenerReview(conexion,(err,datos)=>{
       // res.render("users/review",{review:datos});
        res.redirect("users/review");
      });

    });

    });
  },
  createReviewService:function (req, res) {
    console.log("Vamos a ver si aqui necesita mandar por parametro")
    res.render("users/createReviewService");
  },
  reviewService: function (req, res) {
    user.obtenerTestimonios(conexion,(err,datos)=>{
      res.render("users/reviewService",{testimonio:datos});
   });
  },
  insertReviewService:function (req, res) {
    let id_compra = require("../public/javascripts/id");
    let idC = id_compra[id_compra.length -1];
    user.obtenerDatosComprador(conexion,idC,(err,datos)=>{
    let nombre=datos[0].nombre;
    console.log("IMRPRIMIENDO NOMBRE EN TESTIMONIO: " + nombre);
    console.log(req.body.testimonio);
    let testi = req.body.testimonio;
    let fecha = new Date();
    let fechaActual =  fecha.getDate() + "/" + fecha.getMonth() + "/" + fecha.getFullYear();
    user.insertarTestimonio(conexion,idC,nombre,testi,fechaActual,(err)=>{
    user.obtenerTestimonios(conexion,(err,datos)=>{
      res.render("users/reviewService", {testimonio :datos});
     });

    });
    });
  },
  tips: function (req, res) {
    user.obtenerTestimonios(conexion,(err,datos)=>{
      res.render("users/tips",{tips:datos});
    });
  },
  createTips: function (req, res) {
    res.render("users/createTips");
  },
  insertTips: function (req, res) {

    user.insertarTestimonio(conexion,id_vendedor,req.body,(err,datos)=>{
      
    });
  }
  

}