module.exports ={
    obtener:function(conexion,funcion){
      conexion.query("SELECT * FROM producto where stock > 0 AND oferta = \"no\"",funcion);
    },
    categoriaJabon(conexion,funcion){
      conexion.query("SELECT * FROM producto where categoria= \"jabon\" AND stock > 0 AND oferta = \"no\" ",funcion);
    },
    categoriaCrema(conexion,funcion){
      conexion.query("SELECT * FROM producto where categoria= \"crema\" AND stock > 0 AND oferta = \"no\"",funcion);
    },
    categoriaSerum(conexion,funcion){
      conexion.query("SELECT * FROM producto where categoria= \"serum\" AND stock > 0 AND oferta = \"no\"",funcion);
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
    insertarDatosSeguimiento:function(conexion,direccionC,estado,fecha,pedido,id_comprador, correo,funcion){
      conexion.query("INSERT INTO seguimiento (numeroPedido,nombreProducto, direccionComprador, estado, id_producto, id_comprador, vendedor_id_vendedor,fecha,pedido,correo) SELECT id_carrito,nombreProducto, ? , ?, id_producto, id_comprador, id_vendedor,?,?,? FROM carrito WHERE id_comprador = ?",[direccionC,estado, fecha, pedido, correo,id_comprador],funcion);
    },
    obtenerSeguimientoComprador:function(conexion, id_comprador, funcion){
      conexion.query("SELECT * FROM seguimiento WHERE id_comprador = ?",[id_comprador],funcion);
    },
    eliminarProductosCarrito:function(conexion,id_comprador, funcion){
      conexion.query("DELETE FROM carrito WHERE id_comprador=?",[id_comprador],funcion);
    },
    obtenerSeguimientoVendedor:function(conexion, id_vendedor, funcion){
      conexion.query("SELECT * FROM seguimiento WHERE vendedor_id_vendedor = ?",[id_vendedor],funcion);
    },
    actualizarEstado:function(conexion, estado,id_seguimiento,funcion){
      conexion.query("UPDATE seguimiento SET estado = ? WHERE id_seguimiento = ?",[estado, id_seguimiento], funcion);
    },
    obtenerSeguimiento:function(conexion,id_seguimiento, funcion) {
      conexion.query("SELECT * FROM seguimiento WHERE id_seguimiento = ?",[id_seguimiento],funcion);
    },
    actualizarStock:function(conexion, stock, id_producto, funcion) {
      conexion.query("UPDATE producto SET stock = ? WHERE id_producto = ?",[stock, id_producto],funcion);
    },
    ordenMenorPrincipal:function(conexion, funcion) {
      conexion.query("SELECT * FROM producto WHERE stock > 0 ORDER BY precio ASC",funcion);
    },
    ordenMayorPrincipal:function(conexion, funcion) {
      conexion.query("SELECT * FROM producto WHERE stock > 0 ORDER BY precio DESC",funcion);
    },
    ordenMenorJabones:function(conexion,funcion) {
      conexion.query("SELECT * FROM producto where categoria= \"jabon\" AND stock > 0 ORDER BY precio ASC",funcion);
    },
    ordenMayorJabones:function(conexion,funcion) {
      conexion.query("SELECT * FROM producto where categoria= \"jabon\" AND stock > 0 AND oferta = \"no\" ORDER BY precio DESC",funcion);
    },
    ordenMenorSerums:function(conexion,funcion) {
      conexion.query("SELECT * FROM producto where categoria= \"serum\" AND stock > 0 AND oferta = \"no\" ORDER BY precio ASC",funcion);
    },
    ordenMayorSerums:function(conexion,funcion) {
      conexion.query("SELECT * FROM producto where categoria= \"serum\" AND stock > 0 AND oferta = \"no\" ORDER BY precio DESC",funcion);
    },
    ordenMenorCremas:function(conexion,funcion) {
      conexion.query("SELECT * FROM producto where categoria= \"crema\" AND stock > 0 AND oferta = \"no\" ORDER BY precio ASC",funcion);
    },
    ordenMayorCremas:function(conexion,funcion) {
      conexion.query("SELECT * FROM producto where categoria= \"crema\" AND stock > 0 AND oferta = \"no\" ORDER BY precio DESC",funcion);
    },
    obtenerOfertas:function(conexion,funcion) {
      conexion.query("SELECT * FROM producto where oferta = \"si\" AND stock > 0 ",funcion);
    },
    ObtenerIdProductoOfertas:function(conexion,id_producto, id_comprador,precio,funcion){
      conexion.query("SELECT * FROM carrito WHERE id_producto = ? AND id_comprador = ? AND precioProducto = ?",[id_producto, id_comprador, precio],funcion);
    },
    ordenMenorOfertas:function(conexion,funcion) {
      conexion.query("SELECT * FROM producto where stock > 0 AND oferta = \"si\" ORDER BY precio ASC",funcion);
    },
    ordenMayorOfertas:function(conexion,funcion){
      conexion.query("SELECT * FROM producto where stock > 0 AND oferta = \"si\" ORDER BY precio DESC",funcion);
    }

    
}