module.exports ={
    /* aqui van los metodos para acceder a la tabla clientes*/
    obtener:function(conexion,funcion){
      conexion.query("SELECT * FROM comprador",funcion);
    },
    obtenerVendedor:function(conexion,funcion){
        conexion.query("SELECT * FROM vendedor",funcion); 
    },
    insertarComprador:function(conexion,datos,funcion){
      conexion.query("INSERT INTO comprador (nombre,ap_paterno,ap_materno,correo,contrasena,direccion) VALUES (?,?,?,?,?,?) ",[datos.Usuario,datos.ap_paterno,datos.ap_materno,datos.correo1,datos.contra1,datos.direccion],funcion);
    },
    validarRegistroComprador:function(conexion,datos,funcion){
      conexion.query("SELECT * FROM comprador WHERE correo = ?",[datos.correo1],funcion);
    },
    insertarVendedor:function(conexion,datos,funcion){
      conexion.query("INSERT INTO vendedor (nombre,ap_paterno,ap_materno,correo,contrasena) VALUES (?,?,?,?,?) ",[datos.nombreUsuario,datos.ap_paterno,datos.ap_materno,datos.correo,datos.contraseña],funcion);
    },
    validarRegistroVendedor:function(conexion,datos,funcion){
      conexion.query("SELECT * FROM vendedor WHERE correo = ?",[datos.correo],funcion);
    },
    retornarDatosID:function(conexion,correo,funcion){
      conexion.query("SELECT * FROM vendedor WHERE correo = ?",[correo],funcion);
    },
    obtenerProductos:function(conexion,datos,funcion){
      conexion.query("SELECT * FROM producto WHERE id_vendedor = ?",[datos[0].id_vendedor],funcion);
    },
    obtenerProduct:function(conexion,funcion){
      conexion.query("SELECT * FROM producto where stock > 0 AND oferta = \"no\"",funcion);
    },
    retornarIDcomprador:function(conexion,datos,funcion){
      conexion.query("SELECT * FROM comprador WHERE correo = ?",[datos.correo1],funcion);
    },
    validando:function(conexion,datos,funcion){
      conexion.query("SELECT * FROM comprador WHERE correo= ?",[datos.correo1],funcion);
    },
    retornarComprador:function(conexion,correo,funcion){
      conexion.query("SELECT * FROM comprador WHERE correo = ?",[correo], funcion);
    },
    /////////////////esto es de las reviews
    obtenerReview:function(conexion,funcion){
      conexion.query("SELECT * FROM reviewProducts",funcion);
    },
    obtenerDatosComprador:function(conexion,dato,funcion){
      conexion.query("SELECT * FROM comprador WHERE id_comprador = ?",[dato],funcion);
    },
    insertarReviewProducts:function(conexion,id_comprador,nombre,datos,fecha,funcion){
      conexion.query("INSERT INTO reviewProducts (id_comprador,nombre_comprador,nombre_producto,review, fecha) VALUES (?,?,?,?,?) ",[id_comprador,nombre,datos.productosComprados,datos.review,fecha],funcion);
    },
    obtenerTestimonios:function(conexion,funcion){
      conexion.query("SELECT * FROM testimonio",funcion);
    },
    obtenerSeguimientoComprador:function(conexion, id_comprador, funcion){
      conexion.query("SELECT distinct nombreProducto FROM seguimiento WHERE id_comprador = ? ",[id_comprador],funcion);
    },
    obtenerDatosVendedor:function(conexion,dato){
      conexion.query("SELECT * FROM vendedor WHERE id_vendedor = ?",[dato],funcion);
    },
    insertarTestimonio:function(conexion,id_comprador,nombre,datos, fecha,funcion){
      conexion.query("INSERT INTO testimonio (id_comprador,nombre_comprador,testimonio, fecha) VALUES (?,?,?,?) ",[id_comprador,nombre,datos, fecha],funcion);
    }
}