module.exports ={
    obtener:function(conexion,funcion){
      conexion.query("SELECT * FROM producto",funcion);
    },
    categoriaJabon(conexion,funcion){
      conexion.query("SELECT * FROM producto where categoria= \"jabon\" ",funcion);
    },
    categoriaCrema(conexion,funcion){
      conexion.query("SELECT * FROM producto where categoria= \"crema\" ",funcion);
    },
    categoriaSerum(conexion,funcion){
      conexion.query("SELECT * FROM producto where categoria= \"serum\" ",funcion);
    },
    insertarCarrito:function(conexion,datos, funcion){
      conexion.query("INSERT INTO carrito (id_producto,nombreProducto,precioProducto,cantidad,id_comprador,id_vendedor) VALUES (?,?,?,?,?,?)",[datos.id_producto, datos.nombre, datos.precio,datos.cantidad,datos.id_comprador, datos.id_vendedor], funcion);
    },
    obtenerCarrito:function(conexion,id_comprador, funcion){
      conexion.query("SELECT * FROM carrito WHERE id_comprador = ?",[id_comprador],funcion);
    },
    eliminarCarrito:function(conexion,id_carrito,funcion){
      conexion.query("DELETE FROM carrito WHERE id_carrito=?",[id_carrito],funcion);
    },
    ObtenerIdProducto:function(conexion,id_producto, id_comprador,funcion){
      conexion.query("SELECT * FROM carrito WHERE id_producto = ? AND id_comprador = ?",[id_producto, id_comprador],funcion);
    },
    actualizarCantidadProducto:function(conexion,cantidad,id_producto, id_comprador,funcion){
      conexion.query("UPDATE carrito SET cantidad = ? WHERE id_producto = ? AND id_comprador = ?",[cantidad,id_producto, id_comprador],funcion);
    },
    obtenerDatosComprador:function(conexion,id_comprador,funcion){
      conexion.query("SELECT * FROM comprador WHERE id_comprador = ?",[id_comprador],funcion);
    },
    obtenerVendedorProducto:function(conexion,id_producto,funcion){
      conexion.query("SELECT * FROM producto where id_producto = ?", [id_producto], funcion);
    },
    insertarDatosSeguimiento:function(conexion,direccionC,estado,id_vendedor,id_comprador,funcion){
      conexion.query("INSERT INTO seguimiento (numeroPedido,nombreProducto, direccionComprador, estado, id_producto, id_comprador, vendedor_id_vendedor) SELECT id_carrito,nombreProducto, ? , ?, id_producto, id_comprador, id_vendedor FROM carrito WHERE id_comprador = ?",[direccionC,estado,id_vendedor,id_comprador],funcion);
    
    }
    
}