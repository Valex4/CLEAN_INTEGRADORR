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
      conexion.query("INSERT INTO carrito (id_producto,nombreProducto,precioProducto,cantidad,id_comprador) VALUES (?,?,?,?,?)",[datos.id_producto, datos.nombre, datos.precio,datos.cantidad,datos.id_comprador], funcion);
    },
    obtenerCarrito:function(conexion,id_comprador, funcion){
      conexion.query("SELECT * FROM carrito WHERE id_comprador = ?",[id_comprador],funcion);
    },
    eliminarCarrito:function(conexion,id_carrito,funcion){
      conexion.query("DELETE FROM carrito WHERE id_carrito=?",[id_carrito],funcion);
    }
}