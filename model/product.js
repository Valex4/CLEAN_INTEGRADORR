module.exports ={
    /* aqui van los metodos para acceder a la tabla productos*/
    obtener:function(conexion,funcion){
      conexion.query("SELECT * FROM producto",funcion);
    },
    insertar:function(conexion,datos,archivos,funcion){
      conexion.query("INSERT INTO producto (nombre,categoria,precio,stock,descripcion,imagen,id_vendedor) VALUES (?,?,?,?,?,?,?) ",[datos.nombre,datos.categoria,datos.precio,datos.stock,datos.descripcion,archivos.filename,datos.id_vendedor],funcion);
    },
    mostrarCatalogo(conexion,funcion){
      conexion.query("SELECT * FROM producto",funcion);
    },
    retornarDatosID:function(conexion,id,funcion){
      conexion.query("SELECT * FROM producto where id_producto=?",[id],funcion);
    },
    borrar:function(conexion,id,funcion){
      conexion.query("DELETE FROM producto WHERE id_producto=?",[id],funcion);
    },
    actualizar:function(conexion,datos,funcion){
      conexion.query("UPDATE producto SET nombre=?,categoria=?,precio=?,stock=?,descripcion=? WHERE id_producto=?",[datos.nombre,datos.categoria,datos.precio,datos.stock,datos.descripcion,datos.id],funcion);
    },
    actualizarArchivo:function(conexion,datos,archivos,funcion){
      conexion.query("UPDATE producto SET imagen=? WHERE id_producto=?",[archivos.filename,datos.id],funcion);
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
    retornarDatosID:function(conexion,id,funcion){
      conexion.query("SELECT * FROM producto where id_producto=?",[id],funcion);
    },
    retornarVendedorID:function(conexion,id,funcion){
      conexion.query("SELECT * FROM vendedor WHERE id_vendedor = ?",[id],funcion);
    },
    obtenerProductos:function(conexion,datos,funcion){
      conexion.query("SELECT * FROM producto WHERE id_vendedor = ?",[datos[0].id_vendedor],funcion);
    },
    obtenerProductos2:function(conexion,id,funcion){
      conexion.query("SELECT * FROM producto WHERE id_vendedor = ?",[id],funcion);
    }
}